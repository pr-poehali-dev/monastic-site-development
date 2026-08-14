import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { APPLICATIONS_URL } from '@/lib/api';
import { TOURS } from '@/components/palomnik/constants';
import WelcomeModals from '@/components/palomnik/WelcomeModals';
import SiteHeader from '@/components/palomnik/SiteHeader';
import TourSections from '@/components/palomnik/TourSections';
import BookingSection from '@/components/palomnik/BookingSection';

const Index = () => {
  const { toast } = useToast();
  const [menu, setMenu] = useState(false);
  const [sending, setSending] = useState(false);
  const [activeTour, setActiveTour] = useState(0);
  const [form, setForm] = useState({ name: '', phone: '', date: '', comment: '' });
  const [showSaintInfo, setShowSaintInfo] = useState(false);
  const [activeSaint, setActiveSaint] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);

  const tour = TOURS[activeTour];

  useEffect(() => {
    const t = setTimeout(() => setShowWelcome(true), 700);
    return () => clearTimeout(t);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenu(false);
  };

  const switchTour = (idx: number) => {
    setActiveTour(idx);
    setTimeout(() => document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' }), 50);
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
        body: JSON.stringify({ ...form, route: tour.heroTitle, travel_date: form.date }),
      });
      if (!res.ok) throw new Error();
      toast({ title: 'Заявка отправлена!', description: 'Мы свяжемся с вами в ближайшее время.' });
      setForm({ name: '', phone: '', date: '', comment: '' });
    } catch {
      toast({ title: 'Не удалось отправить заявку', description: 'Попробуйте ещё раз позже.', variant: 'destructive' });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <WelcomeModals
        showWelcome={showWelcome}
        setShowWelcome={setShowWelcome}
        showSaintInfo={showSaintInfo}
        setShowSaintInfo={setShowSaintInfo}
        activeSaint={activeSaint}
        setActiveSaint={setActiveSaint}
        go={go}
      />

      <SiteHeader menu={menu} setMenu={setMenu} go={go} tour={tour} />

      <TourSections activeTour={activeTour} switchTour={switchTour} tour={tour} />

      <BookingSection
        tour={tour}
        form={form}
        setForm={setForm}
        sending={sending}
        submit={submit}
        go={go}
      />
    </div>
  );
};

export default Index;