import { useEffect, useState } from 'react';

export function usePreloader(delay = 500) {
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setReady(true), delay);
    return () => window.clearTimeout(timeout);
  }, [delay]);

  return isReady;
}
