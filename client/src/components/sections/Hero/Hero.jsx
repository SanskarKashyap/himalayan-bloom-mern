import heroImage from '../../../static-bootstrap/assets/img/hero-img.png';
import { useLanguage } from '../../../contexts/LanguageContext.jsx';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="hero" className="hero section light-background">
      <div className="container">
        <div className="row gy-5 justify-content-center">
          <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center text-center">
            <h1 className="hero-title">
              <span className="text-accent">{t('hero.titleAccent')}</span>
              <span className="hero-title-tail">{t('hero.titleTail')}</span>
            </h1>
            <p className="lead" data-aos="fade-up" data-aos-delay="100">
              {t('hero.subtitle')}
            </p>
            <div className="d-flex justify-content-center" data-aos="fade-up" data-aos-delay="200">
              <a href="#collection" className="btn-get-started">
                {t('hero.ctaPrimary')}
              </a>
            </div>
            <p className="mt-3 text-muted small" data-aos="fade-up" data-aos-delay="300">
              <span className="text-accent fw-semibold">{t('hero.meta')}</span>
            </p>
          </div>
          <div
            className="col-lg-6 order-1 order-lg-2 hero-img d-flex align-items-center justify-content-center"
            data-aos="zoom-out"
          >
            <img src={heroImage} className="img-fluid animated" alt={t('hero.imageAlt')} />
          </div>
        </div>
      </div>
    </section>
  );
}
