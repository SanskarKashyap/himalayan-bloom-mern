import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext.jsx';
import { useScrollPosition } from '../../../hooks/useScrollPosition.js';
import { useScrollSpy } from '../../../hooks/useScrollSpy.js';
import { useTheme } from '../../../contexts/ThemeContext.jsx';

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
  const { isDark, toggleTheme } = useTheme();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const isScrolled = useScrollPosition(80);

  const sectionIds = useMemo(() => NAV_ITEMS.map((item) => item.id), []);

  const handleActiveChange = useCallback((sectionId) => {
    setActiveSection(sectionId);
  }, []);

  useScrollSpy(sectionIds, { onActiveChange: handleActiveChange });

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    document.documentElement.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [isMobileOpen]);

  const navLinkClass = (itemId) =>
    `relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ease-soft-spring ${
      activeSection === itemId
        ? 'text-royal-gold shadow-[0_12px_30px_rgba(212,175,55,0.22)] backdrop-blur bg-white/10 dark:bg-white/5'
        : 'text-royal-ink/80 hover:text-royal-gold dark:text-royal-white/70 dark:hover:text-royal-gold'
    }`;

  function handleToggleMobileNav() {
    setIsMobileOpen((current) => !current);
  }

  function handleCloseMobileNav() {
    setIsMobileOpen(false);
  }

  return (
    <header
      id="header"
      className={`sticky top-0 z-50 transition-colors duration-500 ${
        isScrolled
          ? 'bg-royal-cream/90 shadow-[0_8px_30px_rgba(15,10,31,0.08)] backdrop-blur dark:bg-royal-night/85'
          : 'bg-transparent backdrop-blur-none'
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4 sm:px-8 lg:px-10">
        <a
          href="#hero"
          className="flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 shadow-sm shadow-black/5 backdrop-blur transition hover:bg-white dark:bg-white/10 dark:hover:bg-white/20"
          onClick={handleCloseMobileNav}
        >
          <div className="flex items-center gap-2">
            <span className="font-heading text-lg font-semibold uppercase tracking-[0.3em] text-royal-heading dark:text-royal-white">
              Himalayan
            </span>
            <span className="font-heading text-lg font-semibold text-royal-gold">Blossom</span>
          </div>
          <span className="mt-1 h-2 w-2 rounded-full bg-royal-gold" aria-hidden="true" />
        </a>

        <nav
          id="navmenu"
          className="hidden items-center gap-2 rounded-full border border-white/40 bg-white/60 px-3 py-2 shadow-sm shadow-black/5 backdrop-blur lg:flex dark:border-white/10 dark:bg-white/10"
          aria-label={t('nav.label')}
        >
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className={navLinkClass(item.id)} onClick={handleCloseMobileNav}>
                  {t(item.labelKey)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <button
            type="button"
            id="lang-toggle"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/70 text-xs font-semibold uppercase tracking-[0.24em] text-royal-heading transition hover:-translate-y-0.5 hover:border-royal-gold hover:text-royal-gold dark:border-white/10 dark:bg-white/10 dark:text-royal-white"
            aria-label={t('nav.switchLanguage')}
            onClick={toggleLocale}
          >
            {locale === 'en' ? 'हिं' : 'EN'}
          </button>
          <button
            type="button"
            id="theme-toggle"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/70 text-xl text-royal-heading transition hover:-translate-y-0.5 hover:border-royal-gold hover:text-royal-gold dark:border-white/10 dark:bg-white/10 dark:text-royal-white"
            aria-label={t('nav.toggleTheme') ?? 'Toggle theme'}
            onClick={toggleTheme}
          >
            <i className={`bi ${isDark ? 'bi-sun-fill' : 'bi-moon-stars-fill'}`} />
          </button>
          <a className="btn-royal" href="#preorder">
            {t('nav.preorder')}
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            id="theme-toggle-mobile"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/70 text-xl text-royal-heading transition hover:-translate-y-0.5 hover:border-royal-gold hover:text-royal-gold dark:border-white/10 dark:bg-white/10 dark:text-royal-white"
            aria-label={t('nav.toggleTheme') ?? 'Toggle theme'}
            onClick={toggleTheme}
          >
            <i className={`bi ${isDark ? 'bi-sun-fill' : 'bi-moon-stars-fill'}`} />
          </button>
          <button
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/70 text-xl text-royal-heading transition hover:-translate-y-0.5 hover:border-royal-gold hover:text-royal-gold dark:border-white/10 dark:bg-white/10 dark:text-royal-white"
            type="button"
            aria-label={t('nav.toggleMobile')}
            onClick={handleToggleMobileNav}
          >
            <i className={`bi ${isMobileOpen ? 'bi-x-lg' : 'bi-list'}`} />
          </button>
        </div>
      </div>

      {isMobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden" aria-hidden="true" onClick={handleCloseMobileNav} />
      )}

      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-xs translate-x-full bg-royal-cream/98 px-6 py-8 shadow-royal transition-transform duration-500 ease-soft-spring dark:bg-royal-night/95 lg:hidden pointer-events-none ${
          isMobileOpen ? '!translate-x-0 pointer-events-auto' : ''
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="font-heading text-lg font-semibold text-royal-heading dark:text-royal-white">
            {t('nav.label')}
          </span>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-xl text-royal-heading transition hover:border-royal-gold hover:text-royal-gold dark:border-white/10 dark:text-royal-white"
            type="button"
            aria-label={t('nav.toggleMobile')}
            onClick={handleToggleMobileNav}
          >
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <ul className="mt-6 space-y-3">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block rounded-2xl px-4 py-3 text-base font-medium transition ease-soft-spring ${
                  activeSection === item.id
                    ? 'bg-white/60 text-royal-heading shadow-royal dark:bg-white/10 dark:text-royal-white'
                    : 'text-royal-ink/80 hover:bg-white/70 hover:text-royal-heading dark:text-royal-white/70 dark:hover:bg-white/10'
                }`}
                onClick={handleCloseMobileNav}
              >
                {t(item.labelKey)}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex items-center justify-between gap-3">
          <button
            type="button"
            id="mobile-lang-toggle"
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/40 bg-white/80 text-sm font-semibold uppercase tracking-[0.24em] text-royal-heading transition hover:border-royal-gold hover:text-royal-gold dark:border-white/10 dark:bg-white/10 dark:text-royal-white"
            aria-label={t('nav.switchLanguage')}
            onClick={toggleLocale}
          >
            {locale === 'en' ? 'हिं' : 'EN'}
          </button>
          <a
            className="btn-royal flex-1 justify-center"
            href="#preorder"
            onClick={handleCloseMobileNav}
          >
            {t('nav.preorderCta')}
          </a>
        </div>
      </div>
    </header>
  );
}
