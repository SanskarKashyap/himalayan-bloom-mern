import aboutImage from '../../../static-bootstrap/assets/img/about.jpg';
import aboutSecondaryImage from '../../../static-bootstrap/assets/img/about-2.jpg';
import { useLanguage } from '../../../contexts/LanguageContext.jsx';

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="about section">
      <div className="container section-title" data-aos="fade-up">
        <h2>{t('about.title')}</h2>
        <p>
          <span>{t('about.subtitlePrefix')}</span>
          <span className="description-title">{t('about.subtitle')}</span>
        </p>
      </div>

      <div className="container">
        <div className="row gy-4 align-items-center">
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
            <img src={aboutImage} className="img-fluid mb-4" alt={t('about.primaryImageAlt')} />
            <div className="book-a-table">
              <h3>{t('about.founderTitle')}</h3>
              <p>{t('about.founderSubtitle')}</p>
            </div>
          </div>
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="250">
            <div className="content ps-0 ps-lg-5">
              <p className="fst-italic">{t('about.description')}</p>
              <div className="position-relative mt-4">
                <img src={aboutSecondaryImage} className="img-fluid" alt={t('about.secondaryImageAlt')} />
                <a href="https://youtu.be/gURe4sclFzU" className="glightbox pulsating-play-btn" aria-label={t('about.videoLabel')} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
