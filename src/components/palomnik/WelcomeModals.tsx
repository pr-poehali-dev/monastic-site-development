import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { SAINTS, SHUYA_IMAGE } from '@/components/palomnik/constants';

interface WelcomeModalsProps {
  showWelcome: boolean;
  setShowWelcome: (v: boolean) => void;
  showSaintInfo: boolean;
  setShowSaintInfo: (v: boolean) => void;
  activeSaint: number;
  setActiveSaint: (i: number) => void;
  go: (id: string) => void;
}

const WelcomeModals = ({
  showWelcome,
  setShowWelcome,
  showSaintInfo,
  setShowSaintInfo,
  activeSaint,
  setActiveSaint,
  go,
}: WelcomeModalsProps) => {
  return (
    <>
      {showWelcome && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-sm" onClick={() => setShowWelcome(false)}>
          <div className="bg-card rounded-2xl border border-border shadow-xl max-w-lg w-full relative animate-fade-in max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowWelcome(false)} className="absolute top-4 right-4 z-10 grid place-items-center w-8 h-8 rounded-full bg-foreground/50 text-background hover:bg-foreground/70">
              <Icon name="X" size={18} />
            </button>
            <img src={SHUYA_IMAGE} alt="Старинная Шуя" className="w-full aspect-[4/3] object-cover" />
            <div className="p-7 md:p-8 text-center">
              <h3 className="font-display text-2xl mb-3">Путешествие-вдохновение: в старинную Шую и к батюшке — откройте душу России!</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Трёхдневное путешествие с 3 по 5 сентября в уютную Шую и тихую Старую Южу: колокольня с панорамой города, музей Бальмонта, старейший в России завод ситца, семейная сыроварня, усадьба фабриканта Павлова, дегустация наливок и поездка к батюшке — настоятелю Смоленского храма XVIII века, к чудотворной иконе «Неопалимая Купина».
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Даты выезда: 3–5 сентября · Стоимость: 16 500 ₽ (2 дня в Шуе) / 21 500 ₽ (3 дня)
              </p>
              <Button
                size="lg"
                onClick={() => { setShowWelcome(false); go('booking'); }}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Забронировать путешествие
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