import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { GoogleOAuthProvider, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { apiService } from '../services/ApiService.js';

const STORAGE_KEY = 'hb_auth_user';
const AuthContext = createContext(undefined);

function loadStoredUser() {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (error) {
    console.warn('Failed to parse stored user', error);
    return null;
  }
}

function AuthProviderInner({ children, clientId }) {
  const [user, setUser] = useState(() => loadStoredUser());
  const [authError, setAuthError] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!user) {
      window.localStorage.removeItem(STORAGE_KEY);
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }, [user]);

  const processGoogleCredential = async (credentialResponse) => {
    if (!credentialResponse?.credential) {
      setAuthError('Google sign-in failed. No credential was returned.');
      return;
    }

    setIsAuthenticating(true);
    setAuthError(null);

    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const userData = {
        id: decoded.sub,
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
      };

      try {
        await apiService.request('/auth/google', {
          method: 'POST',
          body: JSON.stringify({ credential: credentialResponse.credential }),
        });
      } catch (apiError) {
        console.warn('Failed to sync Google sign-in with API', apiError);
      }

      setUser(userData);
      setIsLoginOpen(false);
    } catch (error) {
      console.error('Failed to decode Google credential', error);
      setAuthError('We could not verify your Google account. Please try again.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const logout = () => {
    try {
      googleLogout();
    } catch (error) {
      console.warn('Error during Google logout', error);
    }
    setUser(null);
    setAuthError(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      authError,
      isLoginOpen,
      isAuthenticating,
      clientId,
      openLogin: () => setIsLoginOpen(true),
      closeLogin: () => setIsLoginOpen(false),
      processGoogleCredential,
      logout,
      setAuthError,
    }),
    [user, authError, isLoginOpen, isAuthenticating, clientId]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function AuthProvider({ children }) {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={clientId ?? ''}>
      <AuthProviderInner clientId={clientId}>{children}</AuthProviderInner>
    </GoogleOAuthProvider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
