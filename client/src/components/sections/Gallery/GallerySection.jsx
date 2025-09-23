import { GALLERY_IMAGES } from '../../../data/gallery.js';
import { useLanguage } from '../../../contexts/LanguageContext.jsx';
import { useSwiper } from '../../../hooks/useSwiper.js';

export default function GallerySection() {
  const { t, locale } = useLanguage();
  useSwiper('#gallery .init-swiper');

  return (
    <section id="gallery" className="gallery section light-background">
      <div className="container section-title" data-aos="fade-up">
        <h2>{t('gallery.title')}</h2>
        <p>
          <span>{t('gallery.subtitlePrefix')}</span>
          <span className="description-title">{t('gallery.subtitle')}</span>
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
                centeredSlides: true,
                pagination: {
                  el: '.swiper-pagination',
                  type: 'bullets',
                  clickable: true,
                },
                breakpoints: {
                  320: { slidesPerView: 1, spaceBetween: 0 },
                  768: { slidesPerView: 3, spaceBetween: 20 },
                  1200: { slidesPerView: 5, spaceBetween: 20 },
                },
              }),
            }}
          />
          <div className="swiper-wrapper align-items-center">
            {GALLERY_IMAGES.map((image) => (
              <div key={image.src} className="swiper-slide">
                <a className="glightbox" data-gallery="images-gallery" href={image.src}>
                  <img src={image.src} className="img-fluid" alt={image.alt[locale]} />
                </a>
              </div>
            ))}
          </div>
          <div className="swiper-pagination" />
        </div>
      </div>
    </section>
  );
}
