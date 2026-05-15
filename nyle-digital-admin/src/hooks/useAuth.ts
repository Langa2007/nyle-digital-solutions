// src/hooks/useAuth.ts
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { adminApi } from '@/lib/api/adminClient';

export const useAuth = () => {
  const router = useRouter();
  const { user, isAuthenticated, login, logout, updateUser } = useAuthStore();

  const checkAuth = async () => {
    try {
      const response = await adminApi.get('/auth/me');
      if (response.data.success) {
        login(response.data.data);
      } else {
        logout();
      }
    } catch (error) {
      logout();
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    const response = await adminApi.post('/auth/login', { email, password });
    const { user } = response.data;
    login(user);
  };

  const handleLogout = async () => {
    try {
      await adminApi.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      logout();
      router.push('/login');
    }
  };

  return {
    user,
    isAuthenticated,
    login: handleLogin,
    logout: handleLogout,
    updateUser,
    loading: !user && isAuthenticated, // Slight adjustment for initial load
  };
};
