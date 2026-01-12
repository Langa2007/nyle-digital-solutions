// src/lib/api/adminClient.ts
import axios from 'axios';
import { useAuthStore } from '@/lib/store/authStore';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://nyle-digital-solutions.onrender.com/api';

const adminClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
adminClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
adminClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const adminApi = {
  // Auth
  login: (data: { email: string; password: string }) =>
    adminClient.post('/auth/login', data),
  getProfile: () => adminClient.get('/auth/me'),
  updateProfile: (data: any) => adminClient.put('/auth/update-details', data),

  // Dashboard
  getDashboardStats: () => adminClient.get('/admin/dashboard/stats'),
  getRecentActivity: () => adminClient.get('/admin/activity/recent'),

  // Contacts
  getContacts: (params?: any) => adminClient.get('/contacts', { params }),
  updateContactStatus: (id: string, data: any) =>
    adminClient.patch(`/contacts/${id}/status`, data),
  getContactStats: () => adminClient.get('/contacts/stats'),
  bulkContactAction: (data: any) => adminClient.post('/admin/contacts/bulk-action', data),

  // Job Applications
  getApplications: (params?: any) => adminClient.get('/jobs', { params }),
  updateApplicationStatus: (id: string, data: any) =>
    adminClient.patch(`/jobs/${id}/status`, data),
  getApplicationStats: () => adminClient.get('/jobs/stats'),

  // Blog
  getBlogPosts: (params?: any) => adminClient.get('/blog', { params }),
  getBlogPost: (id: string) => adminClient.get(`/blog/${id}`),
  createBlogPost: (data: any) => adminClient.post('/blog', data),
  updateBlogPost: (id: string, data: any) => adminClient.put(`/blog/${id}`, data),
  deleteBlogPost: (id: string) => adminClient.delete(`/blog/${id}`),
  getBlogCategories: () => adminClient.get('/blog/categories'),

  // Portfolio
  getPortfolioItems: (params?: any) => adminClient.get('/portfolio', { params }),
  getPortfolioItem: (id: string) => adminClient.get(`/portfolio/${id}`),
  createPortfolioItem: (data: any) => adminClient.post('/portfolio', data),
  updatePortfolioItem: (id: string, data: any) =>
    adminClient.put(`/portfolio/${id}`, data),
  deletePortfolioItem: (id: string) => adminClient.delete(`/portfolio/${id}`),
  getPortfolioCategories: () => adminClient.get('/portfolio/categories'),

  // Services
  getServices: (params?: any) => adminClient.get('/services', { params }),
  getService: (id: string) => adminClient.get(`/services/${id}`),
  createService: (data: any) => adminClient.post('/services', data),
  updateService: (id: string, data: any) => adminClient.put(`/services/${id}`, data),
  deleteService: (id: string) => adminClient.delete(`/services/${id}`),
  getServiceCategories: () => adminClient.get('/services/categories'),

  // Upload
  uploadImage: (data: FormData) => adminClient.post('/admin/upload/image', data),
  uploadFile: (data: FormData) => adminClient.post('/admin/upload/file', data),

  // Generic
  get: (url: string, config?: any) => adminClient.get(url, config),
  post: (url: string, data?: any, config?: any) => adminClient.post(url, data, config),
  put: (url: string, data?: any, config?: any) => adminClient.put(url, data, config),
  delete: (url: string, config?: any) => adminClient.delete(url, config),
};

export default adminClient;