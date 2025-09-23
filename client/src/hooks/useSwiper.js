import { useEffect } from 'react';
import swiperScriptUrl from '../static-bootstrap/assets/vendor/swiper/swiper-bundle.min.js?url';

let swiperLoader;

function loadSwiper() {
  if (typeof window === 'undefined') {
    return Promise.resolve(null);
  }

  if (window.Swiper) {
    return Promise.resolve(window.Swiper);
  }

  if (!swiperLoader) {
    swiperLoader = new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-vendor="swiper"]');
      if (existing) {
        existing.addEventListener('load', () => resolve(window.Swiper));
        existing.addEventListener('error', reject);
        return;
      }

      const script = document.createElement('script');
      script.src = swiperScriptUrl;
      script.async = true;
      script.dataset.vendor = 'swiper';
      script.onload = () => resolve(window.Swiper);
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }

  return swiperLoader;
}

function parseConfig(element) {
  const configElement = element.querySelector('.swiper-config');
  if (!configElement) return {};
  try {
    return JSON.parse(configElement.textContent);
  } catch (error) {
    console.error('Failed to parse Swiper config', error);
    return {};
  }
}

export function useSwiper(selector = '.init-swiper') {
  useEffect(() => {
    let isMounted = true;
    const initialized = [];

    loadSwiper()
      .then((Swiper) => {
        if (!Swiper || !isMounted) return;
        document.querySelectorAll(selector).forEach((element) => {
          if (element.dataset.swiperInitialized === 'true') {
            return;
          }
          const instance = new Swiper(element, parseConfig(element));
          element.dataset.swiperInitialized = 'true';
          initialized.push({ element, instance });
        });
      })
      .catch((error) => {
        console.error('Failed to load Swiper:', error);
      });

    return () => {
      isMounted = false;
      initialized.forEach(({ element, instance }) => {
        if (instance?.destroy) {
          instance.destroy(true, true);
        }
        if (element) {
          delete element.dataset.swiperInitialized;
        }
      });
    };
  }, [selector]);
}
