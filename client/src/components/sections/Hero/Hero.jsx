import { Link } from 'react-router-dom';
import heroImage from '../../../static-bootstrap/assets/img/hero-img.png';
import { useLanguage } from '../../../contexts/LanguageContext.jsx';

export default function Hero() {
  const { t } = useLanguage();
  const rawVideoLabel = t('hero.videoLabel');
  const heroStats = ['Single-origin', '3400m altitude', 'Cold extracted'];
  const computedStats = ['hero.statPurity', 'hero.statAltitude', 'hero.statHarvest'].map((key, index) => {
    const value = t(key);
    return value === key ? heroStats[index] : value;
  });
  const videoLabel = rawVideoLabel === 'hero.videoLabel' ? 'Meet the Beekeeper' : rawVideoLabel;

  return (
    <section
      id="hero"
      className="relative overflow-hidden py-24 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-royal-gradient" />
        <div className="absolute -right-32 top-24 h-72 w-72 rounded-full bg-royal-gold/20 blur-3xl sm:h-80 sm:w-80" />
        <div className="absolute -left-20 bottom-10 h-64 w-64 rounded-full bg-royal-plum/20 blur-3xl" />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-16 px-6 sm:px-10 lg:flex-row lg:gap-20">
        <div className="flex w-full max-w-2xl flex-col items-center text-center lg:items-start lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.38em] text-royal-muted shadow-sm shadow-black/5 backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-royal-white/80">
            {t('hero.meta')}
          </div>

          <h1 className="mt-6 text-4xl font-semibold leading-tight text-royal-heading sm:text-5xl lg:text-6xl dark:text-royal-white">
            <span className="relative inline-block">
              <span className="absolute inset-x-0 bottom-1 h-3 rounded-full bg-royal-gold/40 blur-sm" aria-hidden="true" />
              <span className="relative text-royal-gold">{t('hero.titleAccent')}</span>
            </span>
            <span className="block font-heading font-semibold text-royal-heading dark:text-royal-white">
              {t('hero.titleTail')}
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-royal-muted dark:text-royal-white/70">
            {t('hero.subtitle')}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <Link to="/shop" className="btn-royal text-xs sm:text-sm">
              {t('hero.ctaPrimary')}
            </Link>
            <Link
              to="/about"
              className="group inline-flex items-center gap-3 rounded-full border border-royal-gold/40 bg-transparent px-6 py-3 text-sm font-semibold text-royal-heading transition duration-500 ease-soft-spring hover:-translate-y-0.5 hover:border-royal-gold hover:text-royal-gold dark:border-white/10 dark:text-royal-white"
            >
              <span>{videoLabel}</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-royal-gold/20 text-royal-gold transition group-hover:bg-royal-gold group-hover:text-royal-night">
                <i className="bi bi-play-fill" />
              </span>
            </Link>
          </div>
        </div>

        <div className="relative w-full max-w-xl">
          <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-royal-gold/25 via-white/30 to-transparent blur-2xl" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-[3rem] border border-white/60 bg-white/80 p-8 shadow-royal backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-royal-glow">
            <img
              src={heroImage}
              alt={t('hero.imageAlt')}
              className="mx-auto max-h-[420px] w-full object-contain animate-float"
            />
            <div className="mt-8 grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
              {computedStats.map((stat) => (
                <div
                  key={stat}
                  className="rounded-2xl border border-royal-gold/40 bg-white/80 px-4 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-royal-heading shadow-sm shadow-black/5 dark:border-white/10 dark:bg-white/5 dark:text-royal-white"
                >
                  {stat}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
