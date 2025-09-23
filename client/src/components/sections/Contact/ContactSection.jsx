import { useEffect, useState } from 'react';
import { apiService } from '../../../services/ApiService.js';
import { useLanguage } from '../../../contexts/LanguageContext.jsx';

const INITIAL_FORM = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export default function ContactSection() {
  const { t } = useLanguage();
  const [formState, setFormState] = useState(INITIAL_FORM);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setMapLoaded(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
      observer.observe(mapContainer);
    }

    return () => {
      if (mapContainer) {
        observer.unobserve(mapContainer);
      }
    };
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('loading');
    setError('');

    try {
      await apiService.sendContact(formState);
      setStatus('success');
      setFormState(INITIAL_FORM);
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="contact section">
      <div className="container section-title" data-aos="fade-up">
        <h2>{t('contact.title')}</h2>
        <p>
          <span>{t('contact.subtitlePrefix')}</span>
          <span className="description-title">{t('contact.subtitle')}</span>
        </p>
      </div>

      <div className="map-container" data-aos="fade-up" data-aos-delay="50">
        {mapLoaded && (
          <iframe
            title="Himalayan Blossom map"
            style={{ border: 0, width: '100%', height: '400px' }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54233.72811212928!2d77.0791504484924!3d31.96784878199915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390486ce5d929e29%3A0x752531643a408e99!2sKullu%2C%20Himachal%20Pradesh%2C%20India!5e0!3m2!1sen!2sus!4v1726302532544!5m2!1sen!2sus"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        )}
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4">
          <div className="col-lg-4">
            <div className="info i-box">
              <i className="bi bi-geo-alt" />
              <h3>{t('contact.address.title')}</h3>
              <p>{t('contact.address.line1')}</p>
              <p>{t('contact.address.line2')}</p>
            </div>
            <div className="info i-box mt-4">
              <i className="bi bi-telephone" />
              <h3>{t('contact.phone.title')}</h3>
              <p>
                <strong>{t('contact.phone.label')} </strong>
                <span>{t('contact.phone.value')}</span>
              </p>
              <p>
                <strong>{t('contact.email.label')} </strong>
                <span>{t('contact.email.value')}</span>
              </p>
            </div>
            <div className="info i-box mt-4">
              <i className="bi bi-clock" />
              <h3>{t('contact.hours.title')}</h3>
              <p>
                <strong>{t('contact.hours.weekdays.label')}</strong>
                <span> {t('contact.hours.weekdays.value')}</span>
              </p>
              <p>
                <strong>{t('contact.hours.weekend.label')}</strong>
                <span> {t('contact.hours.weekend.value')}</span>
              </p>
            </div>
          </div>

          <div className="col-lg-8">
            <form className="php-email-form" onSubmit={handleSubmit}>
              <div className="row gy-4">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder={t('contact.form.name')}
                    value={formState.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder={t('contact.form.email')}
                    value={formState.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-12">
                  <input
                    type="text"
                    name="subject"
                    className="form-control"
                    placeholder={t('contact.form.subject')}
                    value={formState.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-12">
                  <textarea
                    name="message"
                    className="form-control"
                    rows="6"
                    placeholder={t('contact.form.message')}
                    value={formState.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-12 text-center">
                  {status === 'loading' && <div className="loading">{t('contact.status.loading')}</div>}
                  {status === 'error' && <div className="error-message">{error || t('contact.status.error')}</div>}
                  {status === 'success' && <div className="sent-message">{t('contact.status.success')}</div>}
                  <button type="submit" disabled={status === 'loading'}>
                    {t('contact.cta')}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
