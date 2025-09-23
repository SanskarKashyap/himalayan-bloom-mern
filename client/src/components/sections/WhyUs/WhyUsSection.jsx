import { WHY_US_FEATURES } from '../../../data/whyUs.js';
import { useLanguage } from '../../../contexts/LanguageContext.jsx';

export default function WhyUsSection() {
  const { t } = useLanguage();

  return (
    <section id="why-us" className="why-us section light-background">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-4 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="100">
            <div className="why-box h-100 d-flex flex-column justify-content-between">
              <h3>{t('whyUs.title')}</h3>
              <p>{t('whyUs.description')}</p>
              <div className="text-center mt-auto">
                <a href="#about" className="more-btn">
                  <span>{t('whyUs.cta')}</span>
                  <i className="bi bi-chevron-right" />
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-8 d-flex align-items-stretch">
            <div className="row gy-4 w-100">
              {WHY_US_FEATURES.map((feature, index) => (
                <div
                  className="col-xl-4 d-flex align-items-stretch"
                  key={feature.key}
                  data-aos="fade-up"
                  data-aos-delay={150 + index * 50}
                >
                  <div className="icon-box h-100 d-flex flex-column justify-content-center align-items-center">
                    <i className={`bi ${feature.icon}`} />
                    <h4>{t(`whyUs.features.${feature.key}.title`)}</h4>
                    <p>{t(`whyUs.features.${feature.key}.description`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
