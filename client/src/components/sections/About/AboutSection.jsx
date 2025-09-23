import aboutImage from '../../../static-bootstrap/assets/img/about.jpg';
import aboutSecondaryImage from '../../../static-bootstrap/assets/img/about-2.jpg';
import SectionHeader from '../../shared/SectionHeader.jsx';
import { useLanguage } from '../../../contexts/LanguageContext.jsx';

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionHeader
          eyebrow={t('about.subtitlePrefix')}
          title={t('about.title')}
          subheading={t('about.subtitle')}
          alignment="left"
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="flex flex-col justify-center space-y-10">
            <p className="text-lg leading-relaxed text-royal-muted dark:text-royal-white/70">
              {t('about.description')}
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="card-royal p-6">
                <h3 className="font-heading text-xl text-royal-heading dark:text-royal-white">
                  {t('about.founderTitle')}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-royal-muted dark:text-royal-white/70">
                  {t('about.founderSubtitle')}
                </p>
                <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-royal-gold/30 bg-royal-gold/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-royal-gold/80">
                  {t('about.heritage') ?? 'Apiculture Heritage • Est. 1999'}
                </div>
              </div>
              <a
                href="https://youtu.be/gURe4sclFzU"
                className="group relative block overflow-hidden rounded-[2rem] border border-royal-gold/20 bg-white/70 shadow-royal transition hover:-translate-y-1 hover:shadow-royal dark:border-white/10 dark:bg-white/10"
                aria-label={t('about.videoLabel')}
              >
                <img
                  src={aboutSecondaryImage}
                  alt={t('about.secondaryImageAlt')}
                  className="h-full w-full object-cover transition duration-700 ease-soft-spring group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-royal-night/70 via-transparent to-transparent opacity-70 transition duration-500 group-hover:opacity-90" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-royal-gold text-royal-night shadow-royal-soft transition duration-500 group-hover:scale-105">
                    <i className="bi bi-play-fill text-2xl" />
                  </span>
                </span>
              </a>
            </div>
          </div>

          <div className="relative flex items-center justify-center pb-16 lg:pb-0">
            <div className="relative w-full max-w-xl">
              <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full border border-royal-gold/40" aria-hidden="true" />
              <div className="absolute -right-10 bottom-4 h-24 w-24 rounded-full bg-royal-gold/20 blur-3xl" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[3rem] border border-white/60 bg-white/90 shadow-royal backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-royal-glow">
                <img
                  src={aboutImage}
                  alt={t('about.primaryImageAlt')}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 left-1/2 w-[78%] -translate-x-1/2">
                <div className="card-royal flex items-center gap-4 rounded-[2rem] p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-royal-gold/20 text-royal-gold">
                    <i className="bi bi-award" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-royal-muted/70 dark:text-royal-white/50">
                      {t('about.badgeLabel') ?? 'SLOW FOOD CERTIFIED'}
                    </p>
                    <p className="font-heading text-lg text-royal-heading dark:text-royal-white">
                      {t('about.badgeValue') ?? 'Ethically harvested & lab verified'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
