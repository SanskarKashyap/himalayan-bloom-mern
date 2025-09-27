import { useState } from 'react';
import reservationImage from '../../../static-bootstrap/assets/img/reservation.jpg';
import SectionHeader from '../../shared/SectionHeader.jsx';
import { apiService } from '../../../services/ApiService.js';
import { useLanguage } from '../../../contexts/LanguageContext.jsx';
import { PRODUCTS } from '../../../data/products.js';
import { SelectInput, TextArea, TextInput } from '../../shared/FormControls.jsx';
import { useTrackingClass } from '../../../hooks/useTrackingClass.js';

const INITIAL_FORM = {
  name: '',
  email: '',
  phone: '',
  product: '',
  quantity: 1,
  city: '',
  message: '',
};

export default function PreorderSection() {
  const { t, locale } = useLanguage();
  const trackingClass = useTrackingClass();
  const [formState, setFormState] = useState(INITIAL_FORM);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const productOptions = PRODUCTS.map((product) => ({
    value: product.slug,
    label: product.name[locale],
  }));

  function handleChange(event) {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('loading');
    setError('');

    try {
      await apiService.createPreorder({
        ...formState,
        quantity: Number(formState.quantity),
      });
      setStatus('success');
      setFormState(INITIAL_FORM);
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  }

  return (
    <section id="preorder" className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionHeader
          eyebrow={t('preorder.subtitlePrefix')}
          title={t('preorder.title')}
          subheading={t('preorder.subtitle')}
          description={t('preorder.calloutCopy')}
          alignment="left"
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/50 bg-white/40 shadow-royal dark:border-white/10 dark:bg-white/5">
            <img src={reservationImage} alt="Preorder" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-royal-night via-royal-night/20 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 rounded-[1.8rem] border border-white/40 bg-white/15 p-6 backdrop-blur-lg text-white">
              <p className={`text-xs uppercase ${trackingClass('tracking-[0.32em]')} text-white/80`}>
                {t('preorder.calloutHeading')}
              </p>
              <p className="mt-2 text-lg font-heading">
                {t('preorder.calloutHighlight') ?? 'Delivering first press honey from 3,400m orchards'}
              </p>
            </div>
          </div>

          <div className="card-royal rounded-[2.5rem] p-8 sm:p-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <TextInput
                  name="name"
                  type="text"
                  placeholder={t('preorder.fields.name.placeholder')}
                  value={formState.name}
                  onChange={handleChange}
                  required
                />
                <TextInput
                  name="email"
                  type="email"
                  placeholder={t('preorder.fields.email.placeholder')}
                  value={formState.email}
                  onChange={handleChange}
                  required
                />
                <TextInput
                  name="phone"
                  type="tel"
                  placeholder={t('preorder.fields.phone.placeholder')}
                  value={formState.phone}
                  onChange={handleChange}
                />
                <SelectInput
                  name="product"
                  value={formState.product}
                  onChange={handleChange}
                  options={productOptions}
                  placeholder={t('preorder.fields.product.placeholder')}
                  required
                />
                <TextInput
                  name="quantity"
                  type="number"
                  min={1}
                  max={6}
                  placeholder={t('preorder.fields.quantity.placeholder')}
                  value={formState.quantity}
                  onChange={handleChange}
                  required
                />
                <TextInput
                  name="city"
                  type="text"
                  placeholder={t('preorder.fields.city.placeholder')}
                  value={formState.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <TextArea
                name="message"
                rows={4}
                placeholder={t('preorder.fields.message.placeholder')}
                value={formState.message}
                onChange={handleChange}
              />

              <div className="space-y-3 text-sm">
                {status === 'loading' && (
                  <p className="inline-flex items-center gap-2 text-royal-gold">
                    <i className="bi bi-arrow-repeat animate-spin" /> {t('preorder.status.loading')}
                  </p>
                )}
                {status === 'error' && (
                  <p className="rounded-2xl border border-red-200/60 bg-red-50/80 px-4 py-3 text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-200">
                    {error || t('preorder.status.error')}
                  </p>
                )}
                {status === 'success' && (
                  <p className="rounded-2xl border border-emerald-200/60 bg-emerald-50/80 px-4 py-3 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-200">
                    {t('preorder.status.success')}
                  </p>
                )}
              </div>

              <button type="submit" className="btn-royal w-full justify-center" disabled={status === 'loading'}>
                {t('preorder.cta')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
