import { useLanguage } from '../../../contexts/LanguageContext.jsx';
import { useTrackingClass } from '../../../hooks/useTrackingClass.js';

const SOCIAL_LINKS = [
  { id: 'instagram', icon: 'bi-instagram', href: '#' },
  { id: 'facebook', icon: 'bi-facebook', href: '#' },
  { id: 'linkedin', icon: 'bi-linkedin', href: '#' },
];

export default function Footer() {
  const { t } = useLanguage();
  const trackingClass = useTrackingClass();

  return (
    <footer id="footer" className="mt-24 border-t border-white/10 bg-royal-night-soft/95 text-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10">
        <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm space-y-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase text-white/60">
                <span className="h-2 w-2 rounded-full bg-royal-gold" aria-hidden="true" />
                {t('footer.badge') ?? 'Himalayan Blossom'}
              </span>
              <p className="font-heading text-2xl">Himalayan Blossom</p>
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              {t('footer.followDescription') ??
                'Pure honey gathered from 3,400m orchards. Slow-crafted, lab verified, and delivered with care.'}
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:border-royal-gold hover:text-royal-gold"
                  aria-label={link.id}
                >
                  <i className={`bi ${link.icon}`} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid w-full gap-10 sm:grid-cols-2 lg:max-w-2xl">
            <FooterColumn
              title={t('footer.address.title')}
              items={[t('footer.address.line1'), t('footer.address.line2')]}
            />
            <FooterColumn
              title={t('footer.contact.title')}
              items={[
                `${t('footer.contact.phoneLabel')} ${t('footer.contact.phoneValue')}`,
                `${t('footer.contact.emailLabel')} ${t('footer.contact.emailValue')}`,
              ]}
            />
            <FooterColumn
              title={t('footer.hours.title')}
              items={[
                `${t('footer.hours.weekdaysLabel')} ${t('footer.hours.weekdaysValue')}`,
                `${t('footer.hours.weekendLabel')} ${t('footer.hours.weekendValue')}`,
              ]}
            />
            <FooterColumn
              title={t('footer.linksTitle') ?? 'Quick links'}
              items={[t('nav.home'), t('nav.collection'), t('nav.contact'), t('nav.cart')]}
            />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {t('footer.copyrightLabel')}{' '}
            <span className="font-heading text-white">Himalayan Blossom</span>. {t('footer.rights')}
          </p>
          <p className={`text-xs uppercase ${trackingClass('tracking-[0.32em]')} text-white/50`}>
            {t('footer.tagline') ?? 'Wild | Ethical | Regal'}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold uppercase text-white/70">{title}</p>
      <ul className="space-y-2 text-sm text-white/60">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
