import { Link } from 'react-router-dom';
import { useLanguage } from '../../../contexts/LanguageContext.jsx';

export default function SpecialOffer() {
  const { t } = useLanguage();

  return (
    <section id="special-offer" className="py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-gradient-to-br from-royal-gold/15 via-white/80 to-white/90 p-10 text-center shadow-royal backdrop-blur dark:border-white/10 dark:from-royal-night-soft/70 dark:via-royal-night-soft/60 dark:to-royal-night">
          <div className="pointer-events-none absolute inset-0 z-0">
            <div className="absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-royal-gold/30 blur-3xl" aria-hidden="true" />
            <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-royal-plum/20 blur-3xl" aria-hidden="true" />
            <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-royal-gold/30 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-royal-muted shadow-sm shadow-black/5 dark:border-white/10 dark:bg-white/10 dark:text-royal-white/70">
              {t('specialOffer.badge') ?? 'Limited Release'}
            </div>
          </div>

          <div className="relative z-10 space-y-6 animate-fade-up">
            <h2 className="text-3xl font-semibold leading-tight text-royal-heading sm:text-4xl dark:text-royal-white">
              {t('specialOffer.title')}
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-royal-muted dark:text-royal-white/70">
              {t('specialOffer.description')}
            </p>
            <Link to="/shop" className="btn-royal inline-flex text-xs sm:text-sm">
              {t('specialOffer.cta')}
            </Link>
            <p className="text-xs uppercase tracking-[0.32em] text-royal-muted/80 dark:text-royal-white/50">
              {t('specialOffer.meta') ?? 'Complimentary tasting kit • Ships March 2025'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
