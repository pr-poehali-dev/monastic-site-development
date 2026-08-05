import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { nav, Tour } from '@/components/palomnik/constants';

interface BookingForm {
  name: string;
  phone: string;
  date: string;
  comment: string;
}

interface BookingSectionProps {
  activeTour: number;
  tour: Tour;
  form: BookingForm;
  setForm: (f: BookingForm) => void;
  sending: boolean;
  submit: (e: React.FormEvent) => void;
  go: (id: string) => void;
}

const BookingSection = ({ activeTour, tour, form, setForm, sending, submit, go }: BookingSectionProps) => {
  return (
    <>
      {/* Info + Booking */}
      <section id="info" className="py-24">
        <div className="container grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1">
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">Информация</p>
            <h2 className="font-display text-4xl mb-6">Практические детали</h2>
            <ul className="space-y-4">
              {[
                ['MapPin', `Отправление из ${activeTour === 0 ? 'Москвы' : 'Ростова-на-Дону'}`],
                ['Clock', 'Сбор группы за 30 минут до выезда'],
                ['Backpack', 'Удобная одежда и обувь, головной убор для женщин'],
                ['Hotel', 'Проживание в комфортабельной гостинице включено в стоимость'],
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
                placeholder="Телефон (МАХ +79085144500)"
              />
              <div className="sm:col-span-2 flex items-center gap-2 px-4 py-3 rounded-lg bg-secondary/60 text-sm text-muted-foreground">
                <Icon name="MapPin" size={16} className="text-accent" />
                {tour.heroTitle}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm text-muted-foreground mb-1.5">Желаемая дата выезда</label>
                <select
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-input focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Выберите дату</option>
                  {tour.departureDates.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
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

      {/* Footer */}
      <footer id="contacts" className="bg-foreground text-background py-16">
        <div className="container grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="grid place-items-center w-9 h-9 rounded-full bg-accent text-accent-foreground">
                <Icon name="Cross" size={18} />
              </span>
              <span className="font-display text-xl">Путь Паломника</span>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">Паломничество к святыням России. Выезды из Москвы и Ростова-на-Дону.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <ul className="space-y-2 text-background/70 text-sm">
              <li className="flex items-center gap-2"><Icon name="Phone" size={16} /><a href="tel:+79085144500" className="hover:text-background">+7 (908) 514-45-00</a></li>
              <li className="flex items-center gap-2"><Icon name="Mail" size={16} /><a href="mailto:a5144500@inbox.ru" className="hover:text-background">a5144500@inbox.ru</a></li>
              <li className="flex items-center gap-2"><Icon name="MapPin" size={16} /> Москва / Ростов-на-Дону</li>
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
    </>
  );
};

export default BookingSection;
