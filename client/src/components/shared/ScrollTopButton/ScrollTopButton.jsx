import { useEffect, useState } from 'react';
import { scrollToTop } from '../../../hooks/useScrollToTop.js';

export default function ScrollTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY > 100);
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
      className={`scroll-top d-flex align-items-center justify-content-center${isVisible ? ' active' : ''}`}
      aria-label="Scroll to top"
      onClick={scrollToTop}
    >
      <i className="bi bi-arrow-up-short" />
    </button>
  );
}
