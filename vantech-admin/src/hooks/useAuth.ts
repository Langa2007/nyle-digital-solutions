// src/hooks/useAuth.ts
import { useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { adminApi } from '@/lib/api/adminClient';

export const useAuth = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, token, isAuthenticated, login, logout, updateUser } = useAuthStore();
  const checkedRef = useRef(false);

  const checkAuth = async () => {
    // Skip check if on the login page — no token means no auth, just stay
    if (pathname?.startsWith('/login')) return;
    // Skip if already checked this mount cycle
    if (checkedRef.current) return;
    checkedRef.current = true;

    try {
      const response = await adminApi.get('/auth/me');
      if (response.data.success) {
        login(response.data.data, token ?? undefined);
      } else {
        logout();
        router.push('/login');
      }
    } catch (error) {
      // Only logout + redirect if we had a token (i.e. session expired)
      if (token) {
        logout();
        router.push('/login');
      }
    }
  };

  useEffect(() => {
    checkedRef.current = false;
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleLogin = async (email: string, password: string) => {
    const response = await adminApi.post('/auth/login', { email, password });
    const { user, token } = response.data;
    login(user, token);
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
    loading: false,
  };
};
