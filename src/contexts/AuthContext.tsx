'use client';

import {
  api,
  getSessionAccessToken,
  normalizeItem,
  setSessionAccessToken,
} from '@/lib/api';
import { User } from '@/lib/api-types';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken: string | null;
  refreshUser: () => Promise<void>;
  login: (email: string, password: string) => Promise<User>;
  register: (payload: {
    name: string;
    email: string;
    password: string;
    phone: string;
  }) => Promise<void>;
  refreshAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: true,
  refreshUser: async () => {},
  login: async () => {
    throw new Error('AuthContext not initialized');
  },
  register: async () => {
    throw new Error('AuthContext not initialized');
  },
  refreshAuth: async () => {},
  logout: async () => {},
});

const LOGIN_ENDPOINTS = ['/auth/login'];
const REGISTER_ENDPOINTS = ['/auth/register'];
const ME_ENDPOINTS = ['/auth/me'];
const LOGOUT_ENDPOINTS = ['/auth/logout'];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const clearAuthState = useCallback(() => {
    setSessionAccessToken(null);
    setAccessToken(null);
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
    }
  }, []);

  const clearAuthStateIfTokenMatches = useCallback(
    (expectedToken: string | null | undefined) => {
      const currentToken = getSessionAccessToken();
      if (expectedToken && currentToken && currentToken !== expectedToken) {
        return;
      }
      clearAuthState();
    },
    [clearAuthState]
  );

  const extractAccessToken = useCallback((payload: unknown): string | null => {
    if (!payload || typeof payload !== 'object') return null;

    const record = payload as {
      accessToken?: unknown;
      data?: { accessToken?: unknown };
    };

    if (typeof record.accessToken === 'string') return record.accessToken;
    if (typeof record.data?.accessToken === 'string')
      return record.data.accessToken;
    return null;
  }, []);

  const tryRefreshAccessToken = useCallback(async (): Promise<
    string | null
  > => {
    const candidates = ['/auth/refresh-token'];

    for (const endpoint of candidates) {
      try {
        const res = await api.post(endpoint);
        const token = extractAccessToken(res.data);
        if (token) {
          return token;
        }
      } catch {
        // Try next known endpoint name.
      }
    }

    return null;
  }, [extractAccessToken]);

  const extractUser = useCallback((payload: unknown): User | null => {
    if (!payload || typeof payload !== 'object') return null;

    const root = payload as {
      user?: unknown;
      data?: unknown;
    };

    if (root.user && typeof root.user === 'object') {
      return root.user as User;
    }

    const fromData = normalizeItem<User>(root.data);
    if (fromData) return fromData;

    return normalizeItem<User>(payload);
  }, []);

  const fetchCurrentUser = useCallback(async () => {
    for (const endpoint of ME_ENDPOINTS) {
      try {
        const meRes = await api.get(endpoint);
        const nextUser = extractUser(meRes.data);
        setUser(nextUser);
        return;
      } catch {
        // Try next user endpoint.
      }
    }

    throw new Error('Unable to fetch current user');
  }, [extractUser]);

  const refreshAuth = useCallback(async () => {
    const existingToken = getSessionAccessToken();

    if (!existingToken) {
      // Try to refresh token from backend (uses cookies for refresh token)
      const refreshedToken = await tryRefreshAccessToken();

      if (!refreshedToken) {
        clearAuthState();
        return;
      }

      setSessionAccessToken(refreshedToken);
      setAccessToken(refreshedToken);

      // Persist refreshed token
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', refreshedToken);
      }
    }

    try {
      await fetchCurrentUser();
    } catch (error) {
      // Token might be invalid, clear everything
      clearAuthState();
      throw error;
    }
  }, [clearAuthState, fetchCurrentUser, tryRefreshAccessToken]);

  const refreshUser = useCallback(async () => {
    await fetchCurrentUser();
  }, [fetchCurrentUser]);

  useEffect(() => {
    let isMounted = true;

    const loadSession = async () => {
      try {
        // First, restore token from localStorage
        const storedToken =
          typeof window !== 'undefined'
            ? localStorage.getItem('accessToken')
            : null;
        if (storedToken) {
          if (!isMounted) return;
          setSessionAccessToken(storedToken);
          setAccessToken(storedToken);
          // Token restored, try to fetch user
          try {
            await fetchCurrentUser();
            return; // Successfully loaded user with stored token
          } catch {
            // Token invalid, clear it
            clearAuthStateIfTokenMatches(storedToken);
          }
        }

        // No valid stored token, try to refresh from backend (using cookies)
        const refreshedToken = await tryRefreshAccessToken();
        if (!refreshedToken) {
          // If login already happened in parallel, do not wipe fresh auth state.
          if (!getSessionAccessToken()) {
            setSessionAccessToken(null);
            setAccessToken(null);
            setUser(null);
          }
          return;
        }

        if (!isMounted) return;
        setSessionAccessToken(refreshedToken);
        setAccessToken(refreshedToken);
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', refreshedToken);
        }

        // Try to fetch user with refreshed token
        try {
          await fetchCurrentUser();
        } catch {
          clearAuthStateIfTokenMatches(refreshedToken);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadSession();

    return () => {
      isMounted = false;
    };
  }, [clearAuthStateIfTokenMatches, tryRefreshAccessToken, fetchCurrentUser]);

  const login = async (email: string, password: string) => {
    let lastError: unknown = null;

    for (const endpoint of LOGIN_ENDPOINTS) {
      try {
        const response = await api.post(endpoint, {
          email,
          password,
        });

        const token = extractAccessToken(response.data);
        const nextUser = extractUser(response.data);

        if (!token || !nextUser) {
          throw new Error('Login response missing token or user data');
        }

        setSessionAccessToken(token);
        setAccessToken(token);
        setUser(nextUser);
        setIsLoading(false);

        // Persist token to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', token);
        }

        // Ensure latest user data is loaded from /auth/me after login.
        void fetchCurrentUser();

        return nextUser;
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError instanceof Error ? lastError : new Error('Login failed');
  };

  const register = async (payload: {
    name: string;
    email: string;
    password: string;
    phone: string;
  }) => {
    let lastError: unknown = null;

    for (const endpoint of REGISTER_ENDPOINTS) {
      try {
        await api.post(endpoint, payload);
        return;
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError instanceof Error
      ? lastError
      : new Error('Registration failed');
  };

  const logout = async () => {
    for (const endpoint of LOGOUT_ENDPOINTS) {
      try {
        await api.post(endpoint);
        break;
      } catch {
        // Try next logout endpoint.
      }
    }

    clearAuthState();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated: !!user,
        isLoading,
        refreshUser,
        login,
        register,
        refreshAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
