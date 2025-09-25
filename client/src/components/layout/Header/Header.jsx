import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '../../../contexts/LanguageContext.jsx';
import { useScrollPosition } from '../../../hooks/useScrollPosition.js';
import { useTheme } from '../../../contexts/ThemeContext.jsx';
import { useCart } from '../../../contexts/CartContext.jsx';
import { useAuth } from '../../../contexts/AuthContext.jsx';

const NAV_ITEMS = [
  { to: '/', labelKey: 'nav.home', end: true },
  { to: '/shop', labelKey: 'nav.shop' },
  { to: '/about', labelKey: 'nav.about' },
  { to: '/stories', labelKey: 'nav.stories' },
  { to: '/gallery', labelKey: 'nav.gallery' },
  { to: '/contact', labelKey: 'nav.contact' },
];

function getInitials(name) {
  if (!name) return 'HB';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export default function Header() {
  const { locale, toggleLocale, t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const { totalQuantity } = useCart();
  const { user, isAuthenticated, openLogin, logout } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const isScrolled = useScrollPosition(80);
  const location = useLocation();
  const accountMenuRef = useRef(null);
  const accountButtonRef = useRef(null);

  const navItems = useMemo(() => NAV_ITEMS, []);

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    document.documentElement.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [isMobileOpen]);

  useEffect(() => {
    setIsMobileOpen(false);
    setIsAccountMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (!isAccountMenuOpen) return;
      if (accountMenuRef.current?.contains(event.target)) return;
      if (accountButtonRef.current?.contains(event.target)) return;
      setIsAccountMenuOpen(false);
    }

    document.addEventListener('pointerdown', handleClickOutside);
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  }, [isAccountMenuOpen]);

  useEffect(() => {
    if (!isAuthenticated) {
      setIsAccountMenuOpen(false);
    }
  }, [isAuthenticated]);

  const navLinkClass = (isActive) =>
    `relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ease-soft-spring ${
      isActive
        ? 'text-royal-gold shadow-[0_12px_30px_rgba(212,175,55,0.22)] backdrop-blur bg-white/10 dark:bg-white/5'
        : 'text-royal-ink/80 hover:text-royal-gold dark:text-royal-white/70 dark:hover:text-royal-gold'
    }`;

  function handleToggleMobileNav() {
    setIsMobileOpen((current) => !current);
  }

  function toggleAccountMenu() {
    setIsAccountMenuOpen((current) => !current);
  }

  function handleSignInClick() {
    setIsMobileOpen(false);
    openLogin();
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
        <Link
          to="/"
          className="flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 shadow-sm shadow-black/5 backdrop-blur transition hover:bg-white dark:bg-white/10 dark:hover:bg-white/20"
        >
          <div className="flex items-center gap-2">
            <span className="font-heading text-lg font-semibold uppercase tracking-[0.3em] text-royal-heading dark:text-royal-white">
              Himalayan
            </span>
            <span className="font-heading text-lg font-semibold text-royal-gold">Blossom</span>
          </div>
          <span className="mt-1 h-2 w-2 rounded-full bg-royal-gold" aria-hidden="true" />
        </Link>

        <nav
          id="navmenu"
          className="hidden items-center gap-2 rounded-full border border-white/40 bg-white/60 px-3 py-2 shadow-sm shadow-black/5 backdrop-blur lg:flex dark:border-white/10 dark:bg-white/10"
          aria-label={t('nav.label')}
        >
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => navLinkClass(isActive)}
                >
                  {t(item.labelKey)}
                </NavLink>
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
          <Link
            to="/cart"
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/70 text-xl text-royal-heading transition hover:-translate-y-0.5 hover:border-royal-gold hover:text-royal-gold dark:border-white/10 dark:bg-white/10 dark:text-royal-white"
            aria-label={t('nav.cart')}
          >
            <i className="bi bi-bag" />
            {totalQuantity > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-royal-gold px-1 text-[11px] font-semibold text-royal-night">
                {totalQuantity}
              </span>
            )}
          </Link>
          {isAuthenticated ? (
            <div className="relative" ref={accountMenuRef}>
              <button
                type="button"
                ref={accountButtonRef}
                onClick={toggleAccountMenu}
                className="flex items-center gap-3 rounded-full border border-white/40 bg-white/70 px-3 py-2 text-sm font-semibold text-royal-heading transition hover:-translate-y-0.5 hover:border-royal-gold hover:text-royal-gold dark:border-white/10 dark:bg-white/10 dark:text-royal-white"
                aria-haspopup="menu"
                aria-expanded={isAccountMenuOpen}
              >
                {user?.picture ? (
                  <img src={user.picture} alt={user.name} className="h-8 w-8 rounded-full object-cover" />
                ) : (
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-royal-gold/30 text-xs uppercase text-royal-heading">
                    {getInitials(user?.name)}
                  </span>
                )}
                <span className="hidden sm:inline">{t('nav.account')}</span>
                <i className={`bi ${isAccountMenuOpen ? 'bi-chevron-up' : 'bi-chevron-down'} text-xs`} />
              </button>
              {isAccountMenuOpen && (
                <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-white/40 bg-white/95 p-4 shadow-royal dark:border-white/10 dark:bg-royal-night" role="menu">
                  <p className="text-sm font-semibold text-royal-heading dark:text-royal-white">{user?.name}</p>
                  <p className="mt-1 text-xs text-royal-muted dark:text-royal-white/70">{user?.email}</p>
                  <button
                    type="button"
                    className="mt-4 w-full rounded-xl border border-royal-gold/30 bg-royal-gold/10 px-4 py-2 text-sm font-semibold text-royal-heading transition hover:border-royal-gold hover:bg-royal-gold hover:text-royal-night dark:border-white/20 dark:text-royal-white"
                    onClick={logout}
                  >
                    {t('nav.signOut')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button type="button" className="rounded-full border border-white/40 bg-white/60 px-4 py-2 text-sm font-semibold text-royal-heading transition hover:-translate-y-0.5 hover:border-royal-gold hover:text-royal-gold dark:border-white/10 dark:bg-white/10 dark:text-royal-white" onClick={handleSignInClick}>
              {t('nav.signIn')}
            </button>
          )}
          <Link className="btn-royal" to="/shop">
            {t('nav.shopNow')}
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Link
            to="/cart"
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/70 text-xl text-royal-heading transition hover:-translate-y-0.5 hover:border-royal-gold hover:text-royal-gold dark:border-white/10 dark:bg-white/10 dark:text-royal-white"
            aria-label={t('nav.cart')}
            onClick={() => setIsMobileOpen(false)}
          >
            <i className="bi bi-bag" />
            {totalQuantity > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-royal-gold px-1 text-[11px] font-semibold text-royal-night">
                {totalQuantity}
              </span>
            )}
          </Link>
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
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden" aria-hidden="true" onClick={handleToggleMobileNav} />
      )}

      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-xs translate-x-full bg-royal-cream/98 px-6 py-8 shadow-royal transition-transform duration-500 ease-soft-spring dark:bg-royal-night/95 lg:hidden pointer-events-none ${
          isMobileOpen ? '!translate-x-0 pointer-events-auto' : ''
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="font-heading text-lg text-royal-heading dark:text-royal-white">
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
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `block rounded-2xl px-4 py-3 text-base font-medium transition ease-soft-spring ${
                    isActive
                      ? 'bg-white/60 text-royal-heading shadow-royal dark:bg-white/10 dark:text-royal-white'
                      : 'text-royal-ink/80 hover:bg-white/70 hover:text-royal-heading dark:text-royal-white/70 dark:hover:bg-white/10'
                  }`
                }
                onClick={() => setIsMobileOpen(false)}
              >
                {t(item.labelKey)}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="mt-8 space-y-4">
          {isAuthenticated ? (
            <div className="rounded-2xl border border-white/40 bg-white/20 p-4 text-sm dark:border-white/10 dark:bg-white/5">
              <p className="font-semibold text-royal-heading dark:text-royal-white">{user?.name}</p>
              <p className="mt-1 text-xs text-royal-muted dark:text-royal-white/70">{user?.email}</p>
              <button
                type="button"
                className="mt-4 w-full rounded-xl border border-royal-gold/30 bg-royal-gold/10 px-4 py-2 text-sm font-semibold text-royal-heading transition hover:border-royal-gold hover:bg-royal-gold hover:text-royal-night dark:border-white/20 dark:text-royal-white"
                onClick={() => {
                  logout();
                  setIsMobileOpen(false);
                }}
              >
                {t('nav.signOut')}
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="w-full rounded-xl border border-royal-gold/30 bg-royal-gold/10 px-4 py-3 text-sm font-semibold text-royal-heading transition hover:border-royal-gold hover:bg-royal-gold hover:text-royal-night dark:border-white/20 dark:text-royal-white"
              onClick={handleSignInClick}
            >
              {t('nav.signIn')}
            </button>
          )}

          <Link
            className="btn-royal flex w-full justify-center"
            to="/shop"
            onClick={() => setIsMobileOpen(false)}
          >
            {t('nav.shopNow')}
          </Link>
        </div>
      </div>
    </header>
  );
}
