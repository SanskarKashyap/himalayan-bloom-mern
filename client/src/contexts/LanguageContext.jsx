import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import en from '../i18n/en.json';
import hi from '../i18n/hi.json';
import { LanguageService } from '../services/LanguageService.js';

const LanguageContext = createContext(null);

const DEFAULT_RESOURCES = {
  en,
  hi,
};

export function LanguageProvider({
  children,
  initialLocale = 'en',
  resources = DEFAULT_RESOURCES,
}) {
  const [locale, setLocale] = useState(initialLocale);

  const service = useMemo(() => {
    const instance = new LanguageService(resources, initialLocale);
    instance.setLocale(locale);
    return instance;
  }, [resources, locale, initialLocale]);

  const toggleLocale = useCallback(() => {
    setLocale((current) => (current === 'en' ? 'hi' : 'en'));
  }, []);

  const value = useMemo(
    () => ({
      locale,
      setLocale: (next) => {
        service.setLocale(next);
        setLocale(next);
      },
      toggleLocale,
      t: (key, params) => service.t(key, params),
    }),
    [locale, service, toggleLocale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
