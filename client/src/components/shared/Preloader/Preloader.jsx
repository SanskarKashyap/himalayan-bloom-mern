import { usePreloader } from '../../../hooks/usePreloader.js';

export default function Preloader() {
  const isReady = usePreloader(800);

  if (isReady) {
    return null;
  }

  return <div id="preloader" />;
}
