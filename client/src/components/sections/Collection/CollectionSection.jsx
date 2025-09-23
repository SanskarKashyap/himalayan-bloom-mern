import { PRODUCTS } from '../../../data/products.js';
import { useLanguage } from '../../../contexts/LanguageContext.jsx';

export default function CollectionSection() {
  const { t, locale } = useLanguage();

  return (
    <section id="collection" className="menu section">
      <div className="container section-title" data-aos="fade-up">
        <h2>{t('collection.title')}</h2>
        <p>
          <span>{t('collection.subtitlePrefix')}</span>
          <span className="description-title">{t('collection.subtitle')}</span>
        </p>
        <p className="mt-3">
          <strong>{t('collection.rememberLabel')}</strong>
          <span> {t('collection.rememberCopy')}</span>
        </p>
      </div>

      <div className="container">
        <div className="row gy-5">
          {PRODUCTS.map((product, index) => (
            <div
              className="col-lg-4 menu-item d-flex flex-column"
              key={product.slug}
              data-aos="fade-up"
              data-aos-delay={100 + index * 50}
            >
              <img src={product.image} className="menu-img img-fluid" alt={product.alt[locale]} />
              <h4 className="text-center">{product.name[locale]}</h4>
              <p className="ingredients">{product.tagline[locale]}</p>
              <p
                className="menu-description"
                dangerouslySetInnerHTML={{ __html: product.uses[locale].join('<br />') }}
              />
              <a href="#preorder" className="btn btn-primary mt-auto align-self-center">
                <span>{t('collection.cta')}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
