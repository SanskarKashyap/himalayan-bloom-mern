import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext.jsx';
import { useScrollPosition } from '../../../hooks/useScrollPosition.js';
import { useBodyClass } from '../../../hooks/useBodyClass.js';
import { useScrollSpy } from '../../../hooks/useScrollSpy.js';

const NAV_ITEMS = [
  { id: 'hero', labelKey: 'nav.home' },
  { id: 'about', labelKey: 'nav.about' },
  { id: 'why-us', labelKey: 'nav.whyUs' },
  { id: 'collection', labelKey: 'nav.collection' },
  { id: 'testimonials', labelKey: 'nav.testimonials' },
  { id: 'preorder', labelKey: 'nav.preorder' },
  { id: 'gallery', labelKey: 'nav.gallery' },
  { id: 'contact', labelKey: 'nav.contact' },
];

export default function Header() {
  const { locale, toggleLocale, t } = useLanguage();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const isScrolled = useScrollPosition(100);

  useBodyClass('mobile-nav-active', isMobileOpen);
  useBodyClass('scrolled', isScrolled);

  const sectionIds = useMemo(() => NAV_ITEMS.map((item) => item.id), []);

  const handleActiveChange = useCallback((sectionId) => {
    setActiveSection(sectionId);
  }, []);

  useScrollSpy(sectionIds, { onActiveChange: handleActiveChange });

  useEffect(() => {
    if (isMobileOpen) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [isMobileOpen]);

  function handleToggleMobileNav() {
    setIsMobileOpen((current) => !current);
  }

  function handleCloseMobileNav() {
    setIsMobileOpen(false);
  }

  return (
    <header id="header" className={`header d-flex align-items-center sticky-top${isScrolled ? ' header-scrolled' : ''}`}>
      <div className="container position-relative d-flex align-items-center justify-content-between">
        <a href="#hero" className="logo d-flex align-items-center me-auto" onClick={handleCloseMobileNav}>
          <h1 className="sitename">Himalayan Blossom</h1>
          <span>.</span>
        </a>

        <nav id="navmenu" className="navmenu d-none d-xl-block" aria-label={t('nav.label')}>
          <ul className="d-flex align-items-center mb-0">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={activeSection === item.id ? 'active' : undefined}
                  onClick={handleCloseMobileNav}
                >
                  {t(item.labelKey)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-buttons d-none d-xl-flex align-items-center">
          <button type="button" id="lang-toggle" className="btn-lang-toggle ms-3" onClick={toggleLocale}>
            <span>{locale === 'en' ? 'हिं' : 'EN'}</span>
          </button>
          <button type="button" id="theme-toggle" className="btn-theme-toggle ms-3" aria-label="Toggle theme">
            <i className="bi bi-sun" />
          </button>
          <a className="btn-getstarted ms-3" href="#preorder">
            {t('nav.preorder')}
          </a>
        </div>

        <button
          className="mobile-nav-toggle d-xl-none"
          type="button"
          aria-label={t('nav.toggleMobile')}
          onClick={handleToggleMobileNav}
        >
          <i className={`bi ${isMobileOpen ? 'bi-x' : 'bi-list'}`} />
        </button>

        <div className={`mobile-nav${isMobileOpen ? ' active' : ''}`}>
          <div className="mobile-nav-wrapper">
            <ul className="mobile-nav-menu">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={activeSection === item.id ? 'active' : undefined}
                    onClick={handleCloseMobileNav}
                  >
                    {t(item.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mobile-nav-buttons">
              <button type="button" id="mobile-lang-toggle" className="btn-lang-toggle" onClick={toggleLocale}>
                <span>{locale === 'en' ? 'हिं' : 'EN'}</span>
              </button>
              <button type="button" id="mobile-theme-toggle" className="btn-theme-toggle" aria-label="Toggle theme">
                <i className="bi bi-sun" />
              </button>
              <a className="btn-getstarted" href="#preorder" onClick={handleCloseMobileNav}>
                {t('nav.preorderCta')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
