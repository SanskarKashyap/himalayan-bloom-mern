import { useEffect } from 'react';
import glightboxScriptUrl from '../static-bootstrap/assets/vendor/glightbox/js/glightbox.min.js?url';

let glightboxLoader;

function loadGLightbox() {
  if (typeof window === 'undefined') {
    return Promise.resolve(null);
  }

  if (window.GLightbox) {
    return Promise.resolve(window.GLightbox);
  }

  if (!glightboxLoader) {
    glightboxLoader = new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-vendor="glightbox"]');
      if (existing) {
        existing.addEventListener('load', () => resolve(window.GLightbox));
        existing.addEventListener('error', reject);
        return;
      }

      const script = document.createElement('script');
      script.src = glightboxScriptUrl;
      script.async = true;
      script.dataset.vendor = 'glightbox';
      script.onload = () => resolve(window.GLightbox);
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }

  return glightboxLoader;
}

export function useLightbox({ selector = '.glightbox', options = {} } = {}) {
  useEffect(() => {
    let instance;
    let isMounted = true;

    loadGLightbox()
      .then((GLightbox) => {
        if (!GLightbox || !isMounted) return;
        instance = GLightbox({ selector, ...options });
      })
      .catch((error) => {
        console.error('Failed to load GLightbox:', error);
      });

    return () => {
      isMounted = false;
      if (instance) {
        instance.destroy();
      }
    };
  }, [selector, options]);
}
