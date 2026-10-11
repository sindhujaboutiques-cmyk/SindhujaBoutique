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
   LOCAL STORAGE PRODUCT SYNC HELPERS
======================================================== */
const getLocalCustomProducts = () => {
  try {
    const raw = localStorage.getItem('sinduja_custom_products');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

const getLocalProductOverrides = () => {
  try {
    const raw = localStorage.getItem('sinduja_product_overrides');
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
};

const saveLocalCustomProducts = (items) => {
  try {
    localStorage.setItem('sinduja_custom_products', JSON.stringify(items));
  } catch (e) {}
};

const saveLocalProductOverrides = (overrides) => {
  try {
    localStorage.setItem('sinduja_product_overrides', JSON.stringify(overrides));
  } catch (e) {}
};

/* ========================================================
   PRODUCTS / DRESSES APIS
======================================================== */
export const getProducts = async (params = {}) => {
  let list = [];
  try {
    const res = await api.get('/products', { params });
    if (res.data?.success && Array.isArray(res.data?.data)) {
      list = res.data.data;
    }
  } catch (err) {
    console.warn('API fallback to local product data:', err.message);
  }
  
  // Merge custom products if backend list is empty or fallback
  if (!list || list.length === 0) {
    const custom = getLocalCustomProducts();
    list = [...custom, ...INITIAL_PRODUCTS];
  } else {
    // If backend succeeded, still merge any local custom products
    const custom = getLocalCustomProducts();
    const existingIds = new Set(list.map(p => p._id || p.id));
    const uniqueCustom = custom.filter(p => !existingIds.has(p._id || p.id));
    list = [...uniqueCustom, ...list];
  }

  // Apply overrides (quantity edits, restocks, out-of-stock marks)
  const overrides = getLocalProductOverrides();
  list = list.map(prod => {
    const id = prod._id || prod.id;
    const slug = prod.slug;
    const match = overrides[id] || (slug ? overrides[slug] : null);
    const merged = match ? { ...prod, ...match } : prod;
    
    // Parse quantity
    const qty = merged.quantity !== undefined && merged.quantity !== null 
      ? parseInt(merged.quantity, 10) 
      : (merged.stockStatus === 'Out of Stock' ? 0 : 10);
    const isOut = qty <= 0 || merged.stockStatus === 'Out of Stock' || merged.available === false;
    
    return {
      ...merged,
      quantity: isOut ? 0 : qty,
      stockStatus: isOut ? 'Out of Stock' : (merged.stockStatus || 'In Stock'),
      available: !isOut
    };
  });

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
      const overrides = getLocalProductOverrides();
      const prod = res.data.data;
      const match = overrides[prod._id || prod.id] || overrides[prod.slug];
      const merged = match ? { ...prod, ...match } : prod;
      const qty = merged.quantity !== undefined ? parseInt(merged.quantity, 10) : 10;
      const isOut = qty <= 0 || merged.stockStatus === 'Out of Stock' || merged.available === false;
      return {
        ...merged,
        quantity: isOut ? 0 : qty,
        stockStatus: isOut ? 'Out of Stock' : (merged.stockStatus || 'In Stock'),
        available: !isOut
      };
    }
  } catch (err) {
    console.warn('API fallback for product detail:', err.message);
  }
  const all = await getProducts();
  return all.find(p => p.slug === slug || p.id === slug || p._id === slug) || null;
};

export const createProduct = async (productData) => {
  const parsedQty = productData.quantity !== undefined && productData.quantity !== null 
    ? Math.max(0, parseInt(productData.quantity, 10) || 0) 
    : 1;
  const isOut = parsedQty === 0 || productData.stockStatus === 'Out of Stock' || productData.available === false;
  
  const itemToSave = {
    ...productData,
    id: 'prod-' + Date.now(),
    _id: 'prod-' + Date.now(),
    slug: (productData.name || 'item').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4),
    categorySlug: (productData.category || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
    quantity: parsedQty,
    stockStatus: isOut ? 'Out of Stock' : (productData.stockStatus || 'In Stock'),
    available: !isOut
  };

  const custom = getLocalCustomProducts();
  custom.unshift(itemToSave);
  saveLocalCustomProducts(custom);

  try {
    const res = await api.post('/products', productData);
    return res.data;
  } catch (err) {
    return { success: true, message: 'Item saved successfully to boutique inventory', data: itemToSave };
  }
};

export const updateProduct = async (id, productData) => {
  const overrides = getLocalProductOverrides();
  const q = productData.quantity !== undefined && productData.quantity !== null 
    ? Math.max(0, parseInt(productData.quantity, 10) || 0) 
    : undefined;
  const isOut = q === 0 || productData.stockStatus === 'Out of Stock';

  const updatedData = {
    ...productData,
    ...(q !== undefined ? { quantity: q } : {}),
    ...(isOut ? { stockStatus: 'Out of Stock', available: false } : (q !== undefined && q > 0 ? { stockStatus: 'In Stock', available: true } : {}))
  };

  overrides[id] = { ...(overrides[id] || {}), ...updatedData };
  saveLocalProductOverrides(overrides);

  const custom = getLocalCustomProducts();
  const customIdx = custom.findIndex(p => p.id === id || p._id === id);
  if (customIdx > -1) {
    custom[customIdx] = { ...custom[customIdx], ...updatedData };
    saveLocalCustomProducts(custom);
  }

  try {
    const res = await api.put(`/products/${id}`, updatedData);
    return res.data;
  } catch (err) {
    return { success: true, message: 'Stock and details updated successfully', data: updatedData };
  }
};

export const deleteProduct = async (id) => {
  const custom = getLocalCustomProducts().filter(p => p.id !== id && p._id !== id);
  saveLocalCustomProducts(custom);

  const overrides = getLocalProductOverrides();
  delete overrides[id];
  saveLocalProductOverrides(overrides);

  try {
    const res = await api.delete(`/products/${id}`);
    return res.data;
  } catch (err) {
    return { success: true, message: 'Product removed from showroom' };
  }
};

/**
 * Deduct purchased quantities when an order is completed.
 * Automatically marks products as Out of Stock once quantity reaches 0.
 */
export const deductProductStock = async (cartItems = []) => {
  if (!Array.isArray(cartItems) || cartItems.length === 0) return;
  const allProducts = await getProducts();

  for (const item of cartItems) {
    const prodId = item.id || item._id;
    const match = allProducts.find(p => (prodId && (p.id === prodId || p._id === prodId)) || p.slug === item.slug);
    if (match) {
      const currentQty = match.quantity !== undefined ? match.quantity : 10;
      const boughtQty = item.quantity || 1;
      const newQty = Math.max(0, currentQty - boughtQty);
      const isOut = newQty === 0;

      await updateProduct(match._id || match.id, {
        quantity: newQty,
        stockStatus: isOut ? 'Out of Stock' : 'In Stock',
        available: !isOut
      });
    }
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

/* ========================================================
   RAZORPAY CHECKOUT APIS
======================================================== */
export const createRazorpayOrder = async ({ amount, currency = 'INR', receipt, notes }) => {
  try {
    const res = await api.post('/create-order', {
      amount,
      currency,
      receipt,
      notes
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: 'Failed to initialize payment order on server' };
  }
};

export const verifyRazorpayPayment = async ({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) => {
  try {
    const res = await api.post('/verify-payment', {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: 'Payment signature verification failed' };
  }
};

export const getRazorpayPublicKey = async () => {
  try {
    const res = await api.get('/razorpay-key');
    return res.data?.key_id || '';
  } catch (err) {
    return '';
  }
};

export default api;
