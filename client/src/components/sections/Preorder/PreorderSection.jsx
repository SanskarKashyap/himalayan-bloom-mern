import { useState } from 'react';
import reservationImage from '../../../static-bootstrap/assets/img/reservation.jpg';
import { apiService } from '../../../services/ApiService.js';
import { useLanguage } from '../../../contexts/LanguageContext.jsx';
import { PRODUCTS } from '../../../data/products.js';

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
    <section id="preorder" className="book-a-table section">
      <div className="container section-title" data-aos="fade-up">
        <h2>{t('preorder.title')}</h2>
        <p>
          <span>{t('preorder.subtitlePrefix')}</span>
          <span className="description-title">{t('preorder.subtitle')}</span>
        </p>
      </div>

      <div className="container">
        <div className="text-center mb-4" data-aos="fade-up" data-aos-delay="50">
          <h4>{t('preorder.calloutHeading')}</h4>
          <p>{t('preorder.calloutCopy')}</p>
        </div>

        <div className="row g-0" data-aos="fade-up" data-aos-delay="100">
          <div className="col-lg-4 reservation-img" style={{ backgroundImage: `url(${reservationImage})` }} aria-hidden="true" />

          <div className="col-lg-8 d-flex align-items-center reservation-form-bg" data-aos="fade-up" data-aos-delay="200">
            <form className="php-email-form" onSubmit={handleSubmit}>
              <div className="row gy-4">
                <div className="col-lg-6 col-md-6">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder={t('preorder.fields.name.placeholder')}
                    value={formState.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-lg-6 col-md-6">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder={t('preorder.fields.email.placeholder')}
                    value={formState.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-lg-6 col-md-6">
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    placeholder={t('preorder.fields.phone.placeholder')}
                    value={formState.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-lg-6 col-md-6">
                  <select
                    className="form-control"
                    name="product"
                    value={formState.product}
                    onChange={handleChange}
                    required
                  >
                    <option value="">{t('preorder.fields.product.placeholder')}</option>
                    {productOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-lg-6 col-md-6">
                  <input
                    type="number"
                    name="quantity"
                    className="form-control"
                    min="1"
                    max="6"
                    placeholder={t('preorder.fields.quantity.placeholder')}
                    value={formState.quantity}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-lg-6 col-md-6">
                  <input
                    type="text"
                    name="city"
                    className="form-control"
                    placeholder={t('preorder.fields.city.placeholder')}
                    value={formState.city}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group mt-3">
                <textarea
                  className="form-control"
                  name="message"
                  rows="4"
                  placeholder={t('preorder.fields.message.placeholder')}
                  value={formState.message}
                  onChange={handleChange}
                />
              </div>

              <div className="text-center mt-3">
                {status === 'loading' && <div className="loading">{t('preorder.status.loading')}</div>}
                {status === 'error' && <div className="error-message">{error || t('preorder.status.error')}</div>}
                {status === 'success' && <div className="sent-message">{t('preorder.status.success')}</div>}
                <button type="submit" disabled={status === 'loading'}>
                  {t('preorder.cta')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
