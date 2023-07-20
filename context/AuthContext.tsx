'use client'
import { useRouter, usePathname } from "next/navigation";
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";

type AuthContextType = {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

interface Props {
  children: React.ReactNode
}

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  let isAuth;
  if (typeof window !== 'undefined') {
    isAuth = localStorage.getItem('token') ? true : false;
  }
  const router = useRouter();
  const pathname = usePathname();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(isAuth ? true : false);
  useEffect(() => {
    if (!isAuthenticated
      && pathname !== '/auth/login'
    ) {
      localStorage.removeItem('token');
      router.push('/auth/login');
    }
    else if (isAuthenticated && pathname === '/auth/login') {
      router.push('/auth/base-equipments')
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
}