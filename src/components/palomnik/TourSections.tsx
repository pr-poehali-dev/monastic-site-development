import Icon from '@/components/ui/icon';
import { TOURS, SOLOVKI, GALLERY, Tour } from '@/components/palomnik/constants';

interface TourSectionsProps {
  activeTour: number;
  switchTour: (idx: number) => void;
  tour: Tour;
}

const TourSections = ({ activeTour, switchTour, tour }: TourSectionsProps) => {
  return (
    <>
      {/* Tour switcher */}
      <section id="tours" className="py-14 bg-card border-b border-border">
        <div className="container">
          <div className="text-center mb-8">
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-2">Выберите тур</p>
            <h2 className="font-display text-3xl md:text-4xl">Маршруты паломничества</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {TOURS.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => switchTour(idx)}
                className={`text-left p-6 rounded-2xl border-2 transition-all ${
                  activeTour === idx
                    ? 'border-accent bg-accent/10 shadow-md'
                    : 'border-border bg-background hover:border-accent/40'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className={`grid place-items-center w-10 h-10 rounded-full ${activeTour === idx ? 'bg-accent text-accent-foreground' : 'bg-secondary text-muted-foreground'}`}>
                    <Icon name="MapPin" size={18} />
                  </span>
                  <span className={`text-xs uppercase tracking-widest font-semibold ${activeTour === idx ? 'text-accent' : 'text-muted-foreground'}`}>
                    {t.label}
                  </span>
                </div>
                <h3 className="font-display text-xl mb-1">{t.heroTitle}</h3>
                <p className="text-sm text-muted-foreground">{t.aboutBadge} · {t.price}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Route overview */}
      <section id="route" className="py-24 bg-ornament">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">Маршрут</p>
            <h2 className="font-display text-4xl md:text-5xl mb-4">{tour.routeTitle}</h2>
            <div className="h-px w-24 gold-line mx-auto" />
          </div>
          <div className={`grid sm:grid-cols-2 gap-6 ${tour.routeCards.length === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'}`}>
            {tour.routeCards.map(([icon, name, dur]) => (
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
            <img src={SOLOVKI} alt="Паломничество" className="rounded-2xl w-full object-cover aspect-[4/5] shadow-lg" />
            <div className="absolute -bottom-6 -right-6 hidden md:block bg-accent text-accent-foreground p-6 rounded-2xl shadow-xl">
              <p className="font-display text-4xl">{tour.aboutBadge}</p>
              <p className="text-sm opacity-90">единого пути</p>
            </div>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">О паломничестве</p>
            <h2 className="font-display text-4xl md:text-5xl mb-6 text-balance">Не туризм, а путь к душе</h2>
            <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
              Паломничество — это особое путешествие, где главное не маршрут, а внутреннее преображение. {tour.aboutDesc}
            </p>
            <div className="flex items-center gap-4 mb-8 p-5 rounded-xl bg-accent/10 border border-accent/20">
              <span className="grid place-items-center w-12 h-12 rounded-full bg-accent text-accent-foreground shrink-0">
                <Icon name="BadgeRussianRuble" size={22} />
              </span>
              <div>
                <p className="font-semibold text-lg">Стоимость тура — {tour.price}</p>
                <p className="text-sm text-muted-foreground">Включено: {tour.included}</p>
              </div>
            </div>
            <div className="space-y-5">
              {[
                { icon: 'BookOpen', t: 'Духовное сопровождение', d: 'Беседы, молебны и участие в богослужениях вместе с группой.' },
                { icon: 'Bus', t: 'Комфортабельный микроавтобус', d: `Выезд из ${tour.city} на комфортабельном микроавтобусе, все переправы организованы заранее.` },
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
            {tour.days.map((d) => (
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
            {GALLERY.map((img, i) => (
              <div key={i} className={`overflow-hidden rounded-xl group ${i % 3 === 0 ? 'row-span-2 aspect-[3/4]' : 'aspect-square'}`}>
                <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TourSections;