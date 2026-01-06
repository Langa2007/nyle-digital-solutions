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
    // Get token from localStorage or cookies
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

    // Handle 401 errors (token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Attempt to refresh token
        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {}, {
          withCredentials: true,
        });
        
        const { token } = response.data;
        localStorage.setItem('token', token);
        
        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

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