const express = require('express');
const router = express.Router();

const { getProducts, getProductBySlug, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { getCategories, getCategoryBySlug, createCategory } = require('../controllers/categoryController');
const { getServices, getServiceBySlug } = require('../controllers/serviceController');
const { getGalleryItems, createGalleryItem, deleteGalleryItem } = require('../controllers/galleryController');
const { getOffers, createOffer } = require('../controllers/offerController');
const { getSettings, updateSettings } = require('../controllers/settingsController');
const { submitEnquiry, getEnquiries, updateEnquiryStatus, deleteEnquiry } = require('../controllers/contactController');
const { adminLogin, verifyAdminSession, updateAdminPassword } = require('../controllers/authController');

// Admin Authentication Routes
router.post('/admin/login', adminLogin);
router.get('/admin/verify', verifyAdminSession);
router.put('/admin/password', updateAdminPassword);

// Product / Dresses Routes
router.get('/products', getProducts);
router.get('/products/:slug', getProductBySlug);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// Category Routes
router.get('/categories', getCategories);
router.get('/categories/:slug', getCategoryBySlug);
router.post('/categories', createCategory);

// Service Routes
router.get('/services', getServices);
router.get('/services/:slug', getServiceBySlug);

// Gallery / Lookbook Routes
router.get('/gallery', getGalleryItems);
router.post('/gallery', createGalleryItem);
router.delete('/gallery/:id', deleteGalleryItem);

// Offers Routes
router.get('/offers', getOffers);
router.post('/offers', createOffer);

// Business Settings Routes
router.get('/settings', getSettings);
router.put('/settings', updateSettings);

// Contact / Enquiries Routes
router.post('/contact', submitEnquiry);
router.get('/enquiries', getEnquiries);
router.put('/enquiries/:id', updateEnquiryStatus);
router.delete('/enquiries/:id', deleteEnquiry);

module.exports = router;
