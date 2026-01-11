// src/types/index.ts
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'staff' | 'client';
  company?: string;
  avatar?: string;
  isEmailVerified?: boolean;
  status?: 'active' | 'inactive' | 'suspended';
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  serviceType: 'custom_software' | 'web_apps' | 'mobile_apps' | 'desktop_apps' | 'saas' | 'cloud_infra' | 'digital_transformation' | 'consulting' | 'other';
  budget: '1k-5k' | '5k-20k' | '20k-50k' | '50k+' | 'undecided';
  timeline: 'urgent' | '1-3months' | '3-6months' | '6months+';
  status: 'new' | 'contacted' | 'in_progress' | 'converted' | 'archived';
  notes?: string;
  assignedTo?: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobApplication {
  id: string;
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
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
  notes?: string;
  appliedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorId: string;
  category: string;
  tags: string[];
  featuredImage: string;
  readTime: number;
  status: 'draft' | 'published' | 'archived';
  views: number;
  likes: number;
  publishedAt?: string;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Portfolio {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  client?: string;
  technologies: string[];
  featuredImage: string;
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
  results?: string;
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  detailedDescription?: string;
  icon?: string;
  features: string[];
  technologies: string[];
  category: 'development' | 'design' | 'consulting' | 'infrastructure' | 'support';
  pricingModel: 'hourly' | 'fixed' | 'subscription' | 'custom';
  startingPrice?: number;
  active: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  errors?: any[];
}