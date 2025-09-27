import { useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext.jsx';

export function useTrackingClass() {
  const { locale } = useLanguage();

  return useCallback(
    (defaultClass = '') => (locale === 'hi' ? 'tracking-normal' : defaultClass),
    [locale]
  );
}
