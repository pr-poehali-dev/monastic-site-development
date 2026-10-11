import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { SAINTS, WINTER_IMAGE } from '@/components/palomnik/constants';

interface WelcomeModalsProps {
  showWelcome: boolean;
  setShowWelcome: (v: boolean) => void;
  showSaintInfo: boolean;
  setShowSaintInfo: (v: boolean) => void;
  activeSaint: number;
  setActiveSaint: (i: number) => void;
  go: (id: string) => void;
  showWinter: boolean;
  setShowWinter: (v: boolean) => void;
  onSelectWinter: () => void;
}

const WelcomeModals = ({
  showWelcome,
  setShowWelcome,
  showSaintInfo,
  setShowSaintInfo,
  activeSaint,
  setActiveSaint,
  go,
  showWinter,
  setShowWinter,
  onSelectWinter,
}: WelcomeModalsProps) => {
  const closeWelcome = () => {
    setShowWelcome(false);
    setShowWinter(true);
  };

  return (
    <>
      {showWelcome && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-sm" onClick={closeWelcome}>
          <div className="bg-card rounded-2xl border border-border shadow-xl max-w-lg w-full relative animate-fade-in max-h-[90vh] overflow-y-auto text-center p-8 md:p-10" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeWelcome} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <Icon name="X" size={22} />
            </button>
            <span className="grid place-items-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-5 mx-auto">
              <Icon name="CalendarCheck" size={30} />
            </span>
            <h3 className="font-display text-3xl md:text-4xl mb-3 text-balance">Идёт набор в группы на 2027 год</h3>
            <p className="font-display text-xl text-accent mb-4">Успей занять своё место!</p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Выезды два раза в месяц, начиная с 6 июня 2027 года. Количество мест в группах ограничено.
            </p>
            <Button
              size="lg"
              onClick={() => { setShowWelcome(false); go('booking'); }}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Записаться в группу
            </Button>
          </div>
        </div>
      )}

      {showWinter && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-sm" onClick={() => setShowWinter(false)}>
          <div className="bg-card rounded-2xl border border-border shadow-xl max-w-lg w-full relative animate-fade-in max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowWinter(false)} className="absolute top-4 right-4 z-10 grid place-items-center w-8 h-8 rounded-full bg-foreground/50 text-background hover:bg-foreground/70">
              <Icon name="X" size={18} />
            </button>
            <img src={WINTER_IMAGE} alt="Зимний паломнический маршрут" className="w-full aspect-video object-cover" />
            <div className="p-7 md:p-8 text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-primary mb-2">Новый зимний маршрут</p>
              <h3 className="font-display text-2xl mb-3">Задонск, Великий Новгород, Тихвин и Александро-Свирский монастырь</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Монастырь Тихона Задонского, Великий Новгород, Тихвинский Богородичный Успенский монастырь и Свято-Троицкий Александро-Свирский монастырь.
              </p>
              <p className="font-semibold mb-1">45 000 ₽ из Москвы · 55 000 ₽ из Ростова-на-Дону</p>
              <p className="text-sm text-muted-foreground mb-4">Выезды раз в месяц из Москвы и Ростова-на-Дону</p>
              <p className="text-sm text-muted-foreground bg-accent/10 border border-accent/20 rounded-xl p-4 mb-6">
                Если у вас уже есть группа, которая хотела бы поехать в это паломничество и ждать не хочется, мы готовы предложить вам любые удобные для вас даты.
              </p>
              <Button
                size="lg"
                onClick={() => { setShowWinter(false); onSelectWinter(); go('booking'); }}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Записаться и забронировать место
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Announcement */}
      <button
        onClick={() => setShowSaintInfo(true)}
        className="fixed top-0 inset-x-0 z-[60] bg-accent text-accent-foreground text-sm text-center px-4 py-2.5 hover:bg-accent/90 transition-colors underline-offset-2 hover:underline"
      >
        21 августа в Соловецком монастыре состоится Богослужение в честь праздника Зосимы, Савватия и Германа
      </button>

      {showSaintInfo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-sm" onClick={() => setShowSaintInfo(false)}>
          <div className="bg-card rounded-2xl border border-border shadow-xl max-w-lg w-full p-7 md:p-8 relative animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowSaintInfo(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <Icon name="X" size={22} />
            </button>
            <img
              src={SAINTS[activeSaint].icon}
              alt={SAINTS[activeSaint].name}
              className="w-20 h-20 rounded-full object-cover border-2 border-accent mb-4"
            />
            <div className="flex flex-wrap gap-2 mb-5">
              {SAINTS.map((s, i) => (
                <button
                  key={s.name}
                  onClick={() => setActiveSaint(i)}
                  className={`flex items-center gap-2 pl-1.5 pr-3.5 py-1.5 rounded-full text-sm border transition-colors ${
                    activeSaint === i
                      ? 'bg-accent text-accent-foreground border-accent'
                      : 'border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <img src={s.icon} alt={s.name} className="w-6 h-6 rounded-full object-cover" />
                  {s.name}
                </button>
              ))}
            </div>
            <h3 className="font-display text-2xl mb-3">Преподобный {SAINTS[activeSaint].name}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {SAINTS[activeSaint].text}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default WelcomeModals;