import { useLanguage } from '../../../contexts/LanguageContext.jsx';

export default function SpecialOffer() {
  const { t } = useLanguage();

  return (
    <section id="special-offer" className="special-offer section light-background">
      <div className="container text-center" data-aos="fade-up">
        <div className="offer-box">
          <h2>{t('specialOffer.title')}</h2>
          <p className="lead">{t('specialOffer.description')}</p>
          <a href="#collection" className="btn-get-started">
            {t('specialOffer.cta')}
          </a>
        </div>
      </div>
    </section>
  );
}
