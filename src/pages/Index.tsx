import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const VALAAM = 'https://cdn.poehali.dev/projects/45b176e1-57ac-40bf-8364-b89cd4048930/files/761cb0a6-5cc4-47d4-834a-4b149ae91476.jpg';
const SOLOVKI = 'https://cdn.poehali.dev/projects/45b176e1-57ac-40bf-8364-b89cd4048930/files/b871d7c9-74b7-4e99-ab2f-574aa7f5035f.jpg';

const nav = [
  { id: 'routes', label: 'Маршруты' },
  { id: 'about', label: 'О паломничестве' },
  { id: 'calendar', label: 'Расписание' },
  { id: 'gallery', label: 'Галерея' },
  { id: 'info', label: 'Информация' },
  { id: 'contacts', label: 'Контакты' },
];

const routes = [
  {
    name: 'Валаам',
    sub: 'Спасо-Преображенский монастырь',
    days: '2 дня',
    desc: 'Северный Афон на Ладожском озере. Скиты, чудотворные источники и древние напевы валаамского распева.',
    icon: 'Church',
    img: VALAAM,
  },
  {
    name: 'Лодейное Поле',
    sub: 'Александро-Свирский монастырь',
    days: '1 день',
    desc: 'Обитель преподобного Александра Свирского — единственного, кому, по преданию, явилась Святая Троица.',
    icon: 'Cross',
    img: null,
  },
  {
    name: 'Соловецкие острова',
    sub: 'Спасо-Преображенский монастырь',
    days: '4 дня',
    desc: 'Древняя крепость на Белом море. Молитва, тишина и суровая красота Русского Севера.',
    icon: 'Anchor',
    img: SOLOVKI,
  },
  {
    name: 'Тихвин',
    sub: 'Тихвинский Богородичный монастырь',
    days: '1 день',
    desc: 'Дом чудотворной Тихвинской иконы Божией Матери — одной из самых почитаемых святынь России.',
    icon: 'Sparkles',
    img: null,
  },
];

const schedule = [
  { date: '5 июля', route: 'Валаам', days: '2 дня', seats: 'Свободно 8 мест' },
  { date: '12 июля', route: 'Александро-Свирский монастырь', days: '1 день', seats: 'Свободно 14 мест' },
  { date: '19–22 июля', route: 'Соловецкие острова', days: '4 дня', seats: 'Свободно 5 мест' },
  { date: '26 июля', route: 'Тихвин', days: '1 день', seats: 'Свободно 20 мест' },
  { date: '2 августа', route: 'Валаам', days: '2 дня', seats: 'Свободно 11 мест' },
];

const Index = () => {
  const [menu, setMenu] = useState(false);
  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenu(false);
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
              <span className="w-10 h-px bg-background/60" /> Паломнические поездки из Москвы
            </p>
            <h1 className="font-display text-5xl md:text-7xl leading-[1.05] mb-6 text-balance">
              Дорога к святыням Русского Севера
            </h1>
            <p className="text-lg md:text-xl text-background/85 mb-9 max-w-xl">
              Валаам, Александро-Свирский монастырь, Соловки и Тихвин — путешествия души с молитвой, тишиной и опытным сопровождением.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => go('routes')} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Выбрать маршрут
              </Button>
              <Button size="lg" variant="outline" onClick={() => go('calendar')} className="border-background/60 text-background bg-transparent hover:bg-background/10 hover:text-background">
                <Icon name="CalendarDays" size={18} className="mr-2" /> Расписание выездов
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Routes */}
      <section id="routes" className="py-24 bg-ornament">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">Святые места</p>
            <h2 className="font-display text-4xl md:text-5xl mb-4">Четыре паломнических маршрута</h2>
            <div className="h-px w-24 gold-line mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {routes.map((r) => (
              <article key={r.name} className="group rounded-2xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="relative h-56 overflow-hidden bg-secondary">
                  {r.img ? (
                    <img src={r.img} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full grid place-items-center bg-gradient-to-br from-primary/15 to-accent/15">
                      <Icon name={r.icon} size={64} className="text-primary/50" />
                    </div>
                  )}
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs bg-background/90 text-foreground">{r.days}</span>
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-2.5 mb-2">
                    <Icon name={r.icon} size={20} className="text-accent" />
                    <h3 className="font-display text-2xl">{r.name}</h3>
                  </div>
                  <p className="text-sm text-primary mb-3">{r.sub}</p>
                  <p className="text-muted-foreground leading-relaxed mb-5">{r.desc}</p>
                  <button onClick={() => go('booking')} className="inline-flex items-center gap-2 text-accent font-medium hover:gap-3 transition-all">
                    Записаться на поездку <Icon name="ArrowRight" size={16} />
                  </button>
                </div>
              </article>
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
              <p className="font-display text-4xl">15 лет</p>
              <p className="text-sm opacity-90">сопровождаем паломников</p>
            </div>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">О паломничестве</p>
            <h2 className="font-display text-4xl md:text-5xl mb-6 text-balance">Не туризм, а путь к душе</h2>
            <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
              Паломничество — это особое путешествие, где главное не маршрут, а внутреннее преображение. Мы сопровождаем группы с заботой о духовной и бытовой стороне поездки.
            </p>
            <div className="space-y-5">
              {[
                { icon: 'BookOpen', t: 'Духовное сопровождение', d: 'Беседы, молебны и участие в богослужениях вместе с группой.' },
                { icon: 'Bus', t: 'Комфортный транспорт', d: 'Удобные автобусы и переправы, всё организовано заранее.' },
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

      {/* Calendar */}
      <section id="calendar" className="py-24">
        <div className="container max-w-4xl">
          <div className="text-center mb-14">
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">Календарь</p>
            <h2 className="font-display text-4xl md:text-5xl mb-4">Расписание групповых выездов</h2>
            <div className="h-px w-24 gold-line mx-auto" />
          </div>
          <div className="rounded-2xl border border-border overflow-hidden bg-card">
            {schedule.map((s, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 p-5 sm:px-7 border-b border-border last:border-0 hover:bg-secondary/40 transition-colors">
                <div className="flex items-center gap-2 w-32 shrink-0">
                  <Icon name="CalendarDays" size={18} className="text-accent" />
                  <span className="font-semibold">{s.date}</span>
                </div>
                <div className="flex-1">
                  <p className="font-display text-xl">{s.route}</p>
                  <p className="text-sm text-muted-foreground">{s.days}</p>
                </div>
                <span className="text-sm text-primary">{s.seats}</span>
                <Button size="sm" onClick={() => go('booking')} className="bg-accent hover:bg-accent/90 text-accent-foreground sm:ml-4">
                  Записаться
                </Button>
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
                ['Utensils', 'Питание включено в стоимость поездки'],
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
            <p className="text-muted-foreground mb-7">Оставьте контакты — мы свяжемся с вами и подберём поездку.</p>
            <form className="grid sm:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
              <input className="px-4 py-3 rounded-lg bg-background border border-input focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Ваше имя" />
              <input className="px-4 py-3 rounded-lg bg-background border border-input focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Телефон" />
              <select className="px-4 py-3 rounded-lg bg-background border border-input focus:outline-none focus:ring-2 focus:ring-ring sm:col-span-2 text-foreground">
                <option>Выберите маршрут</option>
                {routes.map((r) => <option key={r.name}>{r.name}</option>)}
              </select>
              <textarea rows={3} className="px-4 py-3 rounded-lg bg-background border border-input focus:outline-none focus:ring-2 focus:ring-ring sm:col-span-2 resize-none" placeholder="Комментарий" />
              <Button type="submit" size="lg" className="sm:col-span-2 bg-accent hover:bg-accent/90 text-accent-foreground">
                Отправить заявку
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
            <p className="text-background/70 text-sm leading-relaxed">Паломнические поездки к святыням Русского Севера из Москвы.</p>
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
