import { EVENTS } from '../../../data/events.js';
import SectionHeader from '../../shared/SectionHeader.jsx';
import { useLanguage } from '../../../contexts/LanguageContext.jsx';
import { useSwiper } from '../../../hooks/useSwiper.js';

export default function StoriesSection() {
  const { t, locale } = useLanguage();
  useSwiper('#events .init-swiper');

  return (
    <section id="events" className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-0 sm:px-6">
        <div className="px-6 sm:px-10">
          <SectionHeader
            eyebrow={t('stories.subtitlePrefix')}
            title={t('stories.title')}
            subheading={t('stories.subtitle')}
            description={t('stories.description')}
          />
        </div>

        <div className="mt-12" data-aos="fade-up" data-aos-delay="120">
          <div className="swiper init-swiper">
            <div
              className="swiper-config"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  loop: true,
                  speed: 600,
                  autoplay: { delay: 6000 },
                  pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                    clickable: true,
                  },
                  breakpoints: {
                    320: { slidesPerView: 1, spaceBetween: 24 },
                    768: { slidesPerView: 2, spaceBetween: 24 },
                    1200: { slidesPerView: 3, spaceBetween: 24 },
                  },
                }),
              }}
            />
            <div className="swiper-wrapper">
              {EVENTS.map((event) => (
                <div key={event.title.en} className="swiper-slide px-2 py-4 sm:px-4">
                  <article className="relative flex h-[420px] flex-col justify-end overflow-hidden rounded-[2.5rem] border border-white/50 bg-royal-night/30 shadow-royal">
                    <img
                      src={event.image}
                      alt={event.title[locale]}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-royal-night via-royal-night/10 to-transparent" />
                    <div className="relative space-y-4 p-10 text-white">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em]">
                        {event.tag[locale]}
                      </span>
                      <h3 className="font-heading text-2xl leading-snug">
                        {event.title[locale]}
                      </h3>
                      <p className="text-sm leading-relaxed text-white/80">
                        {event.description[locale]}
                      </p>
                    </div>
                  </article>
                </div>
              ))}
            </div>
            <div className="swiper-pagination !relative !mt-6" />
          </div>
        </div>
      </div>
    </section>
  );
}
