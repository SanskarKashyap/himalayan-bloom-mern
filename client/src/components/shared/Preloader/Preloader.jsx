import { usePreloader } from '../../../hooks/usePreloader.js';

export default function Preloader() {
  const isReady = usePreloader(800);

  if (isReady) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-royal-cream/95 backdrop-blur dark:bg-royal-night/95">
      <div className="relative flex flex-col items-center gap-4">
        <div className="relative flex h-20 w-20 items-center justify-center">
          <span className="absolute inset-0 rounded-full border-2 border-royal-gold/40" />
          <span className="absolute inset-0 animate-spin rounded-full border-2 border-royal-gold border-t-transparent" />
          <span className="h-8 w-8 rounded-full bg-royal-gold/20" />
        </div>
        <p className="text-xs uppercase tracking-[0.32em] text-royal-muted dark:text-royal-white/60">
          Himalayan Blossom
        </p>
      </div>
    </div>
  );
}
