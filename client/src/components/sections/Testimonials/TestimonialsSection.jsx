import { TESTIMONIALS } from '../../../data/testimonials.js';
import { useLanguage } from '../../../contexts/LanguageContext.jsx';
import { useSwiper } from '../../../hooks/useSwiper.js';

export default function TestimonialsSection() {
  const { t, locale } = useLanguage();
  useSwiper('#testimonials .init-swiper');

  return (
    <section id="testimonials" className="testimonials section light-background">
      <div className="container section-title" data-aos="fade-up">
        <h2>{t('testimonials.title')}</h2>
        <p>
          {t('testimonials.introPrefix')}{' '}
          <span className="description-title">{t('testimonials.introHighlight')}</span>
        </p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="swiper init-swiper">
          <div
            className="swiper-config"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                loop: true,
                speed: 600,
                autoplay: { delay: 5000 },
                slidesPerView: 'auto',
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
              <div key={testimonial.name.en} className="swiper-slide">
                <div className="testimonial-item">
                  <div className="row gy-4 justify-content-center">
                    <div className="col-lg-6">
                      <div className="testimonial-content">
                        <p>
                          <i className="bi bi-quote quote-icon-left" />
                          <span>{testimonial.quote[locale]}</span>
                          <i className="bi bi-quote quote-icon-right" />
                        </p>
                        <h3>{testimonial.name[locale]}</h3>
                        <h4>{testimonial.title[locale]}</h4>
                        <div className="stars">
                          <i className="bi bi-star-fill" />
                          <i className="bi bi-star-fill" />
                          <i className="bi bi-star-fill" />
                          <i className="bi bi-star-fill" />
                          <i className="bi bi-star-fill" />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 text-center">
                      <img src={testimonial.image} className="img-fluid testimonial-img" alt={testimonial.name[locale]} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="swiper-pagination" />
        </div>
      </div>
    </section>
  );
}
