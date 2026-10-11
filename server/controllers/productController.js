const Product = require('../models/Product');
const { getIsConnected } = require('../config/db');
let { products: inMemoryProducts } = require('../data/seedData');

// GET all products with optional query filtering
const getProducts = async (req, res) => {
  try {
    const { category, featured, newArrival, search } = req.query;

    if (getIsConnected()) {
      let query = {};
      if (category && category !== 'all') {
        query.categorySlug = category;
      }
      if (featured === 'true') {
        query.featured = true;
      }
      if (newArrival === 'true') {
        query.newArrival = true;
      }
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { category: { $regex: search, $options: 'i' } }
        ];
      }
      const products = await Product.find(query).sort({ createdAt: -1 });
      return res.json({ success: true, count: products.length, data: products });
    }

    // In-memory fallback
    let filtered = [...inMemoryProducts];
    if (category && category !== 'all') {
      filtered = filtered.filter(p => p.categorySlug === category || p.category.toLowerCase() === category.toLowerCase());
    }
    if (featured === 'true') {
      filtered = filtered.filter(p => p.featured);
    }
    if (newArrival === 'true') {
      filtered = filtered.filter(p => p.newArrival);
    }
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(s) || 
        p.description.toLowerCase().includes(s) ||
        p.category.toLowerCase().includes(s)
      );
    }

    return res.json({ success: true, count: filtered.length, data: filtered });
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ success: false, message: 'Server error while fetching products', error: error.message });
  }
};

// GET single product by slug or id
const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    if (getIsConnected()) {
      const product = await Product.findOne({ $or: [{ slug }, { _id: slug.match(/^[0-9a-fA-F]{24}$/) ? slug : null }] });
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      return res.json({ success: true, data: product });
    }

    // In-memory fallback
    const product = inMemoryProducts.find(p => p.slug === slug || p.id === slug);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    return res.json({ success: true, data: product });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error retrieving product', error: error.message });
  }
};

// CREATE new product (Admin)
const createProduct = async (req, res) => {
  try {
    const { 
      name, 
      category, 
      description, 
      price, 
      originalPrice,
      images, 
      sizes, 
      colors, 
      material, 
      customizable, 
      available, 
      featured, 
      newArrival, 
      stockStatus,
      quantity,
      tags 
    } = req.body;

    if (!name || !category || !description) {
      return res.status(400).json({ success: false, message: 'Name, Category, and Description are required' });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4);
    const categorySlug = category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const parsedQty = quantity !== undefined && quantity !== null ? Math.max(0, parseInt(quantity, 10) || 0) : 1;
    const isOut = parsedQty === 0 || stockStatus === 'Out of Stock' || available === false;
    const finalStockStatus = isOut ? 'Out of Stock' : (stockStatus || 'In Stock');
    const finalAvailable = !isOut;

    const newProductData = {
      name,
      slug,
      category,
      categorySlug,
      description,
      price: price || 'Price on Enquiry',
      originalPrice: originalPrice || '',
      images: images && images.length ? images : ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'],
      sizes: sizes || ['Free Size'],
      colors: colors || ['As Shown'],
      material: material || 'Premium Fabric',
      customizable: customizable !== undefined ? customizable : true,
      quantity: parsedQty,
      available: finalAvailable,
      stockStatus: finalStockStatus,
      featured: !!featured,
      newArrival: !!newArrival,
      tags: tags || [category],
      isSampleData: false,
      createdAt: new Date().toISOString()
    };

    if (getIsConnected()) {
      const product = await Product.create(newProductData);
      return res.status(201).json({ success: true, message: 'Product created successfully', data: product });
    }

    // In-memory
    const newProduct = { id: 'prod-' + Date.now(), _id: 'prod-' + Date.now(), ...newProductData };
    inMemoryProducts.unshift(newProduct);
    return res.status(201).json({ success: true, message: 'Product created successfully in memory store', data: newProduct });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error creating product', error: error.message });
  }
};

// UPDATE product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    if (updates.category && !updates.categorySlug) {
      updates.categorySlug = updates.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    if (updates.quantity !== undefined && updates.quantity !== null) {
      const q = Math.max(0, parseInt(updates.quantity, 10) || 0);
      updates.quantity = q;
      if (q === 0) {
        updates.stockStatus = 'Out of Stock';
        updates.available = false;
      } else if (q > 0 && updates.stockStatus === 'Out of Stock' && !req.body.stockStatus) {
        // If restocked and stockStatus wasn't intentionally forced to Out of Stock
        updates.stockStatus = 'In Stock';
        updates.available = true;
      }
    }

    if (getIsConnected()) {
      const product = await Product.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      return res.json({ success: true, message: 'Product updated successfully', data: product });
    }

    // In-memory
    const index = inMemoryProducts.findIndex(p => p.id === id || p._id === id || p.slug === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    inMemoryProducts[index] = { ...inMemoryProducts[index], ...updates };
    return res.json({ success: true, message: 'Product updated in memory store', data: inMemoryProducts[index] });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error updating product', error: error.message });
  }
};

// DELETE product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      return res.json({ success: true, message: 'Product deleted successfully' });
    }

    // In-memory
    const initialLen = inMemoryProducts.length;
    inMemoryProducts = inMemoryProducts.filter(p => p.id !== id && p.slug !== id);
    if (inMemoryProducts.length === initialLen) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    return res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error deleting product', error: error.message });
  }
};

module.exports = {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct
};
