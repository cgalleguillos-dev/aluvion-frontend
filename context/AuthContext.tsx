'use client';

import { createContext, useCallback, useContext, useMemo, useState } from "react";



type AuthToken = {
  token: string;
  refreshToken?: string;
}

type AuthContextType = {
  login: (authToken: AuthToken) => void;
  logout: () => void;
  isLoggedIn: boolean;
  authToken: string | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AUTH_TOKEN_KEY = 'authToken';

interface Props {
  children: React.ReactNode;
}

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);

  const login = useCallback((authToken: AuthToken) => {
    window.localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(authToken.token));
    setAuthToken(authToken.token);
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(AUTH_TOKEN_KEY);
    setAuthToken(null);
  }, []);

  const value = useMemo(() => ({
    login,
    logout,
    authToken,
    isLoggedIn: authToken !== null
  }), [authToken, login, logout]);
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthContextProvider');
  }
  return context;
};