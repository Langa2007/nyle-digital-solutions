// src/lib/api/client.ts
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
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
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {}, {
          withCredentials: true,
        });
        
        const { token } = response.data;
        localStorage.setItem('token', token);
        
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  serviceType: 'custom_software' | 'web_apps' | 'mobile_apps' | 'desktop_apps' | 'saas' | 'cloud_infra' | 'digital_transformation' | 'consulting' | 'other';
  budget: '1k-5k' | '5k-20k' | '20k-50k' | '50k+' | 'undecided';
  timeline: 'urgent' | '1-3months' | '3-6months' | '6months+';
}

export interface JobApplicationData {
  jobId: string;
  fullName: string;
  email: string;
  phone: string;
  resume: string;
  coverLetter: string;
  experience: number;
  currentCompany?: string;
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  company?: string;
}

// API endpoints
export const contactApi = {
  submit: (data: ContactFormData) => apiClient.post('/contacts', data),
};

export const jobsApi = {
  getOpenPositions: () => apiClient.get('/jobs/open'),
  apply: (data: JobApplicationData) => apiClient.post('/jobs/apply', data),
};

export const blogApi = {
  getAll: (params?: { page?: number; limit?: number }) => 
    apiClient.get('/blog', { params }),
  getBySlug: (slug: string) => apiClient.get(`/blog/${slug}`),
};

export const portfolioApi = {
  getAll: () => apiClient.get('/portfolio'),
  getBySlug: (slug: string) => apiClient.get(`/portfolio/${slug}`),
};

export const authApi = {
  login: (data: LoginData) => apiClient.post('/auth/login', data),
  register: (data: RegisterData) => apiClient.post('/auth/register', data),
  logout: () => apiClient.post('/auth/logout'),
  me: () => apiClient.get('/auth/me'),
};

export default apiClient;