import { useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PRODUCTS } from '../data/products.js';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useCart } from '../contexts/CartContext.jsx';
import { useTrackingClass } from '../hooks/useTrackingClass.js';

function formatCurrency(value, locale = 'en') {
  const formatter = new Intl.NumberFormat(locale === 'hi' ? 'hi-IN' : 'en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  });
  return formatter.format(value);
}

export default function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { locale, t } = useLanguage();
  const { addToCart } = useCart();
  const trackingClass = useTrackingClass();
  const taglineTrackingClass = trackingClass('tracking-[0.25em]');

  const product = useMemo(() => PRODUCTS.find((item) => item.slug === slug), [slug]);

  if (!product) {
    return (
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center sm:px-10">
          <h1 className="font-heading text-3xl text-royal-heading dark:text-royal-white">
            {t('product.notFoundTitle') ?? 'Product not found'}
          </h1>
          <p className="mt-4 text-royal-muted dark:text-royal-white/70">
            {t('product.notFoundCopy') ?? 'This honey has flown elsewhere. Let’s find you another variety.'}
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button
              type="button"
              className="rounded-full border border-royal-gold/30 bg-royal-gold/10 px-6 py-3 text-sm font-semibold text-royal-heading transition hover:border-royal-gold hover:bg-royal-gold hover:text-royal-night dark:border-white/20 dark:text-royal-white"
              onClick={() => navigate(-1)}
            >
              {t('product.back') ?? 'Go back'}
            </button>
            <Link to="/shop" className="btn-royal">
              {t('product.shop') ?? 'Browse collection'}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 sm:px-10 lg:flex-row">
        <div className="flex w-full max-w-xl flex-col gap-6">
          <div className="relative overflow-hidden rounded-[3rem] border border-white/60 bg-white/80 p-10 shadow-royal dark:border-white/10 dark:bg-white/5">
            <img src={product.image} alt={product.alt[locale]} className="mx-auto h-full max-h-[420px] w-full object-contain" />
          </div>
          <Link
            to="/shop"
            className="flex items-center justify-center gap-2 rounded-full border border-royal-gold/30 bg-royal-gold/10 px-4 py-2 text-sm font-semibold text-royal-heading transition hover:border-royal-gold hover:bg-royal-gold hover:text-royal-night dark:border-white/20 dark:text-royal-white"
          >
            <i className="bi bi-chevron-left" />
            {t('product.backToShop') ?? 'Back to all honeys'}
          </Link>
        </div>

        <div className="flex-1 space-y-6">
          <div>
            <p className={`text-xs uppercase ${trackingClass('tracking-[0.32em]')} text-royal-gold`}>
              {t('product.singleOrigin') ?? 'Single-origin harvest'}
            </p>
            <h1 className="mt-2 font-heading text-4xl text-royal-heading dark:text-royal-white">
              {product.name[locale]}
            </h1>
            <p className={`mt-4 text-sm font-medium uppercase ${taglineTrackingClass} text-royal-gold`}>
              {product.tagline[locale]}
            </p>
            <p className="mt-6 text-base leading-relaxed text-royal-muted dark:text-royal-white/70">
              {product.uses[locale][0]}
            </p>
          </div>

          <div className="space-y-4 rounded-[2rem] border border-white/60 bg-white/85 p-6 shadow-royal dark:border-white/10 dark:bg-white/5">
            <h2 className="font-heading text-xl text-royal-heading dark:text-royal-white">
              {t('product.tastingNotes') ?? 'Ritual & benefits'}
            </h2>
            <ul className="space-y-3 text-sm text-royal-muted dark:text-royal-white/70">
              {product.uses[locale].map((use, index) => (
                <li key={`${product.slug}-note-${index}`} className="flex gap-3">
                  <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-royal-gold" aria-hidden="true" />
                  <span>{use}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4 rounded-[2rem] border border-white/60 bg-white/85 p-6 shadow-royal dark:border-white/10 dark:bg-white/5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className={`text-sm uppercase ${trackingClass('tracking-[0.32em]')} text-royal-gold`}>
                {t('product.priceLabel') ?? 'Member price'}
              </p>
              <p className="text-2xl font-semibold text-royal-heading dark:text-royal-white">
                {formatCurrency(product.price, locale)}
              </p>
            </div>
            <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="btn-royal flex-1 justify-center"
                onClick={() => addToCart(product.slug, 1)}
              >
                {t('product.addToCart') ?? 'Add to cart'}
              </button>
              <Link
                to="/cart"
                className="flex flex-1 items-center justify-center gap-2 rounded-full border border-royal-gold/30 bg-transparent px-4 py-3 text-sm font-semibold text-royal-heading transition hover:border-royal-gold hover:text-royal-gold dark:border-white/20 dark:text-royal-white"
              >
                {t('product.goToCart') ?? 'Go to cart'}
                <i className="bi bi-arrow-right" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
