import { PRODUCTS } from '../../../data/products.js';
import SectionHeader from '../../shared/SectionHeader.jsx';
import { useLanguage } from '../../../contexts/LanguageContext.jsx';

export default function CollectionSection() {
  const { t, locale } = useLanguage();

  return (
    <section id="collection" className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionHeader
          eyebrow={t('collection.subtitlePrefix')}
          title={t('collection.title')}
          subheading={t('collection.subtitle')}
          description={`${t('collection.rememberLabel')} ${t('collection.rememberCopy')}`}
        />

        <div className="mt-14 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {PRODUCTS.map((product, index) => (
            <article
              key={product.slug}
              className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/60 bg-white/85 shadow-royal transition duration-500 ease-soft-spring hover:-translate-y-2 hover:shadow-royal dark:border-white/10 dark:bg-white/5"
              data-aos="fade-up"
              data-aos-delay={100 + index * 40}
            >
              <div className="relative overflow-hidden bg-royal-gold/5">
                <img
                  src={product.image}
                  alt={product.alt[locale]}
                  className="mx-auto h-52 w-full object-contain transition duration-700 ease-soft-spring group-hover:scale-105"
                />
                <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-royal-gold/40 bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.38em] text-royal-muted/80 shadow-sm shadow-black/5 dark:border-white/10 dark:bg-white/10 dark:text-royal-white/70">
                  {t('collection.badge') ?? 'Limited batch'}
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-4 p-8">
                <div>
                  <h3 className="font-heading text-xl text-royal-heading dark:text-royal-white">
                    {product.name[locale]}
                  </h3>
                  <p className="mt-2 text-sm font-medium uppercase tracking-[0.25em] text-royal-gold">
                    {product.tagline[locale]}
                  </p>
                </div>
                <ul className="space-y-3 text-sm text-royal-muted dark:text-royal-white/70">
                  {product.uses[locale].map((use, useIndex) => (
                    <li key={`${product.slug}-use-${useIndex}`} className="flex items-start gap-3">
                      <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-royal-gold" aria-hidden="true" />
                      <span>{use}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-2">
                  <a href="#preorder" className="btn-royal w-full justify-center text-xs">
                    {t('collection.cta')}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
