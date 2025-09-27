import { ARTISANS } from '../../../data/artisans.js';
import SectionHeader from '../../shared/SectionHeader.jsx';
import { useLanguage } from '../../../contexts/LanguageContext.jsx';
import { useTrackingClass } from '../../../hooks/useTrackingClass.js';

export default function ArtisansSection() {
  const { t, locale } = useLanguage();
  const trackingClass = useTrackingClass();

  return (
    <section id="chefs" className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionHeader
          eyebrow={t('artisans.subtitlePrefix')}
          title={t('artisans.title')}
          subheading={t('artisans.subtitle')}
          description={t('artisans.description')}
        />

        <div className="mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {ARTISANS.map((artisan, index) => (
            <article
              key={artisan.name.en}
              className="group overflow-hidden rounded-[2rem] border border-white/50 bg-white/85 shadow-royal transition duration-500 ease-soft-spring hover:-translate-y-2 hover:shadow-royal dark:border-white/10 dark:bg-white/5"
              data-aos="fade-up"
              data-aos-delay={100 + index * 40}
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={artisan.image}
                  alt={artisan.name[locale]}
                  className="h-full w-full object-cover transition duration-700 ease-soft-spring group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-royal-night via-transparent to-transparent opacity-70 transition group-hover:opacity-90" />
                <div className={`absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-1 text-xs font-semibold uppercase ${trackingClass('tracking-[0.28em]')} text-white`}>
                  {artisan.role[locale]}
                </div>
              </div>
              <div className="flex flex-col gap-4 p-8">
                <div>
                  <h3 className="font-heading text-xl text-royal-heading dark:text-royal-white">
                    {artisan.name[locale]}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-royal-muted dark:text-royal-white/70">
                    {artisan.description[locale]}
                  </p>
                </div>
                <div className="mt-auto flex items-center gap-3 text-royal-gold">
                  <a href={artisan.social.facebook} aria-label="Facebook" className="transition hover:text-royal-heading dark:hover:text-royal-white">
                    <i className="bi bi-facebook" />
                  </a>
                  <a href={artisan.social.instagram} aria-label="Instagram" className="transition hover:text-royal-heading dark:hover:text-royal-white">
                    <i className="bi bi-instagram" />
                  </a>
                  <a href={artisan.social.linkedin} aria-label="LinkedIn" className="transition hover:text-royal-heading dark:hover:text-royal-white">
                    <i className="bi bi-linkedin" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
