// src/hooks/useAuth.ts
'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api/client';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  company?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    // Skip if on auth pages
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.startsWith('/login') || path.startsWith('/register')) {
        setLoading(false);
        return;
      }
    }

    try {
      const response = await authApi.me();
      if (response.data.success) {
        setUser(response.data.data);
      } else {
        setUser(null);
        if (typeof window !== 'undefined') localStorage.removeItem('vantech_token');
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login({ email, password });
      const { user, token } = response.data;
      
      if (token && typeof window !== 'undefined') {
        localStorage.setItem('vantech_token', token);
      }

      setUser(user);
      router.push('/dashboard');
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: any) => {
    try {
      const response = await authApi.register(data);
      const { user, token } = response.data;
      
      if (token && typeof window !== 'undefined') {
        localStorage.setItem('vantech_token', token);
      }

      setUser(user);
      router.push('/dashboard');
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('vantech_token');
      }
      setUser(null);
      router.push('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
