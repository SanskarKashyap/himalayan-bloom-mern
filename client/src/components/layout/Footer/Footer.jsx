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
    <footer id="footer" className="footer dark-background">
      <div className="container">
        <div className="row gy-3">
          <div className="col-lg-3 col-md-6 d-flex">
            <i className="bi bi-geo-alt icon" />
            <div className="address">
              <h4>{t('footer.address.title')}</h4>
              <p>{t('footer.address.line1')}</p>
              <p>{t('footer.address.line2')}</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 d-flex">
            <i className="bi bi-telephone icon" />
            <div>
              <h4>{t('footer.contact.title')}</h4>
              <p>
                <strong>{t('footer.contact.phoneLabel')}</strong>
                <span>{t('footer.contact.phoneValue')}</span>
              </p>
              <p>
                <strong>{t('footer.contact.emailLabel')}</strong>
                <span>{t('footer.contact.emailValue')}</span>
              </p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 d-flex">
            <i className="bi bi-clock icon" />
            <div>
              <h4>{t('footer.hours.title')}</h4>
              <p>
                <strong>{t('footer.hours.weekdaysLabel')}</strong>
                <span>{t('footer.hours.weekdaysValue')}</span>
              </p>
              <p>
                <strong>{t('footer.hours.weekendLabel')}</strong>
                <span>{t('footer.hours.weekendValue')}</span>
              </p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <h4>{t('footer.followTitle')}</h4>
            <div className="social-links d-flex">
              {SOCIAL_LINKS.map((link) => (
                <a key={link.id} href={link.href} className={link.id} aria-label={link.id}>
                  <i className={`bi ${link.icon}`} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container copyright text-center mt-4">
        <p>
          © <span>{t('footer.copyrightLabel')}</span>
          <strong className="px-1 sitename">Himalayan Blossom</strong>
          <span>{t('footer.rights')}</span>
        </p>
      </div>
    </footer>
  );
}
