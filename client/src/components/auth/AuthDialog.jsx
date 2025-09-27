import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useTrackingClass } from '../../hooks/useTrackingClass.js';

export default function AuthDialog() {
  const {
    isLoginOpen,
    closeLogin,
    processGoogleCredential,
    authError,
    setAuthError,
    clientId,
    isAuthenticating,
  } = useAuth();
  const trackingClass = useTrackingClass();

  if (!isLoginOpen) {
    return null;
  }

  const handleError = () => {
    setAuthError('We were unable to complete the Google sign-in. Please try again.');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-6 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white/95 p-8 shadow-royal dark:border-white/10 dark:bg-royal-night">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-heading text-2xl text-royal-heading dark:text-royal-white">Sign in to continue</h2>
            <p className="mt-2 text-sm text-royal-muted dark:text-royal-white/70">
              Use your Google account to save your cart and access member-only perks.
            </p>
          </div>
          <button
            type="button"
            onClick={closeLogin}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-royal-gold/40 text-royal-heading transition hover:border-royal-gold hover:text-royal-gold dark:border-white/20 dark:text-royal-white"
            aria-label="Close sign in dialog"
          >
            <i className="bi bi-x-lg" />
          </button>
        </div>

        {!clientId ? (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-200">
            Google login is not configured. Set the <code>VITE_GOOGLE_CLIENT_ID</code> environment variable and reload.
          </div>
        ) : (
          <div className="mt-8 flex flex-col items-center gap-4">
            <GoogleLogin
              onSuccess={processGoogleCredential}
              onError={handleError}
              useOneTap={false}
              shape="pill"
              text="signin_with"
            />
            {isAuthenticating && (
              <p className={`text-xs uppercase ${trackingClass('tracking-[0.3em]')} text-royal-muted dark:text-royal-white/60`}>
                Verifying your account…
              </p>
            )}
            {authError && (
              <p className="text-xs text-red-500 dark:text-red-300">{authError}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
