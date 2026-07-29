// src/lib/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  company?: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  nylepayToken: string | null; // Restored for NylePay API compatibility
  isAuthenticated: boolean;
  login: (user: User, token?: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  setNylepayToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      nylepayToken: null,
      isAuthenticated: false,
      login: (user, token) =>
        set({ user, token: token ?? null, isAuthenticated: true }),
      logout: () =>
        set({ user: null, token: null, nylepayToken: null, isAuthenticated: false }),
      updateUser: (updatedUser) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedUser } : null,
        })),
      setNylepayToken: (nylepayToken) => set({ nylepayToken }),
    }),
    {
      name: 'vantech-admin-auth',
      // Only persist token and user, not nylepayToken
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export const store = useAuthStore;