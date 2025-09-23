import { useEffect, useState } from 'react';
import SectionHeader from '../../shared/SectionHeader.jsx';
import { TextArea, TextInput } from '../../shared/FormControls.jsx';
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
      { threshold: 0.25 }
    );

    const mapContainer = document.querySelector('#contact-map');
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
    <section id="contact" className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionHeader
          eyebrow={t('contact.subtitlePrefix')}
          title={t('contact.title')}
          subheading={t('contact.subtitle')}
          description={t('contact.description')}
        />
      </div>

      <div id="contact-map" className="mx-auto mt-12 max-w-6xl px-6 sm:px-10" data-aos="fade-up" data-aos-delay="80">
        <div className="overflow-hidden rounded-[2.5rem] border border-white/50 bg-white/70 shadow-royal dark:border-white/10 dark:bg-white/5">
          {mapLoaded ? (
            <iframe
              title="Himalayan Blossom map"
              style={{ border: 0, width: '100%', height: '420px' }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54233.72811212928!2d77.0791504484924!3d31.96784878199915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390486ce5d929e29%3A0x752531643a408e99!2sKullu%2C%20Himachal%20Pradesh%2C%20India!5e0!3m2!1sen!2sus!4v1726302532544!5m2!1sen!2sus"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="flex h-[420px] items-center justify-center bg-royal-night/5 dark:bg-royal-night/50">
              <span className="text-sm uppercase tracking-[0.32em] text-royal-muted dark:text-royal-white/50">
                {t('contact.mapPlaceholder') ?? 'Loading valley coordinates'}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl px-6 sm:px-10" data-aos="fade-up" data-aos-delay="120">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6">
            <InfoCard
              icon="bi-geo-alt"
              title={t('contact.address.title')}
              lines={[t('contact.address.line1'), t('contact.address.line2')]}
            />
            <InfoCard
              icon="bi-telephone"
              title={t('contact.phone.title')}
              lines={[`${t('contact.phone.label')} ${t('contact.phone.value')}`, `${t('contact.email.label')} ${t('contact.email.value')}`]}
            />
            <InfoCard
              icon="bi-clock"
              title={t('contact.hours.title')}
              lines={[
                `${t('contact.hours.weekdays.label')} ${t('contact.hours.weekdays.value')}`,
                `${t('contact.hours.weekend.label')} ${t('contact.hours.weekend.value')}`,
              ]}
            />
          </div>

          <div className="card-royal rounded-[2.5rem] p-8 sm:p-10">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <TextInput
                  name="name"
                  placeholder={t('contact.form.name')}
                  value={formState.name}
                  onChange={handleChange}
                  required
                />
                <TextInput
                  name="email"
                  type="email"
                  placeholder={t('contact.form.email')}
                  value={formState.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <TextInput
                name="subject"
                placeholder={t('contact.form.subject')}
                value={formState.subject}
                onChange={handleChange}
                required
              />
              <TextArea
                name="message"
                rows={5}
                placeholder={t('contact.form.message')}
                value={formState.message}
                onChange={handleChange}
                required
              />

              <div className="space-y-3 text-sm">
                {status === 'loading' && (
                  <p className="inline-flex items-center gap-2 text-royal-gold">
                    <i className="bi bi-arrow-repeat animate-spin" /> {t('contact.status.loading')}
                  </p>
                )}
                {status === 'error' && (
                  <p className="rounded-2xl border border-red-200/60 bg-red-50/80 px-4 py-3 text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-200">
                    {error || t('contact.status.error')}
                  </p>
                )}
                {status === 'success' && (
                  <p className="rounded-2xl border border-emerald-200/60 bg-emerald-50/80 px-4 py-3 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-200">
                    {t('contact.status.success')}
                  </p>
                )}
              </div>

              <button type="submit" className="btn-royal w-full justify-center" disabled={status === 'loading'}>
                {t('contact.cta')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ icon, title, lines }) {
  return (
    <div className="card-royal flex items-start gap-4 rounded-[2rem] p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-royal-gold/20 text-royal-gold">
        <i className={`bi ${icon} text-xl`} />
      </div>
      <div>
        <h3 className="font-heading text-lg text-royal-heading dark:text-royal-white">{title}</h3>
        <div className="mt-2 space-y-1 text-sm leading-relaxed text-royal-muted dark:text-royal-white/70">
          {lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
