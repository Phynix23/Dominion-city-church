// src/utils/api.js
import axios from 'axios';
import { toast } from 'react-toastify';

// Get API URL from environment or use default
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Log API URL in development
if (process.env.NODE_ENV === 'development') {
  console.log(`[API] Using base URL: ${API_BASE_URL}`);
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 30000, // Increased timeout to 30 seconds
});

// Request interceptor - adds auth token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, config.data);
    }
    
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// Response interceptor - handles errors globally
api.interceptors.response.use(
  (response) => {
    // Log response in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API Response] ${response.config.url}`, response.data);
    }
    return response.data;
  },
  (error) => {
    // Handle network errors
    if (!error.response) {
      toast.error('Network error. Please check your internet connection.');
      console.error('[API Network Error]', error);
      return Promise.reject(error);
    }

    // Handle HTTP errors
    const { status, data } = error.response;
    
    switch (status) {
      case 401:
        toast.error('Session expired. Please login again.');
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        // Redirect to home page after 2 seconds
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
        break;
        
      case 403:
        toast.error('You do not have permission to perform this action.');
        break;
        
      case 404:
        toast.error(data?.message || 'Resource not found.');
        break;
        
      case 422:
        // Validation error
        if (data?.errors) {
          Object.values(data.errors).forEach((err) => {
            toast.error(err);
          });
        } else {
          toast.error(data?.message || 'Validation error.');
        }
        break;
        
      case 429:
        toast.error('Too many requests. Please try again later.');
        break;
        
      case 500:
        toast.error('Server error. Please try again later.');
        break;
        
      default:
        toast.error(data?.message || 'An error occurred. Please try again.');
    }
    
    console.error('[API Error]', {
      status,
      url: error.config?.url,
      data: data,
    });
    
    return Promise.reject(error);
  }
);

// ==================== AUTH API ====================
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    return Promise.resolve({ success: true });
  },
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.put('/auth/change-password', data),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.post(`/auth/reset-password/${token}`, { password }),
};

// ==================== EVENTS API ====================
export const eventsAPI = {
  getAll: (params) => api.get('/events', { params }),
  getById: (id) => api.get(`/events/${id}`),
  create: (data) => api.post('/events', data),
  update: (id, data) => api.put(`/events/${id}`, data),
  delete: (id) => api.delete(`/events/${id}`),
  register: (eventId, data) => api.post(`/events/${eventId}/register`, data),
  getUpcoming: () => api.get('/events/upcoming'),
  getFeatured: () => api.get('/events/featured'),
};

// ==================== SERMONS API ====================
export const sermonsAPI = {
  getAll: (params) => api.get('/sermons', { params }),
  getById: (id) => api.get(`/sermons/${id}`),
  create: (data) => api.post('/sermons', data),
  update: (id, data) => api.put(`/sermons/${id}`, data),
  delete: (id) => api.delete(`/sermons/${id}`),
  getSeries: () => api.get('/sermons/series'),
  incrementViews: (id) => api.post(`/sermons/${id}/view`),
  incrementDownloads: (id) => api.post(`/sermons/${id}/download`),
  getBySeries: (series) => api.get(`/sermons/series/${series}`),
  getByPreacher: (preacher) => api.get(`/sermons/preacher/${preacher}`),
};

// ==================== TESTIMONIES API ====================
export const testimoniesAPI = {
  getAll: (params) => api.get('/testimonies', { params }),
  getById: (id) => api.get(`/testimonies/${id}`),
  submit: (data) => api.post('/testimonies', data),
  like: (id) => api.post(`/testimonies/${id}/like`),
  pray: (id) => api.post(`/testimonies/${id}/pray`),
  getFeatured: () => api.get('/testimonies/featured'),
  getApproved: () => api.get('/testimonies/approved'),
};

// ==================== PRAYER REQUESTS API ====================
export const prayersAPI = {
  submit: (data) => api.post('/prayers', data),
  getAll: () => api.get('/prayers'),
  getById: (id) => api.get(`/prayers/${id}`),
  markAnswered: (id) => api.put(`/prayers/${id}/answer`),
  prayFor: (id) => api.post(`/prayers/${id}/pray`),
};

// ==================== DONATIONS API ====================
export const donationsAPI = {
  initialize: (data) => api.post('/donations/initialize', data),
  verify: (reference) => api.get(`/donations/verify/${reference}`),
  getAll: () => api.get('/donations'),
  getById: (id) => api.get(`/donations/${id}`),
};

// ==================== MINISTRIES API ====================
export const ministriesAPI = {
  getAll: () => api.get('/ministries'),
  getById: (id) => api.get(`/ministries/${id}`),
  apply: (data) => api.post('/ministries/apply', data),
  getByCategory: (category) => api.get(`/ministries/category/${category}`),
};

// ==================== CONTACT API ====================
export const contactAPI = {
  sendMessage: (data) => api.post('/contact', data),
  subscribe: (data) => api.post('/newsletter/subscribe', data),
  unsubscribe: (email) => api.post('/newsletter/unsubscribe', { email }),
};

// ==================== ADMIN API ====================
export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),
  getUsers: () => api.get('/admin/users'),
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  getStats: () => api.get('/admin/stats'),
};

// ==================== UPLOAD API ====================
export const uploadAPI = {
  uploadImage: (file, folder) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder', folder);
    return api.post('/upload/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  uploadSermon: (file, data) => {
    const formData = new FormData();
    formData.append('file', file);
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    return api.post('/upload/sermon', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

// Helper function to set auth token (useful after login)
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('authToken', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem('authToken');
    delete api.defaults.headers.common['Authorization'];
  }
};

// Helper function to get current user from localStorage
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Helper function to check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
};

// Helper function to check if user is admin
export const isAdmin = () => {
  const user = getCurrentUser();
  return user?.role === 'admin' || user?.role === 'pastor';
};

export default api;