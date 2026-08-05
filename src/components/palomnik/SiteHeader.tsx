import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { nav, VALAAM, Tour } from '@/components/palomnik/constants';

interface SiteHeaderProps {
  menu: boolean;
  setMenu: (v: boolean) => void;
  go: (id: string) => void;
  tour: Tour;
}

const SiteHeader = ({ menu, setMenu, go, tour }: SiteHeaderProps) => {
  return (
    <>
      {/* Header */}
      <header className="fixed top-9 md:top-9 inset-x-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
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
      <section id="top" className="relative min-h-screen flex items-center pt-24 overflow-hidden">
        <img src={VALAAM} alt="Паломничество" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/40 to-foreground/80" />
        <div className="relative container">
          <div className="max-w-2xl text-background animate-fade-up">
            <p className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] mb-6 text-background/80">
              <span className="w-10 h-px bg-background/60" /> {tour.heroLabel}
            </p>
            <h1 className="font-display text-5xl md:text-7xl leading-[1.05] mb-6 text-balance">
              {tour.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-background/85 mb-9 max-w-xl">
              {tour.heroDesc}
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
    </>
  );
};

export default SiteHeader;
