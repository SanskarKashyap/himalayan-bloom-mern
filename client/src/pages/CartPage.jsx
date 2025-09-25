import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext.jsx';
import { useLanguage } from '../contexts/LanguageContext.jsx';

function formatCurrency(value, locale = 'en') {
  const formatter = new Intl.NumberFormat(locale === 'hi' ? 'hi-IN' : 'en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  });
  return formatter.format(value);
}

export default function CartPage() {
  const { cartItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const { locale, t } = useLanguage();

  if (cartItems.length === 0) {
    return (
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center sm:px-10">
          <p className="font-heading text-3xl text-royal-heading dark:text-royal-white">{t('cart.emptyTitle') ?? 'Your cart is empty'}</p>
          <p className="mt-4 text-royal-muted dark:text-royal-white/70">
            {t('cart.emptySubtitle') ?? 'Explore our collection to add your favourite honey varietals.'}
          </p>
          <div className="mt-8 flex justify-center">
            <Link to="/shop" className="btn-royal">
              {t('cart.shopCta') ?? 'Return to Shop'}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 sm:px-10 lg:flex-row">
        <div className="flex-1 space-y-6">
          <header>
            <p className="text-sm uppercase tracking-[0.28em] text-royal-gold">{t('cart.titleEyebrow') ?? 'Your Selection'}</p>
            <h1 className="mt-2 font-heading text-3xl text-royal-heading dark:text-royal-white">
              {t('cart.title') ?? 'Shopping Cart'}
            </h1>
          </header>

          <ul className="space-y-6">
            {cartItems.map((item) => (
              <li
                key={item.slug}
                className="flex flex-col gap-4 rounded-[2rem] border border-white/60 bg-white/85 p-5 shadow-royal backdrop-blur dark:border-white/10 dark:bg-white/5 sm:flex-row sm:items-center sm:p-6"
              >
                <div className="flex items-center gap-4 sm:w-1/3">
                  <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl border border-white/40 bg-white/70 p-4 shadow-sm shadow-black/5 dark:border-white/10 dark:bg-white/10">
                    <img src={item.product.image} alt={item.product.alt[locale]} className="h-full w-full object-contain" />
                  </div>
                  <div>
                    <p className="font-heading text-lg text-royal-heading dark:text-royal-white">
                      {item.product.name[locale]}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.24em] text-royal-gold">
                      {formatCurrency(item.price, locale)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-royal-gold/40 text-lg text-royal-heading transition hover:border-royal-gold hover:text-royal-gold dark:border-white/20 dark:text-royal-white"
                      onClick={() => updateQuantity(item.slug, Math.max(1, item.quantity - 1))}
                      aria-label={t('cart.decreaseItem', { name: item.product.name[locale] }) ?? 'Decrease quantity'}
                    >
                      <i className="bi bi-dash" />
                    </button>
                    <span className="min-w-[2rem] text-center text-sm font-semibold text-royal-heading dark:text-royal-white">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-royal-gold/40 text-lg text-royal-heading transition hover:border-royal-gold hover:text-royal-gold dark:border-white/20 dark:text-royal-white"
                      onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                      aria-label={t('cart.increaseItem', { name: item.product.name[locale] }) ?? 'Increase quantity'}
                    >
                      <i className="bi bi-plus" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:gap-2">
                    <p className="text-sm font-semibold text-royal-heading dark:text-royal-white">
                      {formatCurrency(item.subtotal, locale)}
                    </p>
                    <button
                      type="button"
                      className="text-xs font-semibold uppercase tracking-[0.32em] text-royal-muted transition hover:text-red-500 dark:text-royal-white/60 dark:hover:text-red-300"
                      onClick={() => removeFromCart(item.slug)}
                    >
                      {t('cart.remove') ?? 'Remove'}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link to="/shop" className="rounded-full border border-royal-gold/30 bg-royal-gold/10 px-6 py-3 text-sm font-semibold text-royal-heading transition hover:border-royal-gold hover:bg-royal-gold hover:text-royal-night dark:border-white/20 dark:text-royal-white">
              {t('cart.continue') ?? 'Continue shopping'}
            </Link>
            <button
              type="button"
              className="text-xs font-semibold uppercase tracking-[0.32em] text-red-500 transition hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
              onClick={clearCart}
            >
              {t('cart.clear') ?? 'Clear cart'}
            </button>
          </div>
        </div>

        <aside className="w-full max-w-sm rounded-[2rem] border border-white/60 bg-white/85 p-6 shadow-royal backdrop-blur dark:border-white/10 dark:bg-white/5">
          <p className="text-sm uppercase tracking-[0.28em] text-royal-gold">{t('cart.summaryEyebrow') ?? 'Order summary'}</p>
          <h2 className="mt-2 font-heading text-2xl text-royal-heading dark:text-royal-white">
            {t('cart.summaryTitle') ?? 'Almost yours'}
          </h2>
          <div className="mt-6 space-y-4 text-sm text-royal-muted dark:text-royal-white/70">
            {cartItems.map((item) => (
              <div key={`${item.slug}-summary`} className="flex items-center justify-between">
                <span>
                  {item.product.name[locale]}
                  <span className="px-2 text-xs uppercase tracking-[0.24em] text-royal-gold">× {item.quantity}</span>
                </span>
                <span className="font-semibold text-royal-heading dark:text-royal-white">
                  {formatCurrency(item.subtotal, locale)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-white/40 pt-4 text-base font-semibold text-royal-heading dark:border-white/10 dark:text-royal-white">
            <span>{t('cart.total') ?? 'Total'}</span>
            <span>{formatCurrency(totalPrice, locale)}</span>
          </div>
          <p className="mt-3 text-xs text-royal-muted dark:text-royal-white/60">
            {t('cart.shippingNote') ?? 'Shipping and tasting kit are included with every pre-order.'}
          </p>
          <button
            type="button"
            className="btn-royal mt-6 w-full justify-center"
            onClick={() => window.alert(t('cart.checkoutPlaceholder') ?? 'Checkout flow coming soon!')}
          >
            {t('cart.checkout') ?? 'Proceed to checkout'}
          </button>
        </aside>
      </div>
    </section>
  );
}
