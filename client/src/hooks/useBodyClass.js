import { useEffect } from 'react';

export function useBodyClass(className, active = true) {
  useEffect(() => {
    if (!className) return;

    const classList = className.split(' ').filter(Boolean);

    if (active) {
      classList.forEach((cn) => document.body.classList.add(cn));
    }

    return () => {
      classList.forEach((cn) => document.body.classList.remove(cn));
    };
  }, [className, active]);
}
