import { useEffect, useState } from 'react';
import { scrollToTop } from '../../../hooks/useScrollToTop.js';

export default function ScrollTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY > 120);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('load', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('load', handleScroll);
    };
  }, []);

  return (
    <button
      type="button"
      id="scroll-top"
      className={`fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-royal-gold text-royal-night shadow-royal transition-all duration-500 ease-soft-spring hover:-translate-y-1 hover:shadow-royal-soft focus:outline-none focus:ring-2 focus:ring-royal-gold/50 dark:bg-royal-gold dark:text-royal-night ${
        isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
      aria-label="Scroll to top"
      onClick={scrollToTop}
    >
      <i className="bi bi-arrow-up-short text-2xl" />
    </button>
  );
}
