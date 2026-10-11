import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, Trash2, Edit3, Settings, Image as ImageIcon, ShoppingBag, 
  MessageSquare, Save, CheckCircle, RefreshCw, AlertCircle, Lock, 
  Eye, EyeOff, LogOut, Phone, ExternalLink, X, Search, 
  Sparkles, ShieldCheck, User, Send, Camera, AlertTriangle, Package, Check, Minus
} from 'lucide-react';
import SEO from '../components/common/SEO';
import { 
  getProducts, createProduct, updateProduct, deleteProduct, 
  getGallery, createGalleryItem, deleteGalleryItem, 
  getSettings, updateSettings,
  adminLogin, verifyAdminSession, adminLogout, updateAdminPassword,
  getEnquiries, updateEnquiryStatus, deleteEnquiry 
} from '../services/api';
import { BUSINESS_CONFIG } from '../config/businessConfig';

// Exact Boutique Categories strictly organized by section (No Mens, No Kids)
export const CATEGORY_GROUPS = [
  {
    group: 'Sarees',
    items: [
      'Soft Silk Sarees',
      'Semi Silk Saree',
      'Malmal Cotton Saree',
      'Kanchi Cotton Saree',
      'Kalyani Cotton Saree',
      'Ambika Cotton Saree',
      'Linen Cotton Saree',
      'Tussar Silks',
      'Art Silk Saree',
      'Cora Cotton Saree',
      'Synthetic Crepe Saree'
    ]
  },
  {
    group: "Women's Wear & Outfits",
    items: [
      'Chudidar (3 Pcs)',
      'Co-ord Set',
      'Cotton Pants',
      'Kurtis',
      'Shimmer Leggings',
      'Ready Made Blouse',
      'Inskirt (Petticoat)',
      'Inners & Slips',
      'Dupatta',
      'Nighties'
    ]
  },
  {
    group: 'Jewels',
    items: [
      'Long Chains',
      'Neck Set',
      'Haram',
      'Anklet',
      'Ring',
      'Stud',
      'Jhumkas',
      'Bracelets',
      'Bangles'
    ]
  },
  {
    group: 'Fancy & Cosmetics',
    items: [
      'Hair Accessories',
      'Choker',
      'Lipstick',
      'Eyeliner',
      'Kajal',
      'Eyebrow Pencil',
      'Mascara',
      'Nail Polish',
      'Nail Polish Remover',
      'Bindi'
    ]
  }
];

export const ALL_CATEGORIES = CATEGORY_GROUPS.flatMap(g => g.items);

const FABRIC_PRESETS = [
  'Pure Soft Silk',
  'Semi Silk with Zari',
  'Malmal Cotton',
  'Kanchi Cotton',
  'Kalyani Cotton',
  'Ambika Cotton',
  'Linen Cotton',
  'Pure Tussar Silk',
  'Art Silk',
  'Cora Cotton',
  'Synthetic Crepe',
  '100% Breathable Cotton',
  'Cotton Lycra Stretch',
  'Brocade Silk'
];

const SIZE_PRESETS = [
  'Free Size',
  '34 (XS/S)',
  '36 (S)',
  '38 (M)',
  '40 (L)',
  '42 (XL)',
  '44 (XXL)',
  'Custom Tailored',
  'Standard Size'
];

const COLOR_PRESETS = [
  'Royal Crimson Red',
  'Rani Pink / Rose',
  'Peacock Blue / Teal',
  'Deep Gold / Zari',
  'Wine Violet / Plum',
  'Mustard Yellow',
  'Bottle Green',
  'Pastel Sage',
  'Antique Gold',
  'Jet Black'
];

const Admin = () => {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [adminUser, setAdminUser] = useState(null);
  const [loginIdentifier, setLoginIdentifier] = useState('admin@sindujaboutique.com');
  const [loginPassword, setLoginPassword] = useState('sinduja@admin2025');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginSubmitting, setLoginSubmitting] = useState(false);

  // Dashboard Navigation State
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [settings, setSettings] = useState(BUSINESS_CONFIG);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [statusType, setStatusType] = useState('success');

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all'); // 'all' | 'in-stock' | 'out-of-stock'

  // Edit Product Modal State
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState(null);

  // New Product Form State
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Soft Silk Sarees',
    description: '',
    price: '₹2,499',
    originalPrice: '₹3,200',
    quantity: 1,
    stockStatus: 'In Stock',
    images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'],
    material: 'Pure Soft Silk Blend',
    sizes: ['Free Size (Includes Blouse Piece)'],
    colors: ['Wine Violet', 'Rose Pink'],
    customizable: true,
    available: true,
    newArrival: true,
    featured: true
  });

  const [newImageInputUrl, setNewImageInputUrl] = useState('');
  const fileInputRef = useRef(null);
  const editFileInputRef = useRef(null);
  const galleryFileInputRef = useRef(null);

  // New Gallery Item State
  const [newGallery, setNewGallery] = useState({
    title: '',
    image: '',
    category: 'Sarees',
    caption: ''
  });

  // Password Change State
  const [pwdForm, setPwdForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    newName: 'Sinduja (Atelier Owner)',
    newEmail: 'admin@sindujaboutique.com'
  });
  const [pwdMsg, setPwdMsg] = useState('');

  // 1. Initial Authentication Check
  useEffect(() => {
    const checkAuth = async () => {
      setAuthLoading(true);
      try {
        const res = await verifyAdminSession();
        if (res.valid) {
          setIsAuthenticated(true);
          setAdminUser(res.admin || { name: 'Sinduja (Owner)', email: 'admin@sindujaboutique.com' });
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setAuthLoading(false);
      }
    };
    checkAuth();
  }, []);

  // 2. Load dashboard data
  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [prodData, galData, settsData, enqData] = await Promise.all([
        getProducts(),
        getGallery(),
        getSettings(),
        getEnquiries()
      ]);
      setProducts(prodData || []);
      setGallery(galData || []);
      if (settsData) setSettings(settsData);
      setEnquiries(enqData || []);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData();
    }
  }, [isAuthenticated]);

  const notify = (msg, type = 'success') => {
    setStatusMsg(msg);
    setStatusType(type);
    setTimeout(() => setStatusMsg(''), 4000);
  };

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginSubmitting(true);
    try {
      const res = await adminLogin(loginIdentifier, loginPassword);
      if (res.success) {
        setIsAuthenticated(true);
        setAdminUser(res.admin);
        notify(`Welcome back, ${res.admin?.name || 'Sinduja'}!`);
      }
    } catch (err) {
      setLoginError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoginSubmitting(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out of the Boutique Management Portal?')) {
      adminLogout();
      setIsAuthenticated(false);
      setAdminUser(null);
    }
  };

  const handleQuickDemoLogin = () => {
    setLoginIdentifier('admin@sindujaboutique.com');
    setLoginPassword('sinduja@admin2025');
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageFileUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      const uploadedUrls = [];
      for (let i = 0; i < files.length; i++) {
        const base64 = await fileToBase64(files[i]);
        uploadedUrls.push(base64);
      }
      setNewProduct(prev => ({
        ...prev,
        images: [...uploadedUrls, ...prev.images]
      }));
      notify(`Added ${uploadedUrls.length} photo(s) to dress preview!`);
    } catch (err) {
      alert('Error reading uploaded image file. Please try another photo.');
    }
  };

  const handleAddImageUrl = () => {
    if (!newImageInputUrl.trim()) return;
    setNewProduct(prev => ({
      ...prev,
      images: [newImageInputUrl.trim(), ...prev.images]
    }));
    setNewImageInputUrl('');
  };

  const handleRemoveNewProductImage = (index) => {
    setNewProduct(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  // Create Product
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.description) {
      alert('Please fill out Product Name and Description');
      return;
    }

    if (newProduct.images.length === 0) {
      alert('Please add or upload at least one product photo.');
      return;
    }

    try {
      const qty = newProduct.quantity !== undefined && newProduct.quantity !== ''
        ? Math.max(0, parseInt(newProduct.quantity, 10) || 0)
        : 1;
      const isOut = qty === 0 || newProduct.stockStatus === 'Out of Stock';

      const payload = {
        name: newProduct.name,
        category: newProduct.category,
        description: newProduct.description,
        price: newProduct.price || 'Price on Enquiry',
        originalPrice: newProduct.originalPrice || '',
        quantity: qty,
        stockStatus: isOut ? 'Out of Stock' : (newProduct.stockStatus || 'In Stock'),
        images: newProduct.images,
        sizes: newProduct.sizes,
        colors: newProduct.colors,
        material: newProduct.material,
        customizable: newProduct.customizable,
        available: !isOut,
        newArrival: newProduct.newArrival,
        featured: newProduct.featured
      };

      await createProduct(payload);
      notify(`"${newProduct.name}" published with ${qty} unit(s) in inventory!`);
      
      setNewProduct({
        name: '',
        category: 'Soft Silk Sarees',
        description: '',
        price: '₹2,499',
        originalPrice: '',
        quantity: 1,
        stockStatus: 'In Stock',
        images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'],
        material: 'Pure Soft Silk Blend',
        sizes: ['Free Size (Includes Blouse Piece)'],
        colors: ['Wine Violet'],
        customizable: true,
        available: true,
        newArrival: true,
        featured: true
      });
      loadDashboardData();
      setActiveTab('products');
    } catch (err) {
      alert(err.message || 'Error publishing product to store');
    }
  };

  const handleDeleteProduct = async (id, name) => {
    if (!window.confirm(`Are you sure you want to remove "${name || 'this item'}" from the catalog?`)) return;
    try {
      await deleteProduct(id);
      notify('Item removed from store catalog.');
      loadDashboardData();
    } catch (err) {
      alert('Error deleting item');
    }
  };

  const handleToggleStock = async (product) => {
    const isCurrentlyOut = product.stockStatus === 'Out of Stock' || product.quantity === 0 || product.available === false;
    const newStatus = isCurrentlyOut ? 'In Stock' : 'Out of Stock';
    const isAvail = !isCurrentlyOut ? false : true;
    const newQty = isCurrentlyOut ? (product.quantity > 0 ? product.quantity : 10) : 0;
    try {
      await updateProduct(product._id || product.id, {
        quantity: newQty,
        stockStatus: newStatus,
        available: isAvail
      });
      notify(`"${product.name}" marked as ${newStatus} (${newQty} units)`);
      loadDashboardData();
    } catch (err) {
      alert('Error updating stock status');
    }
  };

  const handleQuickAddQty = async (product, amountToAdd) => {
    const current = product.quantity !== undefined ? parseInt(product.quantity, 10) : 0;
    const newQty = Math.max(0, current + amountToAdd);
    const isOut = newQty === 0;
    try {
      await updateProduct(product._id || product.id, {
        quantity: newQty,
        stockStatus: isOut ? 'Out of Stock' : 'In Stock',
        available: !isOut
      });
      notify(isOut ? `"${product.name}" marked Out of Stock (0 units)` : `Restocked "${product.name}" (+${amountToAdd} units, now ${newQty})!`);
      loadDashboardData();
    } catch (err) {
      alert('Error updating quantity');
    }
  };

  const handleSetProductQuantity = async (product, targetQty) => {
    const newQty = Math.max(0, parseInt(targetQty, 10) || 0);
    const isOut = newQty === 0;
    try {
      await updateProduct(product._id || product.id, {
        quantity: newQty,
        stockStatus: isOut ? 'Out of Stock' : 'In Stock',
        available: !isOut
      });
      notify(isOut ? `"${product.name}" marked Out of Stock` : `Inventory for "${product.name}" updated to ${newQty} units!`);
      loadDashboardData();
    } catch (err) {
      alert('Error updating stock quantity');
    }
  };

  const handleToggleFeatured = async (product) => {
    try {
      await updateProduct(product._id || product.id, {
        featured: !product.featured
      });
      notify(`"${product.name}" ${!product.featured ? 'marked as Featured' : 'removed from Featured'}`);
      loadDashboardData();
    } catch (err) {
      alert('Error updating featured flag');
    }
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setEditForm({
      id: product._id || product.id,
      name: product.name,
      category: product.category,
      price: product.price || '',
      originalPrice: product.originalPrice || '',
      quantity: product.quantity !== undefined ? product.quantity : (product.stockStatus === 'Out of Stock' ? 0 : 10),
      stockStatus: product.stockStatus || (product.available === false ? 'Out of Stock' : 'In Stock'),
      material: product.material || '',
      description: product.description || '',
      images: product.images && product.images.length ? [...product.images] : ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'],
      sizes: product.sizes && Array.isArray(product.sizes) ? [...product.sizes] : ['Free Size'],
      colors: product.colors && Array.isArray(product.colors) ? [...product.colors] : ['As Shown'],
      customizable: product.customizable !== undefined ? product.customizable : true,
      newArrival: !!product.newArrival,
      featured: !!product.featured
    });
  };

  const handleSaveEditProduct = async (e) => {
    e.preventDefault();
    if (!editForm.name || !editForm.description) {
      alert('Name and Description are required.');
      return;
    }

    try {
      const editQty = editForm.quantity !== undefined && editForm.quantity !== ''
        ? Math.max(0, parseInt(editForm.quantity, 10) || 0)
        : 0;
      const isOut = editQty === 0 || editForm.stockStatus === 'Out of Stock';

      await updateProduct(editForm.id, {
        name: editForm.name,
        category: editForm.category,
        price: editForm.price,
        originalPrice: editForm.originalPrice,
        quantity: editQty,
        stockStatus: isOut ? 'Out of Stock' : (editForm.stockStatus || 'In Stock'),
        available: !isOut,
        material: editForm.material,
        description: editForm.description,
        images: editForm.images,
        sizes: editForm.sizes,
        colors: editForm.colors,
        customizable: editForm.customizable,
        newArrival: editForm.newArrival,
        featured: editForm.featured
      });
      notify(`"${editForm.name}" updated with ${editQty} unit(s) in stock!`);
      setEditingProduct(null);
      setEditForm(null);
      loadDashboardData();
    } catch (err) {
      alert('Error saving edits: ' + (err.message || 'Server error'));
    }
  };

  const handleEditImageUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    try {
      const urls = [];
      for (let i = 0; i < files.length; i++) {
        const b64 = await fileToBase64(files[i]);
        urls.push(b64);
      }
      setEditForm(prev => ({
        ...prev,
        images: [...urls, ...prev.images]
      }));
    } catch (err) {
      alert('Error uploading photo');
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      await updateSettings(settings);
      notify('Boutique information updated across the store!');
    } catch (err) {
      alert('Error updating settings');
    }
  };

  const handleEnquiryStatusChange = async (id, status) => {
    try {
      await updateEnquiryStatus(id, status);
      notify(`Enquiry marked as "${status}"`);
      loadDashboardData();
    } catch (err) {
      alert('Error updating enquiry status');
    }
  };

  const handleDeleteEnquiry = async (id) => {
    if (!window.confirm('Delete this customer enquiry record?')) return;
    try {
      await deleteEnquiry(id);
      notify('Enquiry deleted.');
      loadDashboardData();
    } catch (err) {
      alert('Error deleting enquiry');
    }
  };

  const handleCreateGallery = async (e) => {
    e.preventDefault();
    if (!newGallery.title || !newGallery.image) {
      alert('Please provide title and an image');
      return;
    }
    try {
      await createGalleryItem(newGallery);
      notify('Photo added to Boutique Gallery!');
      setNewGallery({ title: '', image: '', category: 'Sarees', caption: '' });
      loadDashboardData();
    } catch (err) {
      alert('Error adding gallery photo');
    }
  };

  const handleDeleteGallery = async (id) => {
    if (!window.confirm('Delete this gallery photo?')) return;
    try {
      await deleteGalleryItem(id);
      notify('Gallery photo removed.');
      loadDashboardData();
    } catch (err) {
      alert('Error removing gallery photo');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPwdMsg('');
    if (pwdForm.newPassword && pwdForm.newPassword !== pwdForm.confirmPassword) {
      setPwdMsg('New passwords do not match!');
      return;
    }
    try {
      await updateAdminPassword({
        currentPassword: pwdForm.currentPassword,
        newPassword: pwdForm.newPassword,
        newEmail: pwdForm.newEmail,
        newName: pwdForm.newName
      });
      notify('Owner login details updated successfully!');
      setPwdForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        newName: pwdForm.newName,
        newEmail: pwdForm.newEmail
      });
    } catch (err) {
      setPwdMsg(err.message || 'Error updating password');
    }
  };

  // Inventory Stock Calculations
  const outOfStockProducts = products.filter(p => p.quantity === 0 || p.stockStatus === 'Out of Stock' || p.available === false);
  const inStockProducts = products.filter(p => (p.quantity === undefined || p.quantity > 0) && p.stockStatus !== 'Out of Stock' && p.available !== false);

  // Filtered Products
  const filteredProducts = products.filter(p => {
    const isOut = p.quantity === 0 || p.stockStatus === 'Out of Stock' || p.available === false;
    if (stockFilter === 'in-stock' && isOut) return false;
    if (stockFilter === 'out-of-stock' && !isOut) return false;

    const matchesSearch = searchQuery === '' || 
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.material?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategoryFilter === 'all' || 
      p.category?.toLowerCase() === selectedCategoryFilter.toLowerCase() ||
      p.categorySlug === selectedCategoryFilter;

    return matchesSearch && matchesCategory;
  });

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-boutique-berry border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="font-serif text-lg text-boutique-charcoal">Loading Boutique Owner Portal...</p>
        </div>
      </div>
    );
  }

  // --- LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFF8F8] via-[#FAF4EE] to-[#F3EBE1] py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <SEO title="Boutique Owner Login | Sinduja Boutique" />

        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-boutique-berry text-white shadow-xl mb-4 transform hover:scale-105 transition-transform">
              <Lock className="w-9 h-9" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-boutique-berry bg-boutique-blushMedium/70 px-4 py-1.5 rounded-full inline-block">
              Atelier Management Portal
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-boutique-charcoal mt-3">
              Sinduja Boutique
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm mt-1 max-w-xs mx-auto">
              Owner control center to manage Sarees, Outfits, Jewels, Fancy items & customer leads.
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 sm:p-10 shadow-2xl border border-boutique-blushMedium/60">
            {loginError && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center shadow-sm">
                <AlertCircle className="w-4 h-4 mr-2 text-rose-600 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="text-xs font-bold text-boutique-charcoal uppercase tracking-wider block mb-1.5">
                  Owner Email / Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="admin@sindujaboutique.com or admin"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-boutique-berry focus:ring-2 focus:ring-boutique-blush transition-all"
                  />
                  <User className="w-4 h-4 text-gray-400 absolute right-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-boutique-charcoal uppercase tracking-wider block mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-boutique-berry focus:ring-2 focus:ring-boutique-blush transition-all pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-gray-400 hover:text-boutique-berry transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loginSubmitting}
                className="w-full py-3.5 rounded-full bg-boutique-berry hover:bg-boutique-deepRose text-white font-bold text-xs uppercase tracking-widest transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 disabled:opacity-70"
              >
                {loginSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Enter Owner Portal</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 bg-[#FCF8F5] -mx-4 -mb-4 p-4 rounded-2xl border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-boutique-berry flex items-center">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                  Default Owner Access
                </span>
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="text-[11px] font-bold text-boutique-berry hover:underline flex items-center"
                >
                  Fill Credentials
                </button>
              </div>
              <div className="text-[11px] text-gray-600 font-mono space-y-1 bg-white p-2.5 rounded-xl border border-gray-200">
                <p>Email: <span className="font-semibold text-gray-900">admin@sindujaboutique.com</span></p>
                <p>Password: <span className="font-semibold text-gray-900">sinduja@admin2025</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- DASHBOARD ---
  return (
    <div className="bg-[#F8F9FA] min-h-screen py-8 pb-20">
      <SEO title="Boutique Owner Portal | Sinduja Boutique" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-boutique-blushMedium/80 shadow-md mb-6 sm:mb-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center space-x-3.5 sm:space-x-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-boutique-berry to-boutique-rose flex items-center justify-center text-white shadow-lg flex-shrink-0 font-serif text-xl sm:text-2xl font-bold">
              SB
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.25em] text-boutique-berry bg-boutique-blushMedium/80 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full">
                  Atelier Control Center
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse"></span>
                  Store Live
                </span>
              </div>
              <h1 className="font-serif text-xl sm:text-3xl font-bold text-boutique-charcoal mt-1">
                Sinduja Boutique Management
              </h1>
              <p className="text-gray-500 text-xs sm:text-sm font-light">
                Logged in as <span className="font-semibold text-gray-800">{adminUser?.name || 'Sinduja'}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none flex items-center justify-center space-x-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Store</span>
            </a>

            <button
              onClick={loadDashboardData}
              className="flex items-center justify-center space-x-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-boutique-blush text-boutique-berry hover:bg-boutique-blushMedium text-xs font-semibold transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center justify-center space-x-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-semibold transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Alert Banner */}
        {statusMsg && (
          <div className={`mb-6 p-4 rounded-2xl border text-xs font-semibold flex items-center shadow-md animate-fade-in ${
            statusType === 'error'
              ? 'bg-rose-50 border-rose-200 text-rose-800'
              : 'bg-emerald-50 border-emerald-200 text-emerald-800'
          }`}>
            <CheckCircle className="w-4 h-4 mr-2 text-emerald-600 flex-shrink-0" />
            <span>{statusMsg}</span>
          </div>
        )}

        {/* Tabs */}
        <div className="flex items-center space-x-2 border-b border-gray-200 pb-3 mb-6 sm:mb-8 overflow-x-auto scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap ${
              activeTab === 'products'
                ? 'bg-boutique-berry text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Manage Catalog ({products.length})</span>
          </button>

          {/* Dedicated Out of Stock Tab */}
          <button
            onClick={() => setActiveTab('out-of-stock')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap relative ${
              activeTab === 'out-of-stock'
                ? 'bg-rose-700 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-rose-50 hover:text-rose-700'
            }`}
          >
            <AlertTriangle className={`w-4 h-4 ${activeTab === 'out-of-stock' ? 'text-white' : 'text-rose-600'}`} />
            <span>Out of Stock</span>
            {outOfStockProducts.length > 0 && (
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === 'out-of-stock' ? 'bg-white/20 text-white' : 'bg-rose-100 text-rose-800 border border-rose-300'
              }`}>
                {outOfStockProducts.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('add-product')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap ${
              activeTab === 'add-product'
                ? 'bg-boutique-berry text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>+ Upload New Item</span>
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap relative ${
              activeTab === 'enquiries'
                ? 'bg-boutique-berry text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Customer Leads ({enquiries.length})</span>
            {enquiries.filter(e => e.status === 'New').length > 0 && (
              <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-2 right-2 animate-ping"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap ${
              activeTab === 'gallery'
                ? 'bg-boutique-berry text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Lookbook Gallery ({gallery.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-boutique-berry text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Store Settings & Security</span>
          </button>
        </div>

        {/* --- TAB 1: PRODUCTS LIST --- */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-boutique-charcoal">
                  Showroom Catalog ({products.length} Items)
                </h2>
                <p className="text-xs text-gray-500">
                  Sarees, Outfits, Jewels & Fancy items displayed on your digital showroom.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('add-product')}
                className="px-5 py-2.5 rounded-full bg-boutique-berry text-white text-xs font-bold uppercase tracking-wider hover:bg-boutique-deepRose transition-colors shadow-md flex items-center space-x-1.5 self-start md:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Upload New Item</span>
              </button>
            </div>

            {/* Filter and Search Bar with Optgroups */}
            {/* Filter and Search Bar with Optgroups */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <div className="relative flex-grow">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search by name, fabric, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-boutique-rose"
                />
              </div>

              <div className="sm:w-72">
                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-boutique-rose bg-white font-medium"
                >
                  <option value="all">All Categories ({products.length})</option>
                  {CATEGORY_GROUPS.map((grp) => (
                    <optgroup key={grp.group} label={`── ${grp.group} ──`}>
                      {grp.items.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick Stock Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-gray-100">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mr-1">
                Filter Stock:
              </span>
              <button
                type="button"
                onClick={() => setStockFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  stockFilter === 'all'
                    ? 'bg-boutique-berry text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Items ({products.length})
              </button>
              <button
                type="button"
                onClick={() => setStockFilter('in-stock')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  stockFilter === 'in-stock'
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                In Stock ({inStockProducts.length})
              </button>
              <button
                type="button"
                onClick={() => setStockFilter('out-of-stock')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                  stockFilter === 'out-of-stock'
                    ? 'bg-rose-700 text-white shadow-sm'
                    : 'bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                <span>Out of Stock ({outOfStockProducts.length})</span>
              </button>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="font-serif text-lg font-bold text-gray-700">No products found</h3>
                <p className="text-xs text-gray-500 mt-1">Try adjusting your category filter, stock status, or search query.</p>
                <button
                  onClick={() => { setSelectedCategoryFilter('all'); setStockFilter('all'); setSearchQuery(''); }}
                  className="mt-4 px-4 py-2 rounded-full bg-boutique-berry text-white text-xs font-semibold"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((p) => {
                  const id = p._id || p.id;
                  const isOutOfStock = p.quantity === 0 || p.stockStatus === 'Out of Stock' || p.available === false;
                  const currentUnits = p.quantity !== undefined ? p.quantity : 10;

                  return (
                    <div 
                      key={id} 
                      className={`rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col justify-between ${
                        isOutOfStock ? 'bg-gray-50 border-rose-200 opacity-90' : 'bg-white border-gray-200 hover:shadow-lg hover:border-boutique-blushMedium'
                      }`}
                    >
                      <div>
                        <div className="relative h-56 bg-gray-100 overflow-hidden group">
                          <img
                            src={p.images?.[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80'}
                            alt={p.name}
                            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${isOutOfStock ? 'grayscale-[20%]' : ''}`}
                          />
                          
                          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-boutique-berry px-2.5 py-1 rounded-full shadow-sm">
                              {p.category}
                            </span>
                            {p.featured && (
                              <span className="text-[9px] font-bold uppercase tracking-wider bg-amber-500 text-white px-2 py-0.5 rounded-full shadow-sm flex items-center">
                                <Sparkles className="w-2.5 h-2.5 mr-1" /> Featured
                              </span>
                            )}
                          </div>

                          <div className="absolute top-2.5 right-2.5">
                            <button
                              onClick={() => handleToggleStock(p)}
                              className={`text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm transition-all ${
                                isOutOfStock 
                                  ? 'bg-rose-600 text-white' 
                                  : 'bg-emerald-600 text-white'
                              }`}
                              title="Click to toggle In Stock / Out of Stock"
                            >
                              {isOutOfStock ? 'Out of Stock' : `In Stock (${currentUnits})`}
                            </button>
                          </div>
                        </div>

                        <div className="p-4 space-y-2">
                          <h4 className="font-serif text-base font-bold text-boutique-charcoal line-clamp-1">
                            {p.name}
                          </h4>

                          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                            {p.description}
                          </p>

                          <div className="flex items-center justify-between pt-1">
                            <div>
                              <span className="text-sm font-bold text-boutique-berry">
                                {p.price || 'Price on Enquiry'}
                              </span>
                              {p.originalPrice && (
                                <span className="text-xs text-gray-400 line-through ml-2">
                                  {p.originalPrice}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                              {p.material || 'Premium'}
                            </span>
                          </div>

                          {/* Inventory Status Bar with Quick Restock Stepper */}
                          <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                            <div className="flex items-center space-x-1.5">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Stock:</span>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                isOutOfStock 
                                  ? 'bg-rose-100 text-rose-800 border border-rose-200' 
                                  : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              }`}>
                                {isOutOfStock ? '0 (Out of Stock)' : `${currentUnits} Units`}
                              </span>
                            </div>

                            <div className="flex items-center space-x-1">
                              <button
                                type="button"
                                onClick={() => handleQuickAddQty(p, -1)}
                                disabled={currentUnits <= 0}
                                className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs flex items-center justify-center disabled:opacity-30 transition-all active:scale-95"
                                title="Reduce stock by 1 unit"
                              >
                                -
                              </button>
                              <button
                                type="button"
                                onClick={() => handleQuickAddQty(p, 1)}
                                className="w-6 h-6 rounded bg-boutique-blush hover:bg-boutique-blushMedium text-boutique-berry font-bold text-xs flex items-center justify-center transition-all active:scale-95"
                                title="Add 1 unit"
                              >
                                +
                              </button>
                              <button
                                type="button"
                                onClick={() => handleQuickAddQty(p, 5)}
                                className="px-1.5 py-0.5 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-[10px] border border-emerald-200 transition-all active:scale-95"
                                title="Restock +5 units"
                              >
                                +5
                              </button>
                            </div>
                          </div>

                          {p.sizes && p.sizes.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-1">
                              {p.sizes.slice(0, 3).map((s, idx) => (
                                <span key={idx} className="text-[9px] bg-boutique-blush/80 text-boutique-berry px-1.5 py-0.5 rounded">
                                  {s}
                                </span>
                              ))}
                              {p.sizes.length > 3 && (
                                <span className="text-[9px] text-gray-400">+{p.sizes.length - 3}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-2">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => openEditModal(p)}
                            className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-boutique-charcoal hover:bg-boutique-blush hover:text-boutique-berry text-xs font-semibold flex items-center space-x-1 shadow-sm transition-colors"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-boutique-berry" />
                            <span>Edit</span>
                          </button>

                          <button
                            onClick={() => handleToggleFeatured(p)}
                            className={`p-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                              p.featured ? 'bg-amber-50 border-amber-300 text-amber-700' : 'bg-white border-gray-200 text-gray-400 hover:text-amber-600'
                            }`}
                            title="Toggle Featured"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center space-x-1">
                          <a
                            href={`/products/${p.slug || id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-boutique-berry"
                            title="Preview on website"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>

                          <button
                            onClick={() => handleDeleteProduct(id, p.name)}
                            className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                            title="Delete item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* --- DEDICATED OUT OF STOCK SECTION --- */}
        {activeTab === 'out-of-stock' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-200 flex items-center">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Automatic Sold-Out Inventory
                  </span>
                  <span className="text-xs text-gray-400">|</span>
                  <span className="text-xs font-semibold text-rose-600">
                    {outOfStockProducts.length} items currently out of stock
                  </span>
                </div>
                <h2 className="font-serif text-2xl font-bold text-boutique-charcoal mt-2">
                  Out of Stock Products
                </h2>
                <p className="text-xs text-gray-500">
                  Products automatically appear here when all material units are sold. Restock or edit their quantity below to immediately restore them to your showroom.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('products')}
                  className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition-colors"
                >
                  View All Products ({products.length})
                </button>
                <button
                  onClick={() => setActiveTab('add-product')}
                  className="px-4 py-2 rounded-xl bg-boutique-berry text-white hover:bg-boutique-deepRose text-xs font-bold transition-colors"
                >
                  + Upload New Product
                </button>
              </div>
            </div>

            {outOfStockProducts.length === 0 ? (
              <div className="text-center py-16 bg-emerald-50/50 rounded-2xl border border-dashed border-emerald-200">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <h3 className="font-serif text-lg font-bold text-emerald-900">
                  All Boutique Items are in Stock!
                </h3>
                <p className="text-xs text-emerald-700 mt-1 max-w-md mx-auto">
                  Zero items are currently sold out. When customer purchases drop any product's stock to 0 units, it will automatically appear here for restock.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {outOfStockProducts.map((p) => {
                  const id = p._id || p.id;
                  return (
                    <div 
                      key={id}
                      className="rounded-2xl border border-rose-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative h-48 bg-gray-100 overflow-hidden">
                          <img
                            src={p.images?.[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80'}
                            alt={p.name}
                            className="w-full h-full object-cover grayscale-[30%]"
                          />
                          <div className="absolute top-2.5 left-2.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-600 text-white px-2.5 py-1 rounded-full shadow-sm">
                              Out of Stock (0 Units)
                            </span>
                          </div>
                          <div className="absolute bottom-2 left-2.5">
                            <span className="text-[10px] font-semibold bg-white/90 backdrop-blur-sm text-boutique-charcoal px-2 py-0.5 rounded shadow-sm">
                              {p.category}
                            </span>
                          </div>
                        </div>

                        <div className="p-4 space-y-2">
                          <h4 className="font-serif text-base font-bold text-boutique-charcoal line-clamp-1">
                            {p.name}
                          </h4>
                          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                            {p.description}
                          </p>
                          <div className="flex items-center justify-between text-xs pt-1">
                            <span className="font-bold text-boutique-berry">{p.price}</span>
                            <span className="text-gray-400">{p.material || 'Standard Fabric'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Quick Restock Action Section */}
                      <div className="p-4 bg-rose-50/60 border-t border-rose-100 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-rose-900 uppercase tracking-wider">
                            Restock Inventory:
                          </span>
                          <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            1-Click Restock
                          </span>
                        </div>

                        <div className="grid grid-cols-4 gap-1.5">
                          {[1, 5, 10, 20].map((qtyToAdd) => (
                            <button
                              key={qtyToAdd}
                              type="button"
                              onClick={() => handleQuickAddQty(p, qtyToAdd)}
                              className="py-1.5 px-2 rounded-lg bg-white border border-rose-200 text-rose-800 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 text-xs font-bold transition-all shadow-sm active:scale-95 text-center"
                            >
                              +{qtyToAdd} Qty
                            </button>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 pt-1 border-t border-rose-100">
                          <button
                            type="button"
                            onClick={() => openEditModal(p)}
                            className="flex-1 py-1.5 px-3 rounded-lg bg-boutique-berry hover:bg-boutique-plum text-white text-xs font-semibold flex items-center justify-center gap-1 shadow-sm transition-all"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit Full Details / Custom Qty</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(id, p.name)}
                            className="p-1.5 rounded-lg bg-white border border-rose-200 text-rose-600 hover:bg-rose-100"
                            title="Delete item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* --- TAB 2: UPLOAD NEW ITEM --- */}
        {activeTab === 'add-product' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-md max-w-4xl mx-auto">
            <div className="border-b border-gray-100 pb-5 mb-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-boutique-berry bg-boutique-blushMedium/60 px-3 py-1 rounded-full">
                New Inventory
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-boutique-charcoal mt-2">
                Upload New Item to Boutique
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                Upload photos, select category (Sarees, Outfits, Jewels, or Fancy), set price and details.
              </p>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-6">
              
              {/* Photo Upload Section */}
              <div className="bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-300">
                <label className="text-xs font-bold text-boutique-charcoal uppercase block mb-2">
                  Photos * (Upload from Computer/Phone or paste URL)
                </label>

                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageFileUpload}
                    multiple
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2.5 rounded-xl bg-boutique-berry text-white hover:bg-boutique-deepRose text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shadow-sm transition-all"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Upload Photos from Device</span>
                  </button>

                  <span className="text-xs text-gray-400 font-semibold">OR</span>

                  <div className="flex items-center gap-2 flex-grow max-w-md">
                    <input
                      type="url"
                      placeholder="Paste Image URL..."
                      value={newImageInputUrl}
                      onChange={(e) => setNewImageInputUrl(e.target.value)}
                      className="px-3 py-2 rounded-xl border border-gray-300 text-xs flex-grow focus:outline-none focus:border-boutique-rose"
                    />
                    <button
                      type="button"
                      onClick={handleAddImageUrl}
                      className="px-3 py-2 rounded-xl bg-gray-200 text-gray-700 text-xs font-bold hover:bg-gray-300"
                    >
                      Add URL
                    </button>
                  </div>
                </div>

                {newProduct.images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 pt-2">
                    {newProduct.images.map((img, idx) => (
                      <div key={idx} className="relative group rounded-xl overflow-hidden aspect-[3/4] border border-gray-200 bg-white">
                        <img src={img} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveNewProductImage(idx)}
                          className="absolute top-1 right-1 p-1 rounded-full bg-rose-600 text-white opacity-90 hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        {idx === 0 && (
                          <span className="absolute bottom-1 left-1 text-[8px] bg-black/70 text-white px-1.5 py-0.5 rounded font-bold uppercase">
                            Primary
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Title & Category with Optgroups */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-bold text-boutique-charcoal uppercase block mb-1">
                    Item Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Soft Silk Saree with Copper Zari / Antique Lakshmi Haram"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-boutique-rose"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-boutique-charcoal uppercase block mb-1">
                    Boutique Category *
                  </label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-boutique-rose bg-white font-medium"
                  >
                    {CATEGORY_GROUPS.map((grp) => (
                      <optgroup key={grp.group} label={`── ${grp.group} ──`}>
                        {grp.items.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price, Quantity & MRP */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="text-xs font-bold text-boutique-charcoal uppercase block mb-1">
                    Display Price *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ₹2,499 or ₹699"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-boutique-rose"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-boutique-charcoal uppercase block mb-1">
                    Original Price / MRP (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ₹3,200 (shows strikethrough)"
                    value={newProduct.originalPrice}
                    onChange={(e) => setNewProduct({ ...newProduct, originalPrice: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-boutique-rose"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-boutique-charcoal uppercase block mb-1">
                    Stock Quantity (Units) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    placeholder="e.g. 5 or 10"
                    value={newProduct.quantity !== undefined ? newProduct.quantity : 1}
                    onChange={(e) => {
                      const q = Math.max(0, parseInt(e.target.value, 10) || 0);
                      setNewProduct({
                        ...newProduct,
                        quantity: q,
                        stockStatus: q === 0 ? 'Out of Stock' : (newProduct.stockStatus === 'Out of Stock' ? 'In Stock' : newProduct.stockStatus)
                      });
                    }}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-boutique-rose"
                  />
                  <span className="text-[10px] text-gray-500 mt-1 block">
                    {newProduct.quantity === 0 ? '⚠️ Automatically Out of Stock' : `${newProduct.quantity || 1} available unit(s)`}
                  </span>
                </div>

                <div>
                  <label className="text-xs font-bold text-boutique-charcoal uppercase block mb-1">
                    Stock Availability
                  </label>
                  <select
                    value={newProduct.stockStatus}
                    onChange={(e) => {
                      const val = e.target.value;
                      setNewProduct({
                        ...newProduct,
                        stockStatus: val,
                        quantity: val === 'Out of Stock' ? 0 : (newProduct.quantity || 1)
                      });
                    }}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-boutique-rose bg-white"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Made to Order">Made to Order</option>
                    <option value="Pre-Order">Pre-Order</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              {/* Material / Fabric */}
              <div>
                <label className="text-xs font-bold text-boutique-charcoal uppercase block mb-1">
                  Fabric / Material / Metal
                </label>
                <input
                  type="text"
                  placeholder="e.g. Pure Soft Silk Blend / 1-Gram Gold Plated Brass"
                  value={newProduct.material}
                  onChange={(e) => setNewProduct({ ...newProduct, material: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-boutique-rose mb-2"
                />
                <div className="flex flex-wrap gap-1.5">
                  {FABRIC_PRESETS.map((fabric) => (
                    <button
                      key={fabric}
                      type="button"
                      onClick={() => setNewProduct({ ...newProduct, material: fabric })}
                      className="text-[10px] bg-gray-100 hover:bg-boutique-blush hover:text-boutique-berry text-gray-700 px-2.5 py-1 rounded-full transition-colors"
                    >
                      + {fabric}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <label className="text-xs font-bold text-boutique-charcoal uppercase block mb-1">
                  Sizes Available
                </label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {SIZE_PRESETS.map((sz) => {
                    const isSelected = newProduct.sizes.includes(sz);
                    return (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            setNewProduct({
                              ...newProduct,
                              sizes: newProduct.sizes.filter(s => s !== sz)
                            });
                          } else {
                            setNewProduct({
                              ...newProduct,
                              sizes: [...newProduct.sizes, sz]
                            });
                          }
                        }}
                        className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all ${
                          isSelected
                            ? 'bg-boutique-berry text-white shadow-sm font-semibold'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {sz} {isSelected && '✓'}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Colors */}
              <div>
                <label className="text-xs font-bold text-boutique-charcoal uppercase block mb-1">
                  Available Colors
                </label>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {COLOR_PRESETS.map((col) => {
                    const isSelected = newProduct.colors.includes(col);
                    return (
                      <button
                        key={col}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            setNewProduct({
                              ...newProduct,
                              colors: newProduct.colors.filter(c => c !== col)
                            });
                          } else {
                            setNewProduct({
                              ...newProduct,
                              colors: [...newProduct.colors, col]
                            });
                          }
                        }}
                        className={`text-[11px] px-2.5 py-1 rounded-full border transition-all ${
                          isSelected
                            ? 'bg-boutique-rose/20 border-boutique-berry text-boutique-berry font-bold'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        {col} {isSelected && '✓'}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-bold text-boutique-charcoal uppercase block mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows="4"
                  placeholder="Details regarding drape, zari finish, stone quality, matching instructions, or styling advice..."
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-boutique-rose"
                ></textarea>
              </div>

              {/* Feature Toggles */}
              <div className="bg-boutique-blush/30 p-4 rounded-2xl border border-boutique-blushMedium flex flex-wrap gap-6">
                <label className="flex items-center space-x-2 text-xs font-bold text-boutique-charcoal cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newProduct.customizable}
                    onChange={(e) => setNewProduct({ ...newProduct, customizable: e.target.checked })}
                    className="rounded text-boutique-berry focus:ring-boutique-pink w-4 h-4"
                  />
                  <span>Custom Stitching / Alteration Available</span>
                </label>

                <label className="flex items-center space-x-2 text-xs font-bold text-boutique-charcoal cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newProduct.newArrival}
                    onChange={(e) => setNewProduct({ ...newProduct, newArrival: e.target.checked })}
                    className="rounded text-boutique-berry focus:ring-boutique-pink w-4 h-4"
                  />
                  <span>Mark as "New Arrival"</span>
                </label>

                <label className="flex items-center space-x-2 text-xs font-bold text-boutique-charcoal cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newProduct.featured}
                    onChange={(e) => setNewProduct({ ...newProduct, featured: e.target.checked })}
                    className="rounded text-boutique-berry focus:ring-boutique-pink w-4 h-4"
                  />
                  <span>Feature on Store Homepage</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-boutique-berry hover:bg-boutique-deepRose text-white font-bold text-xs uppercase tracking-widest transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 mt-4"
              >
                <Plus className="w-4 h-4" />
                <span>Publish Item to Sinduja Boutique</span>
              </button>
            </form>
          </div>
        )}

        {/* --- TAB 3: CUSTOMER LEADS --- */}
        {activeTab === 'enquiries' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-boutique-charcoal">
                  Customer Enquiries & WhatsApp Leads
                </h2>
                <p className="text-xs text-gray-500">
                  Customer enquiries received through your store. One-click reply via WhatsApp.
                </p>
              </div>

              <span className="text-xs font-bold text-boutique-berry bg-boutique-blush px-3 py-1.5 rounded-full self-start sm:self-auto">
                {enquiries.length} Enquiries Total
              </span>
            </div>

            {enquiries.length === 0 ? (
              <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="font-serif text-lg font-bold text-gray-700">No customer enquiries yet</h3>
                <p className="text-xs text-gray-500 mt-1">When customers enquire about sarees or jewelry, they will appear here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {enquiries.map((enq) => {
                  const id = enq._id || enq.id;
                  const cleanPhone = enq.phone ? enq.phone.replace(/[^0-9]/g, '') : '';
                  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hello ${enq.name}, thank you for contacting Sinduja Boutique regarding "${enq.serviceInterest || 'your enquiry'}". How may we assist you today?`)}`;

                  return (
                    <div key={id} className="p-5 rounded-2xl border border-gray-200 bg-white hover:border-boutique-blushMedium shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="space-y-1.5 flex-grow">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-serif text-base font-bold text-boutique-charcoal">
                            {enq.name}
                          </h4>
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-boutique-blush text-boutique-berry px-2.5 py-0.5 rounded-full">
                            {enq.serviceInterest || 'General Enquiry'}
                          </span>
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                            enq.status === 'New' ? 'bg-rose-100 text-rose-800' :
                            enq.status === 'Contacted' ? 'bg-amber-100 text-amber-800' :
                            'bg-emerald-100 text-emerald-800'
                          }`}>
                            {enq.status || 'New'}
                          </span>
                          {enq.createdAt && (
                            <span className="text-[10px] text-gray-400">
                              {new Date(enq.createdAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-gray-700 font-medium">
                          {enq.message}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-1">
                          <a href={`tel:${enq.phone}`} className="flex items-center hover:text-boutique-berry font-medium">
                            <Phone className="w-3 h-3 mr-1 text-boutique-berry" />
                            {enq.phone}
                          </a>
                          {enq.email && (
                            <span className="text-gray-400">{enq.email}</span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0">
                        {cleanPhone && (
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 shadow-sm transition-all"
                          >
                            <Send className="w-3 h-3" />
                            <span>Reply WhatsApp</span>
                          </a>
                        )}

                        <select
                          value={enq.status || 'New'}
                          onChange={(e) => handleEnquiryStatusChange(id, e.target.value)}
                          className="px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 bg-white"
                        >
                          <option value="New">Status: New</option>
                          <option value="Contacted">Status: Contacted</option>
                          <option value="Completed">Status: Completed</option>
                        </select>

                        <button
                          onClick={() => handleDeleteEnquiry(id)}
                          className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                          title="Delete enquiry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* --- TAB 4: LOOKBOOK GALLERY --- */}
        {activeTab === 'gallery' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-8">
            <div>
              <h2 className="font-serif text-2xl font-bold text-boutique-charcoal">
                Atelier Lookbook & Gallery
              </h2>
              <p className="text-xs text-gray-500">
                Showcase saree draping, jewels, and customer styling photos.
              </p>
            </div>

            <form onSubmit={handleCreateGallery} className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-4">
              <h3 className="font-serif text-base font-bold text-boutique-charcoal">
                + Add Photo to Gallery
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-boutique-charcoal uppercase block mb-1">
                    Photo Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Soft Silk Saree Draping"
                    value={newGallery.title}
                    onChange={(e) => setNewGallery({ ...newGallery, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-boutique-rose"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-boutique-charcoal uppercase block mb-1">
                    Category Tag *
                  </label>
                  <select
                    value={newGallery.category}
                    onChange={(e) => setNewGallery({ ...newGallery, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-boutique-rose bg-white"
                  >
                    <option value="Sarees">Sarees</option>
                    <option value="Women's Wear">Women's Wear</option>
                    <option value="Jewels">Jewels</option>
                    <option value="Fancy">Fancy & Cosmetics</option>
                    <option value="Showroom">Showroom & Atelier</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-boutique-charcoal uppercase block mb-1">
                    Image URL or File *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://..."
                      value={newGallery.image}
                      onChange={(e) => setNewGallery({ ...newGallery, image: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-boutique-rose"
                    />
                    <input
                      type="file"
                      ref={galleryFileInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const b64 = await fileToBase64(file);
                          setNewGallery(prev => ({ ...prev, image: b64 }));
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => galleryFileInputRef.current?.click()}
                      className="px-3 py-2 rounded-xl bg-boutique-blush text-boutique-berry text-xs font-semibold whitespace-nowrap"
                    >
                      Browse
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-boutique-charcoal uppercase block mb-1">
                  Caption (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Pure soft silk with temple border styled for engagement"
                  value={newGallery.caption}
                  onChange={(e) => setNewGallery({ ...newGallery, caption: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-boutique-rose"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-boutique-berry text-white text-xs font-bold uppercase tracking-wider hover:bg-boutique-deepRose transition-colors shadow-sm"
              >
                + Add Photo to Gallery
              </button>
            </form>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {gallery.map((item) => {
                const id = item._id || item.id;
                return (
                  <div key={id} className="relative group rounded-2xl overflow-hidden aspect-[3/4] border border-gray-200 bg-gray-100">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 flex flex-col justify-end text-white opacity-90">
                      <span className="text-[9px] uppercase tracking-wider text-boutique-pink font-bold">
                        {item.category}
                      </span>
                      <h5 className="font-serif text-xs font-bold truncate">
                        {item.title}
                      </h5>
                    </div>
                    <button
                      onClick={() => handleDeleteGallery(id)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                      title="Delete photo"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* --- TAB 5: STORE SETTINGS & SECURITY --- */}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-boutique-berry bg-boutique-blushMedium/60 px-3 py-1 rounded-full">
                  Live Showroom Profile
                </span>
                <h2 className="font-serif text-2xl font-bold text-boutique-charcoal mt-2">
                  Boutique Information Settings
                </h2>
                <p className="text-xs text-gray-500 font-light">
                  Update phone numbers, WhatsApp, boutique address, and opening hours across the store.
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-boutique-charcoal uppercase block mb-1">
                      Primary Phone Number
                    </label>
                    <input
                      type="text"
                      value={settings.phone || ''}
                      onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-boutique-rose"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-boutique-charcoal uppercase block mb-1">
                      WhatsApp Number
                    </label>
                    <input
                      type="text"
                      value={settings.whatsapp || ''}
                      onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-boutique-rose"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-boutique-charcoal uppercase block mb-1">
                      Instagram Profile URL
                    </label>
                    <input
                      type="url"
                      value={settings.instagramUrl || settings.instagram || ''}
                      onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value, instagram: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-boutique-rose"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-boutique-charcoal uppercase block mb-1">
                      Opening Hours
                    </label>
                    <input
                      type="text"
                      value={settings.openingHours || ''}
                      onChange={(e) => setSettings({ ...settings, openingHours: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-boutique-rose"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-boutique-charcoal uppercase block mb-1">
                    Boutique Address
                  </label>
                  <textarea
                    rows="3"
                    value={settings.address || ''}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-boutique-rose"
                  ></textarea>
                </div>

                <div>
                  <label className="text-xs font-bold text-boutique-charcoal uppercase block mb-1">
                    Google Maps Link
                  </label>
                  <input
                    type="text"
                    placeholder="https://maps.google.com/..."
                    value={settings.googleMapsUrl || ''}
                    onChange={(e) => setSettings({ ...settings, googleMapsUrl: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-boutique-rose"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-boutique-berry hover:bg-boutique-deepRose text-white font-bold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save All Settings</span>
                </button>
              </form>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-boutique-berry bg-boutique-blushMedium/60 px-3 py-1 rounded-full">
                  Security & Access
                </span>
                <h2 className="font-serif text-2xl font-bold text-boutique-charcoal mt-2">
                  Change Owner Password
                </h2>
                <p className="text-xs text-gray-500 font-light">
                  Manage your boutique management password and email.
                </p>
              </div>

              {pwdMsg && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold">
                  {pwdMsg}
                </div>
              )}

              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-boutique-charcoal uppercase block mb-1">
                    Current Password *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Current password (default: sinduja@admin2025)"
                    value={pwdForm.currentPassword}
                    onChange={(e) => setPwdForm({ ...pwdForm, currentPassword: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-boutique-rose"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-boutique-charcoal uppercase block mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="New password"
                    value={pwdForm.newPassword}
                    onChange={(e) => setPwdForm({ ...pwdForm, newPassword: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-boutique-rose"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-boutique-charcoal uppercase block mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Re-enter new password"
                    value={pwdForm.confirmPassword}
                    onChange={(e) => setPwdForm({ ...pwdForm, confirmPassword: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-boutique-rose"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-boutique-charcoal hover:bg-black text-white font-bold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center space-x-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-boutique-pink" />
                    <span>Update Owner Password</span>
                  </button>
                </div>
              </form>
            </div>

          </div>
        )}

      </div>

      {/* --- EDIT PRODUCT MODAL --- */}
      {editingProduct && editForm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 my-8 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4 flex-shrink-0">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-boutique-berry">
                  Editing Showroom Item
                </span>
                <h3 className="font-serif text-xl font-bold text-boutique-charcoal">
                  Edit "{editForm.name}"
                </h3>
              </div>
              <button
                onClick={() => { setEditingProduct(null); setEditForm(null); }}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditProduct} className="space-y-4 overflow-y-auto pr-1 flex-grow">
              
              <div>
                <label className="text-xs font-bold text-boutique-charcoal uppercase block mb-1">
                  Photos ({editForm.images.length})
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {editForm.images.map((img, i) => (
                    <div key={i} className="relative w-16 h-20 rounded-lg overflow-hidden border border-gray-200">
                      <img src={img} alt="Edit preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setEditForm(prev => ({
                          ...prev,
                          images: prev.images.filter((_, idx) => idx !== i)
                        }))}
                        className="absolute top-0.5 right-0.5 bg-rose-600 text-white rounded-full p-0.5"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  ))}
                  <input
                    type="file"
                    ref={editFileInputRef}
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleEditImageUpload}
                  />
                  <button
                    type="button"
                    onClick={() => editFileInputRef.current?.click()}
                    className="w-16 h-20 rounded-lg border border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:text-boutique-berry text-[10px]"
                  >
                    <Plus className="w-4 h-4 mb-1" />
                    <span>Add</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-boutique-charcoal uppercase block mb-1">
                  Item Name *
                </label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-boutique-rose"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="text-xs font-bold text-boutique-charcoal uppercase block mb-1">
                    Category *
                  </label>
                  <select
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-boutique-rose bg-white font-medium"
                  >
                    {CATEGORY_GROUPS.map((grp) => (
                      <optgroup key={grp.group} label={`── ${grp.group} ──`}>
                        {grp.items.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-boutique-charcoal uppercase block mb-1">
                    Price Tag
                  </label>
                  <input
                    type="text"
                    value={editForm.price}
                    onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-boutique-rose"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-boutique-charcoal uppercase block mb-1 flex items-center justify-between">
                    <span>Qty (Units) *</span>
                    {(editForm.quantity ?? 1) === 0 && (
                      <span className="text-[9px] text-rose-500 font-bold uppercase">Sold Out</span>
                    )}
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={editForm.quantity ?? 0}
                    onChange={(e) => {
                      const val = Math.max(0, parseInt(e.target.value) || 0);
                      setEditForm(prev => ({
                        ...prev,
                        quantity: val,
                        stockStatus: val === 0 ? 'Out of Stock' : (prev.stockStatus === 'Out of Stock' ? 'In Stock' : prev.stockStatus),
                        available: val > 0
                      }));
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-bold focus:outline-none focus:border-boutique-rose"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-boutique-charcoal uppercase block mb-1">
                    Stock Status
                  </label>
                  <select
                    value={editForm.stockStatus}
                    onChange={(e) => {
                      const nextStatus = e.target.value;
                      setEditForm(prev => {
                        let nextQty = prev.quantity ?? 1;
                        if (nextStatus === 'Out of Stock') {
                          nextQty = 0;
                        } else if (nextStatus === 'In Stock' && nextQty === 0) {
                          nextQty = 1;
                        }
                        return {
                          ...prev,
                          stockStatus: nextStatus,
                          quantity: nextQty,
                          available: nextStatus !== 'Out of Stock' && nextQty > 0
                        };
                      });
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-boutique-rose bg-white"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Made to Order">Made to Order</option>
                    <option value="Pre-Order">Pre-Order</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-boutique-charcoal uppercase block mb-1">
                  Fabric / Material
                </label>
                <input
                  type="text"
                  value={editForm.material}
                  onChange={(e) => setEditForm({ ...editForm, material: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-boutique-rose"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-boutique-charcoal uppercase block mb-1">
                  Description
                </label>
                <textarea
                  rows="3"
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-boutique-rose"
                ></textarea>
              </div>

              <div className="flex items-center space-x-4 pt-2">
                <label className="flex items-center space-x-2 text-xs font-bold text-boutique-charcoal cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editForm.customizable}
                    onChange={(e) => setEditForm({ ...editForm, customizable: e.target.checked })}
                    className="rounded text-boutique-berry"
                  />
                  <span>Custom Stitching</span>
                </label>

                <label className="flex items-center space-x-2 text-xs font-bold text-boutique-charcoal cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editForm.featured}
                    onChange={(e) => setEditForm({ ...editForm, featured: e.target.checked })}
                    className="rounded text-boutique-berry"
                  />
                  <span>Featured</span>
                </label>

                <label className="flex items-center space-x-2 text-xs font-bold text-boutique-charcoal cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editForm.newArrival}
                    onChange={(e) => setEditForm({ ...editForm, newArrival: e.target.checked })}
                    className="rounded text-boutique-berry"
                  />
                  <span>New Arrival</span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end space-x-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => { setEditingProduct(null); setEditForm(null); }}
                  className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 text-xs font-semibold hover:bg-gray-200"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-boutique-berry hover:bg-boutique-deepRose text-white text-xs font-bold uppercase tracking-wider shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Admin;
