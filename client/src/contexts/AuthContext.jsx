import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { GoogleOAuthProvider, googleLogout } from '@react-oauth/google';
import { apiService } from '../services/ApiService.js';

const STORAGE_KEY = 'hb_auth_session';
const AuthContext = createContext(undefined);

function loadStoredSession() {
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
  const storedSession = loadStoredSession();
  const [user, setUser] = useState(() => storedSession?.user ?? null);
  const [token, setToken] = useState(() => storedSession?.token ?? null);
  const [authError, setAuthError] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!user || !token) {
      window.localStorage.removeItem(STORAGE_KEY);
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, token }));
  }, [user, token]);

  useEffect(() => {
    apiService.setAuthToken(token);
  }, [token]);

  const processGoogleCredential = async (credentialResponse) => {
    if (!credentialResponse?.credential) {
      setAuthError('Google sign-in failed. No credential was returned.');
      return;
    }

    setIsAuthenticating(true);
    setAuthError(null);

    try {
      const response = await apiService.request('/auth/google', {
        method: 'POST',
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });

      if (!response?.token || !response?.user) {
        throw new Error('Authentication response was incomplete');
      }

      setUser(response.user);
      setToken(response.token);
      setIsLoginOpen(false);
    } catch (error) {
      console.error('Failed to verify Google credential', error);
      setAuthError(error.message || 'We could not verify your Google account. Please try again.');
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
    setToken(null);
    setAuthError(null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user && token),
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
    [user, token, authError, isLoginOpen, isAuthenticating, clientId]
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
