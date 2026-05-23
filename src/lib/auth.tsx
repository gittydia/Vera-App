import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { api, type AuthResponse } from './api';

interface AuthContextType {
  token: string | null;
  user: AuthResponse['user'] | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('vera-token'));
  const [user, setUser] = useState<AuthResponse['user'] | null>(() => {
    const stored = localStorage.getItem('vera-user');
    return stored ? JSON.parse(stored) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem('vera-token', token);
    } else {
      localStorage.removeItem('vera-token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('vera-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('vera-user');
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await api.login(email, password);
      setToken(res.token);
      setUser(res.user);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await api.signup(name, email, password);
      setToken(res.token);
      setUser(res.user);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
