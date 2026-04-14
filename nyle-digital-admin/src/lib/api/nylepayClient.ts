// src/lib/api/nylepayClient.ts
// API client for the NylePay backend (Java Spring Boot @ localhost:8080)
import axios from 'axios';
import { useAuthStore } from '@/lib/store/authStore';

const NYLEPAY_API_URL = process.env.NEXT_PUBLIC_NYLEPAY_API_URL || 'http://localhost:8080/api';

const nylepayClient = axios.create({
  baseURL: NYLEPAY_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token from NylePay auth
nylepayClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().nylepayToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

nylepayClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.warn('[NylePay] Auth error:', error.response.status);
    }
    return Promise.reject(error);
  }
);

export const nylepayApi = {
  // Auth
  login: (email: string, password: string) =>
    nylepayClient.post('/auth/login', { email, password }),

  // Admin — Metrics
  getMetrics: () => nylepayClient.get('/admin/metrics'),

  // Admin — Transactions
  getTransactions: (params?: { page?: number; size?: number; status?: string }) =>
    nylepayClient.get('/admin/transactions', { params }),

  updateTransactionStatus: (id: number, status: string, notes?: string) =>
    nylepayClient.put(`/admin/transactions/${id}/status`, null, { params: { status, notes } }),

  // Admin — Users
  getUsers: (params?: { page?: number; size?: number }) =>
    nylepayClient.get('/admin/users', { params }),

  getUserDetail: (userId: number) =>
    nylepayClient.get(`/admin/users/${userId}`),
};

export default nylepayClient;
