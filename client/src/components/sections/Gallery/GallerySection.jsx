import { GALLERY_IMAGES } from '../../../data/gallery.js';
import SectionHeader from '../../shared/SectionHeader.jsx';
import { useLanguage } from '../../../contexts/LanguageContext.jsx';
import { useSwiper } from '../../../hooks/useSwiper.js';

export default function GallerySection() {
  const { t, locale } = useLanguage();
  useSwiper('#gallery .init-swiper');

  return (
    <section id="gallery" className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionHeader
          eyebrow={t('gallery.subtitlePrefix')}
          title={t('gallery.title')}
          subheading={t('gallery.subtitle')}
          description={t('gallery.description')}
        />
      </div>

      <div className="mt-12 px-2 sm:px-8" data-aos="fade-up" data-aos-delay="120">
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
                  320: { slidesPerView: 1, spaceBetween: 16 },
                  768: { slidesPerView: 3, spaceBetween: 20 },
                  1200: { slidesPerView: 5, spaceBetween: 24 },
                },
              }),
            }}
          />
          <div className="swiper-wrapper">
            {GALLERY_IMAGES.map((image) => (
              <div key={image.src} className="swiper-slide">
                <a
                  className="glightbox group block overflow-hidden rounded-[2rem] border border-white/40 bg-white/60 shadow-royal transition duration-500 hover:-translate-y-1 hover:shadow-royal dark:border-white/10 dark:bg-white/5"
                  data-gallery="images-gallery"
                  href={image.src}
                >
                  <img
                    src={image.src}
                    alt={image.alt[locale]}
                    className="h-64 w-full object-cover transition duration-700 ease-soft-spring group-hover:scale-105"
                  />
                </a>
              </div>
            ))}
          </div>
          <div className="swiper-pagination !relative !mt-8" />
        </div>
      </div>
    </section>
  );
}
