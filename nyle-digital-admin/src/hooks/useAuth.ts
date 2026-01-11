// src/hooks/useAuth.ts
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { adminApi } from '@/lib/api/adminClient';

export const useAuth = () => {
  const router = useRouter();
  const { user, token, isAuthenticated, login, logout, updateUser } = useAuthStore();

  const checkAuth = async () => {
    if (token && !user) {
      try {
        const response = await adminApi.get('/auth/me');
        login(response.data, token);
      } catch (error) {
        logout();
      }
    }
  };

  useEffect(() => {
    checkAuth();
  }, [token]);

  const handleLogin = async (email: string, password: string) => {
    const response = await adminApi.post('/auth/login', { email, password });
    const { token, user } = response.data;
    login(user, token);
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return {
    user,
    token,
    isAuthenticated,
    login: handleLogin,
    logout: handleLogout,
    updateUser,
    loading: token && !user,
  };
};