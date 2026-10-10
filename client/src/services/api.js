import axios from 'axios';
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS, INITIAL_SERVICES, INITIAL_GALLERY } from '../data/initialData';
import { BUSINESS_CONFIG } from '../config/businessConfig';

const API_BASE = '/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach Admin Token to requests if logged in
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('sinduja_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

/* ========================================================
   ADMIN AUTHENTICATION APIS
======================================================== */
export const adminLogin = async (identifier, password) => {
  try {
    const res = await api.post('/admin/login', { identifier, password });
    if (res.data?.success && res.data.token) {
      localStorage.setItem('sinduja_admin_token', res.data.token);
      localStorage.setItem('sinduja_admin_user', JSON.stringify(res.data.admin));
    }
    return res.data;
  } catch (err) {
    // If backend is unreachable or local mock mode:
    if (err.response?.data) {
      throw err.response.data;
    }
    // Fallback verification for offline mock mode
    if ((identifier.toLowerCase() === 'admin' || identifier.toLowerCase() === 'admin@sindujaboutique.com') && password === 'sinduja@admin2025') {
      const mockAdmin = {
        id: 'admin-1',
        name: 'Sinduja (Atelier Owner)',
        email: 'admin@sindujaboutique.com',
        username: 'admin',
        role: 'Store Owner & Administrator'
      };
      localStorage.setItem('sinduja_admin_token', 'mock-token-' + Date.now());
      localStorage.setItem('sinduja_admin_user', JSON.stringify(mockAdmin));
      return { success: true, token: 'mock-token', admin: mockAdmin };
    }
    throw { message: 'Invalid credentials. Use admin@sindujaboutique.com / sinduja@admin2025' };
  }
};

export const verifyAdminSession = async () => {
  const token = localStorage.getItem('sinduja_admin_token');
  if (!token) return { valid: false };
  try {
    const res = await api.get('/admin/verify');
    return res.data;
  } catch (err) {
    if (token.startsWith('mock-token')) {
      const user = localStorage.getItem('sinduja_admin_user');
      return { valid: true, admin: user ? JSON.parse(user) : null };
    }
    return { valid: false };
  }
};

export const adminLogout = () => {
  localStorage.removeItem('sinduja_admin_token');
  localStorage.removeItem('sinduja_admin_user');
};

export const updateAdminPassword = async (payload) => {
  try {
    const res = await api.put('/admin/password', payload);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: 'Error updating password' };
  }
};

/* ========================================================
   PRODUCTS / DRESSES APIS
======================================================== */
export const getProducts = async (params = {}) => {
  try {
    const res = await api.get('/products', { params });
    if (res.data?.success && res.data?.data) {
      return res.data.data;
    }
  } catch (err) {
    console.warn('API fallback to local product data:', err.message);
  }
  
  // Local fallback
  let list = [...INITIAL_PRODUCTS];
  if (params.category && params.category !== 'all') {
    list = list.filter(p => p.categorySlug === params.category || p.category.toLowerCase() === params.category.toLowerCase());
  }
  if (params.featured) {
    list = list.filter(p => p.featured);
  }
  if (params.newArrival) {
    list = list.filter(p => p.newArrival);
  }
  return list;
};

export const getProductBySlug = async (slug) => {
  try {
    const res = await api.get(`/products/${slug}`);
    if (res.data?.success && res.data?.data) {
      return res.data.data;
    }
  } catch (err) {
    console.warn('API fallback for product detail:', err.message);
  }
  return INITIAL_PRODUCTS.find(p => p.slug === slug || p.id === slug) || null;
};

export const createProduct = async (productData) => {
  try {
    const res = await api.post('/products', productData);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: 'Network error creating product' };
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const res = await api.put(`/products/${id}`, productData);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: 'Network error updating product' };
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await api.delete(`/products/${id}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: 'Network error deleting product' };
  }
};

/* ========================================================
   CATEGORIES & SERVICES APIS
======================================================== */
export const getCategories = async () => {
  try {
    const res = await api.get('/categories');
    if (res.data?.success && res.data?.data) {
      return res.data.data;
    }
  } catch (err) {
    console.warn('API fallback for categories:', err.message);
  }
  return INITIAL_CATEGORIES;
};

export const getServices = async () => {
  try {
    const res = await api.get('/services');
    if (res.data?.success && res.data?.data) {
      return res.data.data;
    }
  } catch (err) {
    console.warn('API fallback for services:', err.message);
  }
  return INITIAL_SERVICES;
};

/* ========================================================
   GALLERY / LOOKBOOK APIS
======================================================== */
export const getGallery = async (category = 'All') => {
  try {
    const res = await api.get('/gallery', { params: { category } });
    if (res.data?.success && res.data?.data) {
      return res.data.data;
    }
  } catch (err) {
    console.warn('API fallback for gallery:', err.message);
  }
  if (category && category !== 'All') {
    return INITIAL_GALLERY.filter(g => g.category.toLowerCase() === category.toLowerCase());
  }
  return INITIAL_GALLERY;
};

export const createGalleryItem = async (itemData) => {
  try {
    const res = await api.post('/gallery', itemData);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: 'Network error creating gallery photo' };
  }
};

export const deleteGalleryItem = async (id) => {
  try {
    const res = await api.delete(`/gallery/${id}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: 'Network error removing gallery photo' };
  }
};

/* ========================================================
   BUSINESS SETTINGS APIS
======================================================== */
export const getSettings = async () => {
  try {
    const res = await api.get('/settings');
    if (res.data?.success && res.data?.data) {
      return res.data.data;
    }
  } catch (err) {
    console.warn('API fallback for settings:', err.message);
  }
  return BUSINESS_CONFIG;
};

export const updateSettings = async (settings) => {
  try {
    const res = await api.put('/settings', settings);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: 'Network error updating settings' };
  }
};

/* ========================================================
   CONTACT & CUSTOMER ENQUIRIES APIS
======================================================== */
export const sendContactMessage = async (formData) => {
  try {
    const res = await api.post('/contact', formData);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: 'Network error submitting contact' };
  }
};

export const getEnquiries = async () => {
  try {
    const res = await api.get('/enquiries');
    if (res.data?.success && res.data?.data) {
      return res.data.data;
    }
  } catch (err) {
    console.warn('API fallback for enquiries:', err.message);
  }
  return [];
};

export const updateEnquiryStatus = async (id, status) => {
  try {
    const res = await api.put(`/enquiries/${id}`, { status });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: 'Error updating enquiry status' };
  }
};

export const deleteEnquiry = async (id) => {
  try {
    const res = await api.delete(`/enquiries/${id}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: 'Error deleting enquiry' };
  }
};

export default api;
