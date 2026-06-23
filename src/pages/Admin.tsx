import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { APPLICATIONS_URL, type Application } from '@/lib/api';

const ADMIN_PASSWORD = 'alena2011';

const Admin = () => {
  const [auth, setAuth] = useState(() => sessionStorage.getItem('admin_auth') === '1');
  const [pwInput, setPwInput] = useState('');
  const [pwError, setPwError] = useState(false);
  const [items, setItems] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwInput.trim() === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_auth', '1');
      setAuth(true);
    } else {
      setPwError(true);
      setPwInput('');
    }
  };

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
    if (auth) load();
  }, [auth]);

  const exportCsv = () => {
    const header = ['Дата заявки', 'Имя', 'Телефон', 'Маршрут', 'Дата выезда', 'Комментарий'];
    const rows = items.map((i) => [i.created_at, i.name, i.phone, i.route, i.travel_date || '', i.comment]);
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

  if (!auth) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <form onSubmit={login} className="w-full max-w-sm bg-card border border-border rounded-2xl p-8 shadow-sm">
          <div className="flex justify-center mb-6">
            <span className="grid place-items-center w-14 h-14 rounded-full bg-accent text-accent-foreground">
              <Icon name="Lock" size={24} />
            </span>
          </div>
          <h1 className="font-display text-3xl text-center mb-1">Кабинет администратора</h1>
          <p className="text-muted-foreground text-center text-sm mb-7">Введите пароль для доступа</p>
          <input
            type="password"
            value={pwInput}
            onChange={(e) => { setPwInput(e.target.value); setPwError(false); }}
            className={`w-full px-4 py-3 rounded-lg bg-background border focus:outline-none focus:ring-2 focus:ring-ring mb-2 ${pwError ? 'border-destructive' : 'border-input'}`}
            placeholder="Пароль"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            autoFocus
          />
          {pwError && <p className="text-destructive text-sm mb-3">Неверный пароль</p>}
          <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground mt-2">
            Войти
          </Button>
        </form>
      </div>
    );
  }

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
                    <th className="px-5 py-4 font-semibold whitespace-nowrap">Заявка</th>
                    <th className="px-5 py-4 font-semibold">Имя</th>
                    <th className="px-5 py-4 font-semibold whitespace-nowrap">Телефон</th>
                    <th className="px-5 py-4 font-semibold">Маршрут</th>
                    <th className="px-5 py-4 font-semibold whitespace-nowrap">Дата выезда</th>
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
                      <td className="px-5 py-4 whitespace-nowrap font-medium text-primary">{i.travel_date || '—'}</td>
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