import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface RecruitmentBannerProps {
  go: (id: string) => void;
}

const RecruitmentBanner = ({ go }: RecruitmentBannerProps) => {
  return (
    <section className="relative py-20 md:py-28 bg-foreground text-background overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-ornament" />
      <div className="relative container text-center max-w-4xl">
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="h-px w-16 bg-accent" />
          <Icon name="Cross" size={22} className="text-accent" />
          <span className="h-px w-16 bg-accent" />
        </div>
        <p className="text-sm md:text-base uppercase tracking-[0.35em] text-background/70 mb-5">Паломнические поездки</p>
        <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-6 text-balance">
          Идёт набор групп на <span className="text-accent">2027</span> год
        </h2>
        <p className="font-display text-2xl md:text-4xl text-background/90 mb-10">Успей занять своё место!</p>
        <p className="text-background/70 max-w-2xl mx-auto mb-10 text-lg">
          Выезды два раза в месяц, начиная с 6 июня 2027 года. Количество мест в группах ограничено.
        </p>
        <Button
          size="lg"
          onClick={() => go('booking')}
          className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-10 py-6"
        >
          Записаться в группу
        </Button>
      </div>
    </section>
  );
};

export default RecruitmentBanner;
