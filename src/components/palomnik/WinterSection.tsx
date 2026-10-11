import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { TOURS, WINTER_IMAGE } from '@/components/palomnik/constants';

interface WinterSectionProps {
  onBook: () => void;
}

const winter = TOURS.find((t) => t.id === 'winter')!;

const WinterSection = ({ onBook }: WinterSectionProps) => {
  return (
    <section id="winter" className="py-24 bg-secondary/40">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">Новый маршрут</p>
          <h2 className="font-display text-4xl md:text-5xl mb-4 text-balance">Зимнее паломничество к четырём святыням</h2>
          <div className="h-px w-24 gold-line mx-auto mb-5" />
          <p className="text-muted-foreground text-lg leading-relaxed">
            Зимой обители особенно тихи и торжественны. Заснеженные храмы, колокольный звон в морозном воздухе и тепло братской молитвы — путь, который запоминается на всю жизнь.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center mb-14">
          <img src={WINTER_IMAGE} alt="Зимний паломнический маршрут" className="rounded-2xl w-full object-cover aspect-video shadow-lg" />
          <div className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-card border border-border text-center">
                <p className="text-sm text-muted-foreground mb-1">Из Москвы</p>
                <p className="font-display text-3xl text-accent">65 000 ₽</p>
                <p className="text-xs text-muted-foreground mt-1">с человека</p>
              </div>
              <div className="p-5 rounded-2xl bg-card border border-border text-center">
                <p className="text-sm text-muted-foreground mb-1">Из Ростова-на-Дону</p>
                <p className="font-display text-3xl text-accent">75 000 ₽</p>
                <p className="text-xs text-muted-foreground mt-1">с человека</p>
              </div>
            </div>
            <ul className="space-y-3">
              {[
                ['Bus', 'Проезд на комфортабельном микроавтобусе из Москвы или Ростова-на-Дону'],
                ['Hotel', 'Проживание в тёплой гостинице'],
                ['BookOpen', 'Экскурсии и духовное сопровождение на всём пути'],
                ['Utensils', 'Питание частично'],
                ['CalendarDays', 'Выезды раз в месяц из Москвы и Ростова-на-Дону'],
              ].map(([icon, text]) => (
                <li key={text} className="flex gap-3 text-muted-foreground">
                  <Icon name={icon} size={20} className="text-accent shrink-0 mt-0.5" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {winter.days.map((d) => (
            <div key={d.day} className="p-6 rounded-2xl bg-card border border-border shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="grid place-items-center w-11 h-11 rounded-full bg-accent text-accent-foreground">
                  <Icon name={d.icon} size={20} />
                </span>
                <span className="font-semibold text-primary">{d.day}</span>
              </div>
              <h3 className="font-display text-2xl mb-1">{d.title}</h3>
              <p className="text-sm text-primary mb-2">{d.sub}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="p-6 rounded-2xl bg-card border border-border mb-8">
            <h3 className="font-display text-2xl mb-3 text-center">Ближайшие выезды</h3>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {winter.departureDates.map((d) => (
                <p key={d} className="flex items-center gap-2">
                  <Icon name="Calendar" size={14} className="text-accent shrink-0" /> {d}
                </p>
              ))}
            </div>
          </div>
          <p className="text-center text-muted-foreground bg-accent/10 border border-accent/20 rounded-xl p-5 mb-8">
            Если у вас уже есть группа, которая хотела бы поехать в это паломничество и ждать не хочется, мы готовы предложить вам любые удобные для вас даты.
          </p>
          <div className="text-center">
            <Button size="lg" onClick={onBook} className="bg-accent hover:bg-accent/90 text-accent-foreground px-10">
              Записаться и забронировать место
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WinterSection;
