import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { SAINTS } from '@/components/palomnik/constants';

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
          <div className="bg-card rounded-2xl border border-border shadow-xl max-w-md w-full p-7 md:p-8 relative text-center animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowWelcome(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <Icon name="X" size={22} />
            </button>
            <span className="grid place-items-center w-14 h-14 rounded-full bg-accent/10 text-accent mb-4 mx-auto">
              <Icon name="Church" size={26} />
            </span>
            <h3 className="font-display text-2xl mb-3">21 августа в Соловецком монастыре</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Состоится Богослужение в честь праздника Зосимы, Савватия и Германа. Успей забронировать своё путешествие — количество мест ограничено.
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