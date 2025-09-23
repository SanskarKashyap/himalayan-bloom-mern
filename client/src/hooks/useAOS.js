import { useEffect } from 'react';
import aosScriptUrl from '../static-bootstrap/assets/vendor/aos/aos.js?url';

let aosLoader;

function loadAOS() {
  if (typeof window === 'undefined') {
    return Promise.resolve(null);
  }

  if (window.AOS) {
    return Promise.resolve(window.AOS);
  }

  if (!aosLoader) {
    aosLoader = new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-vendor="aos"]');
      if (existing) {
        existing.addEventListener('load', () => resolve(window.AOS));
        existing.addEventListener('error', reject);
        return;
      }

      const script = document.createElement('script');
      script.src = aosScriptUrl;
      script.async = true;
      script.dataset.vendor = 'aos';
      script.onload = () => resolve(window.AOS);
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }

  return aosLoader;
}

export function useAOS(options = {}) {
  useEffect(() => {
    let mounted = true;

    loadAOS()
      .then((AOS) => {
        if (!AOS || !mounted) return;
        AOS.init({
          duration: 600,
          easing: 'ease-in-out',
          once: true,
          mirror: false,
          ...options,
        });
      })
      .catch((error) => {
        console.error('Failed to load AOS:', error);
      });

    return () => {
      mounted = false;
      if (window.AOS) {
        window.AOS.refreshHard();
      }
    };
  }, [options]);
}
