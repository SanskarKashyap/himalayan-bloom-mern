import { useLanguage } from '../../../contexts/LanguageContext.jsx';

const SOCIAL_LINKS = [
  { id: 'twitter', icon: 'bi-twitter-x', href: '#' },
  { id: 'facebook', icon: 'bi-facebook', href: '#' },
  { id: 'instagram', icon: 'bi-instagram', href: '#' },
  { id: 'linkedin', icon: 'bi-linkedin', href: '#' },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="footer" className="mt-24 border-t border-white/40 bg-royal-night-soft/90 backdrop-blur dark:border-white/10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16 sm:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <FooterInfo
            icon="bi-geo-alt"
            title={t('footer.address.title')}
            lines={[t('footer.address.line1'), t('footer.address.line2')]}
          />
          <FooterInfo
            icon="bi-telephone"
            title={t('footer.contact.title')}
            lines={[`${t('footer.contact.phoneLabel')} ${t('footer.contact.phoneValue')}`, `${t('footer.contact.emailLabel')} ${t('footer.contact.emailValue')}`]}
          />
          <FooterInfo
            icon="bi-clock"
            title={t('footer.hours.title')}
            lines={[`${t('footer.hours.weekdaysLabel')} ${t('footer.hours.weekdaysValue')}`, `${t('footer.hours.weekendLabel')} ${t('footer.hours.weekendValue')}`]}
          />
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-royal">
            <h4 className="font-heading text-lg text-white">{t('footer.followTitle')}</h4>
            <p className="mt-3 text-sm text-white/70">{t('footer.followDescription') ?? 'Join our hive for seasonal drops and apiary immersions.'}</p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition hover:-translate-y-1 hover:border-royal-gold hover:bg-royal-gold hover:text-royal-night"
                  aria-label={link.id}
                >
                  <i className={`bi ${link.icon}`} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-10 text-center text-white/70 sm:flex-row sm:text-left">
          <p className="text-sm">
            © <span>{t('footer.copyrightLabel')}</span>
            <strong className="px-1 font-heading text-white">Himalayan Blossom</strong>
            <span>{t('footer.rights')}</span>
          </p>
          <p className="text-xs uppercase tracking-[0.32em] text-white/50">
            {t('footer.tagline') ?? 'Wild | Ethical | Regal'}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterInfo({ icon, title, lines }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-royal">
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-royal-gold/20 text-royal-gold">
          <i className={`bi ${icon} text-xl`} />
        </span>
        <div>
          <h4 className="font-heading text-lg text-white">{title}</h4>
          <div className="mt-3 space-y-1 text-sm text-white/70">
            {lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
