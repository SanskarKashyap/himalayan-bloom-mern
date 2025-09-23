import { EVENTS } from '../../../data/events.js';
import { useLanguage } from '../../../contexts/LanguageContext.jsx';
import { useSwiper } from '../../../hooks/useSwiper.js';

export default function StoriesSection() {
  const { t, locale } = useLanguage();
  useSwiper('#events .init-swiper');

  return (
    <section id="events" className="events section">
      <div className="container-fluid" data-aos="fade-up" data-aos-delay="100">
        <div className="swiper init-swiper">
          <div
            className="swiper-config"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                loop: true,
                speed: 600,
                autoplay: { delay: 5000 },
                pagination: {
                  el: '.swiper-pagination',
                  type: 'bullets',
                  clickable: true,
                },
                breakpoints: {
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 40,
                  },
                  1200: {
                    slidesPerView: 3,
                    spaceBetween: 1,
                  },
                },
              }),
            }}
          />
          <div className="swiper-wrapper">
            {EVENTS.map((event) => (
              <div
                key={event.title.en}
                className="swiper-slide event-item d-flex flex-column justify-content-end"
                style={{ backgroundImage: `url(${event.image})` }}
              >
                <h3>{event.title[locale]}</h3>
                <div className="price align-self-start">{event.tag[locale]}</div>
                <p className="description">{event.description[locale]}</p>
              </div>
            ))}
          </div>
          <div className="swiper-pagination" />
        </div>
      </div>
    </section>
  );
}
