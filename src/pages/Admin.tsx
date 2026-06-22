import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { APPLICATIONS_URL, type Application } from '@/lib/api';

const Admin = () => {
  const [items, setItems] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(APPLICATIONS_URL);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setItems(data.items || []);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const exportCsv = () => {
    const header = ['Дата', 'Имя', 'Телефон', 'Маршрут', 'Комментарий'];
    const rows = items.map((i) => [i.created_at, i.name, i.phone, i.route, i.comment]);
    const csv = [header, ...rows]
      .map((r) => r.map((c) => `"${(c || '').replace(/"/g, '""')}"`).join(';'))
      .join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zayavki_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid place-items-center w-9 h-9 rounded-full bg-accent text-accent-foreground">
              <Icon name="Cross" size={18} />
            </span>
            <span className="font-display text-xl font-semibold">Кабинет администратора</span>
          </Link>
          <Link to="/" className="text-sm text-muted-foreground hover:text-accent inline-flex items-center gap-1">
            <Icon name="ArrowLeft" size={16} /> На сайт
          </Link>
        </div>
      </header>

      <main className="container py-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-2">Обратная связь</p>
            <h1 className="font-display text-4xl">Заявки на паломничество</h1>
            <p className="text-muted-foreground mt-1">Всего заявок: {items.length}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={load}>
              <Icon name="RefreshCw" size={16} className="mr-2" /> Обновить
            </Button>
            <Button onClick={exportCsv} disabled={!items.length} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Icon name="Download" size={16} className="mr-2" /> Скачать таблицу (CSV)
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="grid place-items-center py-24 text-muted-foreground">
            <Icon name="Loader" size={32} className="animate-spin mb-3" />
            Загружаем заявки...
          </div>
        ) : error ? (
          <div className="grid place-items-center py-24 text-muted-foreground">
            <Icon name="TriangleAlert" size={32} className="mb-3 text-accent" />
            Не удалось загрузить заявки. Попробуйте обновить.
          </div>
        ) : items.length === 0 ? (
          <div className="grid place-items-center py-24 text-muted-foreground">
            <Icon name="Inbox" size={32} className="mb-3" />
            Пока нет ни одной заявки.
          </div>
        ) : (
          <div className="rounded-2xl border border-border overflow-hidden bg-card">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary/60 text-left">
                    <th className="px-5 py-4 font-semibold whitespace-nowrap">Дата</th>
                    <th className="px-5 py-4 font-semibold">Имя</th>
                    <th className="px-5 py-4 font-semibold whitespace-nowrap">Телефон</th>
                    <th className="px-5 py-4 font-semibold">Маршрут</th>
                    <th className="px-5 py-4 font-semibold">Комментарий</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((i) => (
                    <tr key={i.id} className="border-t border-border hover:bg-secondary/30 transition-colors">
                      <td className="px-5 py-4 whitespace-nowrap text-muted-foreground">{i.created_at}</td>
                      <td className="px-5 py-4 font-medium">{i.name}</td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <a href={`tel:${i.phone}`} className="text-accent hover:underline">{i.phone}</a>
                      </td>
                      <td className="px-5 py-4 text-muted-foreground">{i.route}</td>
                      <td className="px-5 py-4 text-muted-foreground max-w-xs">{i.comment || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
