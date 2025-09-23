import { useEffect, useState } from 'react';

export function useScrollPosition(threshold = 100) {
  const [isPastThreshold, setIsPastThreshold] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsPastThreshold(window.scrollY > threshold);
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isPastThreshold;
}
