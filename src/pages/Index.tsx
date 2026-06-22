import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { APPLICATIONS_URL } from '@/lib/api';

const VALAAM = 'https://cdn.poehali.dev/projects/45b176e1-57ac-40bf-8364-b89cd4048930/files/761cb0a6-5cc4-47d4-834a-4b149ae91476.jpg';
const SOLOVKI = 'https://cdn.poehali.dev/projects/45b176e1-57ac-40bf-8364-b89cd4048930/files/b871d7c9-74b7-4e99-ab2f-574aa7f5035f.jpg';

const ROUTE_NAME = 'Паломничество по святыням Русского Севера — 5 дней';

const nav = [
  { id: 'route', label: 'Маршрут' },
  { id: 'about', label: 'О паломничестве' },
  { id: 'program', label: 'Программа' },
  { id: 'gallery', label: 'Галерея' },
  { id: 'info', label: 'Информация' },
  { id: 'contacts', label: 'Контакты' },
];

const days = [
  { day: 'День 1', icon: 'Church', title: 'Валаам', sub: 'Спасо-Преображенский монастырь', desc: 'Выезд из Москвы. Северный Афон на Ладожском озере: скиты, чудотворные источники и валаамский распев.' },
  { day: 'День 2', icon: 'Cross', title: 'Лодейное Поле', sub: 'Александро-Свирский монастырь', desc: 'Обитель преподобного Александра Свирского — единственного, кому, по преданию, явилась Святая Троица.' },
  { day: 'День 3–4', icon: 'Anchor', title: 'Соловецкие острова', sub: 'Спасо-Преображенский монастырь', desc: 'Древняя крепость на Белом море. Молитва, тишина и суровая красота Русского Севера.' },
  { day: 'День 5', icon: 'Sparkles', title: 'Тихвин', sub: 'Тихвинский Богородичный монастырь', desc: 'Дом чудотворной Тихвинской иконы Божией Матери. Возвращение в Москву.' },
];

const Index = () => {
  const { toast } = useToast();
  const [menu, setMenu] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', comment: '' });

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenu(false);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast({ title: 'Заполните имя и телефон', variant: 'destructive' });
      return;
    }
    setSending(true);
    try {
      const res = await fetch(APPLICATIONS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, route: ROUTE_NAME }),
      });
      if (!res.ok) throw new Error();
      toast({ title: 'Заявка отправлена!', description: 'Мы свяжемся с вами в ближайшее время.' });
      setForm({ name: '', phone: '', comment: '' });
    } catch {
      toast({ title: 'Не удалось отправить заявку', description: 'Попробуйте ещё раз позже.', variant: 'destructive' });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <button onClick={() => go('top')} className="flex items-center gap-2.5">
            <span className="grid place-items-center w-9 h-9 rounded-full bg-accent text-accent-foreground">
              <Icon name="Cross" size={18} />
            </span>
            <span className="font-display text-xl font-semibold tracking-wide">Путь Паломника</span>
          </button>
          <nav className="hidden lg:flex items-center gap-7">
            {nav.map((n) => (
              <button key={n.id} onClick={() => go(n.id)} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                {n.label}
              </button>
            ))}
          </nav>
          <Button onClick={() => go('booking')} className="hidden lg:inline-flex bg-accent hover:bg-accent/90 text-accent-foreground">
            Записаться
          </Button>
          <button className="lg:hidden" onClick={() => setMenu(!menu)}>
            <Icon name={menu ? 'X' : 'Menu'} size={24} />
          </button>
        </div>
        {menu && (
          <nav className="lg:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-3 animate-fade-in">
            {nav.map((n) => (
              <button key={n.id} onClick={() => go(n.id)} className="text-left py-1 text-muted-foreground">
                {n.label}
              </button>
            ))}
            <Button onClick={() => go('booking')} className="bg-accent text-accent-foreground mt-2">Записаться</Button>
          </nav>
        )}
      </header>

      {/* Hero */}
      <section id="top" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <img src={VALAAM} alt="Валаам" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/40 to-foreground/80" />
        <div className="relative container">
          <div className="max-w-2xl text-background animate-fade-up">
            <p className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] mb-6 text-background/80">
              <span className="w-10 h-px bg-background/60" /> 5-дневное паломничество из Москвы
            </p>
            <h1 className="font-display text-5xl md:text-7xl leading-[1.05] mb-6 text-balance">
              Путь к четырём святыням Русского Севера
            </h1>
            <p className="text-lg md:text-xl text-background/85 mb-9 max-w-xl">
              Единое паломничество длиною в 5 дней: Валаам, Александро-Свирский монастырь, Соловки и Тихвин — с молитвой, тишиной и опытным сопровождением.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => go('booking')} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Записаться на поездку
              </Button>
              <Button size="lg" variant="outline" onClick={() => go('program')} className="border-background/60 text-background bg-transparent hover:bg-background/10 hover:text-background">
                <Icon name="CalendarDays" size={18} className="mr-2" /> Программа по дням
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Route overview */}
      <section id="route" className="py-24 bg-ornament">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">Маршрут</p>
            <h2 className="font-display text-4xl md:text-5xl mb-4">Одно паломничество — четыре святыни</h2>
            <div className="h-px w-24 gold-line mx-auto" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              ['Church', 'Валаам', '2 дня'],
              ['Cross', 'Александро-Свирский', '1 день'],
              ['Anchor', 'Соловки', '2 дня'],
              ['Sparkles', 'Тихвин', '1 день'],
            ].map(([icon, name, dur]) => (
              <div key={name} className="text-center p-7 rounded-2xl bg-card border border-border shadow-sm">
                <span className="inline-grid place-items-center w-14 h-14 rounded-full bg-accent/10 text-accent mb-4">
                  <Icon name={icon} size={26} />
                </span>
                <h3 className="font-display text-2xl mb-1">{name}</h3>
                <p className="text-sm text-muted-foreground">{dur}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 bg-secondary/40">
        <div className="container grid lg:grid-cols-2 gap-14 items-center">
          <div className="relative">
            <img src={SOLOVKI} alt="Соловки" className="rounded-2xl w-full object-cover aspect-[4/5] shadow-lg" />
            <div className="absolute -bottom-6 -right-6 hidden md:block bg-accent text-accent-foreground p-6 rounded-2xl shadow-xl">
              <p className="font-display text-4xl">5 дней</p>
              <p className="text-sm opacity-90">единого пути</p>
            </div>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">О паломничестве</p>
            <h2 className="font-display text-4xl md:text-5xl mb-6 text-balance">Не туризм, а путь к душе</h2>
            <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
              Паломничество — это особое путешествие, где главное не маршрут, а внутреннее преображение. За пять дней мы посетим четыре великие святыни с заботой о духовной и бытовой стороне поездки.
            </p>
            <div className="flex items-center gap-4 mb-8 p-5 rounded-xl bg-accent/10 border border-accent/20">
              <span className="grid place-items-center w-12 h-12 rounded-full bg-accent text-accent-foreground shrink-0">
                <Icon name="BadgeRussianRuble" size={22} />
              </span>
              <div>
                <p className="font-semibold text-lg">Стоимость тура — 100 000 ₽</p>
                <p className="text-sm text-muted-foreground">Включено: комфортабельный микроавтобус из Москвы и 2 завтрака</p>
              </div>
            </div>
            <div className="space-y-5">
              {[
                { icon: 'BookOpen', t: 'Духовное сопровождение', d: 'Беседы, молебны и участие в богослужениях вместе с группой.' },
                { icon: 'Bus', t: 'Комфортабельный микроавтобус', d: 'Выезд из Москвы на комфортабельном микроавтобусе, все переправы организованы заранее.' },
                { icon: 'HeartHandshake', t: 'Забота о каждом', d: 'Опытные сопровождающие рядом на всём пути следования.' },
              ].map((f) => (
                <div key={f.t} className="flex gap-4">
                  <span className="grid place-items-center w-11 h-11 rounded-full bg-accent/10 text-accent shrink-0">
                    <Icon name={f.icon} size={20} />
                  </span>
                  <div>
                    <h4 className="font-semibold mb-0.5">{f.t}</h4>
                    <p className="text-sm text-muted-foreground">{f.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Program */}
      <section id="program" className="py-24">
        <div className="container max-w-4xl">
          <div className="text-center mb-14">
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">Программа</p>
            <h2 className="font-display text-4xl md:text-5xl mb-4">Маршрут по дням</h2>
            <div className="h-px w-24 gold-line mx-auto" />
          </div>
          <div className="space-y-5">
            {days.map((d) => (
              <div key={d.day} className="flex flex-col sm:flex-row gap-5 p-6 rounded-2xl bg-card border border-border shadow-sm">
                <div className="flex sm:flex-col items-center sm:items-start gap-3 sm:w-36 shrink-0">
                  <span className="grid place-items-center w-11 h-11 rounded-full bg-accent text-accent-foreground">
                    <Icon name={d.icon} size={20} />
                  </span>
                  <span className="font-semibold text-primary">{d.day}</span>
                </div>
                <div>
                  <h3 className="font-display text-2xl">{d.title}</h3>
                  <p className="text-sm text-primary mb-2">{d.sub}</p>
                  <p className="text-muted-foreground leading-relaxed">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-24 bg-secondary/40">
        <div className="container">
          <div className="text-center mb-14">
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">Галерея</p>
            <h2 className="font-display text-4xl md:text-5xl">Образы паломнических дорог</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[VALAAM, SOLOVKI, VALAAM, SOLOVKI].map((img, i) => (
              <div key={i} className={`overflow-hidden rounded-xl group ${i % 3 === 0 ? 'row-span-2 aspect-[3/4]' : 'aspect-square'}`}>
                <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info + Booking */}
      <section id="info" className="py-24">
        <div className="container grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1">
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">Информация</p>
            <h2 className="font-display text-4xl mb-6">Практические детали</h2>
            <ul className="space-y-4">
              {[
                ['MapPin', 'Отправление от станции метро в центре Москвы'],
                ['Clock', 'Сбор группы за 30 минут до выезда'],
                ['Backpack', 'Удобная одежда и обувь, головной убор для женщин'],
                ['Utensils', '2 завтрака включены в стоимость поездки'],
              ].map(([icon, text]) => (
                <li key={text} className="flex gap-3 text-muted-foreground">
                  <Icon name={icon} size={20} className="text-accent shrink-0 mt-0.5" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div id="booking" className="lg:col-span-2 rounded-2xl bg-card border border-border p-8 md:p-10 shadow-sm">
            <h3 className="font-display text-3xl mb-2">Запись на паломничество</h3>
            <p className="text-muted-foreground mb-7">Оставьте контакты — мы свяжемся с вами и расскажем о ближайшем выезде.</p>
            <form className="grid sm:grid-cols-2 gap-4" onSubmit={submit}>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="px-4 py-3 rounded-lg bg-background border border-input focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Ваше имя"
              />
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="px-4 py-3 rounded-lg bg-background border border-input focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Телефон"
              />
              <div className="sm:col-span-2 flex items-center gap-2 px-4 py-3 rounded-lg bg-secondary/60 text-sm text-muted-foreground">
                <Icon name="MapPin" size={16} className="text-accent" />
                {ROUTE_NAME}
              </div>
              <textarea
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
                rows={3}
                className="px-4 py-3 rounded-lg bg-background border border-input focus:outline-none focus:ring-2 focus:ring-ring sm:col-span-2 resize-none"
                placeholder="Комментарий (необязательно)"
              />
              <Button type="submit" size="lg" disabled={sending} className="sm:col-span-2 bg-accent hover:bg-accent/90 text-accent-foreground">
                {sending ? 'Отправляем...' : 'Отправить заявку'}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Contacts / Footer */}
      <footer id="contacts" className="bg-foreground text-background py-16">
        <div className="container grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="grid place-items-center w-9 h-9 rounded-full bg-accent text-accent-foreground">
                <Icon name="Cross" size={18} />
              </span>
              <span className="font-display text-xl">Путь Паломника</span>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">5-дневное паломничество к святыням Русского Севера из Москвы.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <ul className="space-y-2 text-background/70 text-sm">
              <li className="flex items-center gap-2"><Icon name="Phone" size={16} /> +7 (000) 000-00-00</li>
              <li className="flex items-center gap-2"><Icon name="Mail" size={16} /> info@put-palomnika.ru</li>
              <li className="flex items-center gap-2"><Icon name="MapPin" size={16} /> Москва, центр</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Разделы</h4>
            <ul className="space-y-2 text-background/70 text-sm">
              {nav.slice(0, 4).map((n) => (
                <li key={n.id}><button onClick={() => go(n.id)} className="hover:text-background">{n.label}</button></li>
              ))}
              <li><Link to="/admin" className="hover:text-background inline-flex items-center gap-1"><Icon name="Lock" size={14} /> Кабинет администратора</Link></li>
            </ul>
          </div>
        </div>
        <div className="container mt-12 pt-6 border-t border-background/20 text-center text-background/50 text-sm">
          © 2026 Путь Паломника. С молитвой о добром пути.
        </div>
      </footer>
    </div>
  );
};

export default Index;