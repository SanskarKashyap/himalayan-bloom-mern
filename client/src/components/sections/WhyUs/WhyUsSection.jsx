import { WHY_US_FEATURES } from '../../../data/whyUs.js';
import SectionHeader from '../../shared/SectionHeader.jsx';
import { useLanguage } from '../../../contexts/LanguageContext.jsx';

export default function WhyUsSection() {
  const { t } = useLanguage();

  return (
    <section id="why-us" className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionHeader
          eyebrow={t('whyUs.eyebrow') ?? 'Why Himalayan Blossom'}
          title={t('whyUs.title')}
          description={t('whyUs.description')}
          alignment="left"
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative overflow-hidden rounded-[2.75rem] border border-white/60 bg-gradient-to-br from-royal-plum/15 via-white/70 to-white/90 p-10 shadow-royal backdrop-blur dark:border-white/10 dark:from-royal-night-soft/70 dark:via-royal-night-soft/60 dark:to-royal-night">
            <div className="absolute inset-y-0 right-0 w-1/2 bg-royal-gold/10 blur-3xl" aria-hidden="true" />
            <div className="relative space-y-6">
              <h3 className="font-heading text-2xl text-royal-heading dark:text-royal-white">
                {t('whyUs.ctaTitle') ?? 'A rare terroir, bottled with integrity'}
              </h3>
              <p className="text-base leading-relaxed text-royal-muted dark:text-royal-white/70">
                {t('whyUs.ctaDescription') ??
                  'From hive health tracking to slow, cold extraction, every jar is an ode to Himalayan ecology and ancestral craft.'}
              </p>
              <a
                href="#about"
                className="group inline-flex items-center gap-3 rounded-full border border-royal-gold/40 bg-royal-gold/10 px-6 py-3 text-sm font-semibold text-royal-heading transition duration-500 ease-soft-spring hover:-translate-y-0.5 hover:border-royal-gold hover:bg-royal-gold hover:text-royal-night dark:border-white/10 dark:text-royal-white"
              >
                <span>{t('whyUs.cta')}</span>
                <i className="bi bi-chevron-right text-base" />
              </a>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {WHY_US_FEATURES.map((feature, index) => (
              <div
                key={feature.key}
                className="group card-royal relative flex h-full flex-col gap-4 rounded-[1.8rem] border border-white/50 bg-white/80 p-6 text-center shadow-royal transition duration-500 hover:-translate-y-2 hover:shadow-royal dark:border-white/10 dark:bg-white/5"
                data-aos="fade-up"
                data-aos-delay={150 + index * 40}
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-royal-gold/20 text-royal-gold transition group-hover:bg-royal-gold group-hover:text-royal-night">
                  <i className={`bi ${feature.icon} text-xl`} />
                </div>
                <h4 className="font-heading text-lg text-royal-heading dark:text-royal-white">
                  {t(`whyUs.features.${feature.key}.title`)}
                </h4>
                <p className="text-sm leading-relaxed text-royal-muted dark:text-royal-white/70">
                  {t(`whyUs.features.${feature.key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
