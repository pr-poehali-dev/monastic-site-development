import json
import os
import psycopg2

def handler(event: dict, context) -> dict:
    '''Приём заявок на паломничество (POST) и просмотр списка заявок для администратора (GET).'''
    method = event.get('httpMethod', 'GET')

    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token, X-Session-Id',
        'Access-Control-Max-Age': '86400',
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()

    if method == 'POST':
        body = json.loads(event.get('body') or '{}')
        name = (body.get('name') or '').strip()
        phone = (body.get('phone') or '').strip()
        route = (body.get('route') or '').strip()
        comment = (body.get('comment') or '').strip()

        if not name or not phone:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {**cors, 'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Имя и телефон обязательны'}),
            }

        name = name.replace("'", "''")
        phone = phone.replace("'", "''")
        route = route.replace("'", "''")
        comment = comment.replace("'", "''")

        cur.execute(
            "INSERT INTO applications (name, phone, route, comment) "
            f"VALUES ('{name}', '{phone}', '{route}', '{comment}') RETURNING id"
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'success': True, 'id': new_id}),
        }

    cur.execute(
        "SELECT id, name, phone, route, comment, "
        "to_char(created_at, 'DD.MM.YYYY HH24:MI') "
        "FROM applications ORDER BY created_at DESC"
    )
    rows = cur.fetchall()
    cur.close()
    conn.close()

    items = [
        {
            'id': r[0],
            'name': r[1],
            'phone': r[2],
            'route': r[3],
            'comment': r[4],
            'created_at': r[5],
        }
        for r in rows
    ]
    return {
        'statusCode': 200,
        'headers': {**cors, 'Content-Type': 'application/json'},
        'body': json.dumps({'items': items}),
    }
