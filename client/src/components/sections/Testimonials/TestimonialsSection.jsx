import { TESTIMONIALS } from '../../../data/testimonials.js';
import SectionHeader from '../../shared/SectionHeader.jsx';
import { useLanguage } from '../../../contexts/LanguageContext.jsx';
import { useSwiper } from '../../../hooks/useSwiper.js';

export default function TestimonialsSection() {
  const { t, locale } = useLanguage();
  useSwiper('#testimonials .init-swiper');

  return (
    <section id="testimonials" className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionHeader
          eyebrow={t('testimonials.introPrefix')}
          title={t('testimonials.title')}
          subheading={t('testimonials.introHighlight')}
          description={t('testimonials.subtitle')}
        />

        <div className="mt-12" data-aos="fade-up" data-aos-delay="120">
          <div className="swiper init-swiper">
            <div
              className="swiper-config"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  loop: true,
                  speed: 600,
                  autoplay: { delay: 6000 },
                  slidesPerView: 'auto',
                  spaceBetween: 32,
                  pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                    clickable: true,
                  },
                }),
              }}
            />
            <div className="swiper-wrapper">
              {TESTIMONIALS.map((testimonial) => (
                <div key={testimonial.name.en} className="swiper-slide !w-auto px-2 py-4 sm:px-4">
                  <article className="flex h-full w-[320px] flex-col gap-6 rounded-[2rem] border border-white/60 bg-white/90 p-8 shadow-royal transition duration-500 ease-soft-spring hover:-translate-y-1 hover:shadow-royal dark:border-white/10 dark:bg-white/5 sm:w-[380px]">
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name[locale]}
                        className="h-16 w-16 rounded-2xl object-cover"
                      />
                      <div>
                        <h3 className="font-heading text-lg text-royal-heading dark:text-royal-white">
                          {testimonial.name[locale]}
                        </h3>
                        <p className="text-sm text-royal-muted dark:text-royal-white/70">
                          {testimonial.title[locale]}
                        </p>
                      </div>
                    </div>
                    <p className="flex-1 text-sm leading-relaxed text-royal-muted dark:text-royal-white/70">
                      <span className="mr-2 text-3xl text-royal-gold">“</span>
                      {testimonial.quote[locale]}
                    </p>
                    <div className="flex items-center gap-2 text-royal-gold">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <i key={`star-${testimonial.name.en}-${index}`} className="bi bi-star-fill" />
                      ))}
                    </div>
                  </article>
                </div>
              ))}
            </div>
            <div className="swiper-pagination !relative !mt-8" />
          </div>
        </div>
      </div>
    </section>
  );
}
