// src/lib/store/authStore.ts
import { create } from 'zustand';

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
  nylepayToken: string | null; // Restored for NylePay API compatibility
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  setNylepayToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  nylepayToken: null,
  isAuthenticated: false,
  login: (user) =>
    set({ user, isAuthenticated: true }),
  logout: () =>
    set({ user: null, nylepayToken: null, isAuthenticated: false }),
  updateUser: (updatedUser) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updatedUser } : null,
    })),
  setNylepayToken: (nylepayToken) => set({ nylepayToken }),
}));

export const store = useAuthStore;