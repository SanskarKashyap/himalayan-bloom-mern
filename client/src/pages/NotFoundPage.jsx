import { Link } from 'react-router-dom';
import { useTrackingClass } from '../hooks/useTrackingClass.js';

export default function NotFoundPage() {
  const trackingClass = useTrackingClass();

  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-4xl px-6 text-center sm:px-10">
        <p className={`font-semibold uppercase ${trackingClass('tracking-[0.3em]')} text-royal-gold`}>404</p>
        <h1 className="mt-4 font-heading text-4xl text-royal-heading dark:text-royal-white">
          We couldn&apos;t find that page
        </h1>
        <p className="mt-6 text-royal-muted dark:text-royal-white/70">
          The page you&apos;re looking for has moved or no longer exists. Let&apos;s bring you back to our home page to keep exploring.
        </p>
        <div className="mt-8 flex justify-center">
          <Link to="/" className="btn-royal">
            Go Home
          </Link>
        </div>
      </div>
    </section>
  );
}
