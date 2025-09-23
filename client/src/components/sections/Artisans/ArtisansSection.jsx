import { ARTISANS } from '../../../data/artisans.js';
import { useLanguage } from '../../../contexts/LanguageContext.jsx';

export default function ArtisansSection() {
  const { t, locale } = useLanguage();

  return (
    <section id="chefs" className="chefs section">
      <div className="container section-title" data-aos="fade-up">
        <h2>{t('artisans.title')}</h2>
        <p>
          <span>{t('artisans.subtitlePrefix')}</span>
          <span className="description-title">{t('artisans.subtitle')}</span>
        </p>
      </div>

      <div className="container">
        <div className="row gy-4">
          {ARTISANS.map((artisan, index) => (
            <div className="col-lg-4 col-md-6" key={artisan.name.en} data-aos="fade-up" data-aos-delay={100 + index * 50}>
              <div className="member">
                <img src={artisan.image} className="img-fluid" alt={artisan.name[locale]} />
                <div className="member-info">
                  <div className="member-info-content">
                    <h4>{artisan.name[locale]}</h4>
                    <span>{artisan.role[locale]}</span>
                    <p>{artisan.description[locale]}</p>
                  </div>
                  <div className="social">
                    <a href={artisan.social.facebook} aria-label="Facebook">
                      <i className="bi bi-facebook" />
                    </a>
                    <a href={artisan.social.instagram} aria-label="Instagram">
                      <i className="bi bi-instagram" />
                    </a>
                    <a href={artisan.social.linkedin} aria-label="LinkedIn">
                      <i className="bi bi-linkedin" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
