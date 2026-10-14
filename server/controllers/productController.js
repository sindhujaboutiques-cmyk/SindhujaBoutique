const mongoose = require('mongoose');
const Product = require('../models/Product');
const { connectDB, getIsConnected } = require('../config/db');

// Helper to safely build query for MongoDB ObjectId or Slug
const buildIdOrSlugFilter = (idOrSlug) => {
  if (!idOrSlug) return null;
  const isObjectId = mongoose.Types.ObjectId.isValid(idOrSlug) && String(new mongoose.Types.ObjectId(idOrSlug)) === String(idOrSlug);
  if (isObjectId) {
    return { $or: [{ _id: new mongoose.Types.ObjectId(idOrSlug) }, { slug: String(idOrSlug) }] };
  }
  return { slug: String(idOrSlug) };
};

// GET all products with optional query filtering
const getProducts = async (req, res) => {
  try {
    await connectDB();
    const { category, featured, newArrival, search } = req.query;

    let query = {};
    if (category && category !== 'all') {
      // Support matching by either categorySlug or category display name
      query.$or = [
        { categorySlug: category },
        { category: category }
      ];
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
        { category: { $regex: search, $options: 'i' } },
        { material: { $regex: search, $options: 'i' } }
      ];
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    return res.json({ success: true, count: products.length, data: products });
  } catch (error) {
    console.error('Error fetching products from database:', error);
    return res.status(500).json({ success: false, message: 'Database error fetching products', error: error.message });
  }
};

// GET single product by slug or id
const getProductBySlug = async (req, res) => {
  try {
    await connectDB();
    const { slug } = req.params;
    const filter = buildIdOrSlugFilter(slug);
    if (!filter) {
      return res.status(400).json({ success: false, message: 'Invalid product identifier' });
    }

    const product = await Product.findOne(filter);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found in boutique inventory' });
    }
    return res.json({ success: true, data: product });
  } catch (error) {
    console.error('Error retrieving product:', error);
    return res.status(500).json({ success: false, message: 'Database error retrieving product', error: error.message });
  }
};

// CREATE new product (Admin)
const createProduct = async (req, res) => {
  try {
    await connectDB();
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

    let finalSlug = (req.body.slug || (name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''))).trim();
    if (!finalSlug) {
      finalSlug = 'dress-' + Date.now();
    }

    // Ensure slug uniqueness in MongoDB
    const existing = await Product.findOne({ slug: finalSlug });
    if (existing) {
      finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
    }

    const categorySlug = category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const parsedQty = quantity !== undefined && quantity !== null ? Math.max(0, parseInt(quantity, 10) || 0) : 1;
    const isOut = parsedQty === 0 || stockStatus === 'Out of Stock' || available === false;
    const finalStockStatus = isOut ? 'Out of Stock' : (stockStatus || 'In Stock');
    const finalAvailable = !isOut;

    const newProductData = {
      name,
      slug: finalSlug,
      category,
      categorySlug,
      description,
      price: price || 'Price on Enquiry',
      originalPrice: originalPrice || '',
      images: images && images.length ? images : ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'],
      sizes: sizes && sizes.length ? sizes : ['Free Size'],
      colors: colors && colors.length ? colors : ['As Shown'],
      material: material || 'Premium Fabric',
      customizable: customizable !== undefined ? customizable : true,
      quantity: parsedQty,
      available: finalAvailable,
      stockStatus: finalStockStatus,
      featured: !!featured,
      newArrival: !!newArrival,
      tags: tags || [category],
      isSampleData: false
    };

    const product = await Product.create(newProductData);
    return res.status(201).json({ 
      success: true, 
      message: 'Product created and stored successfully in database', 
      data: product 
    });
  } catch (error) {
    console.error('Error creating product in database:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Database error saving product: ' + error.message, 
      error: error.message 
    });
  }
};

// UPDATE product
const updateProduct = async (req, res) => {
  try {
    await connectDB();
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
        updates.stockStatus = 'In Stock';
        updates.available = true;
      }
    }

    const filter = buildIdOrSlugFilter(id);
    if (!filter) {
      return res.status(400).json({ success: false, message: 'Invalid product ID' });
    }

    const product = await Product.findOneAndUpdate(filter, updates, { new: true, runValidators: true });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found in database to update' });
    }
    return res.json({ 
      success: true, 
      message: 'Product updated successfully in database', 
      data: product 
    });
  } catch (error) {
    console.error('Error updating product in database:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Database error updating product: ' + error.message, 
      error: error.message 
    });
  }
};

// DELETE product
const deleteProduct = async (req, res) => {
  try {
    await connectDB();
    const { id } = req.params;
    const filter = buildIdOrSlugFilter(id);
    if (!filter) {
      return res.status(400).json({ success: false, message: 'Invalid product ID' });
    }

    const product = await Product.findOneAndDelete(filter);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found in database to delete' });
    }
    return res.json({ success: true, message: 'Product deleted successfully from database' });
  } catch (error) {
    console.error('Error deleting product from database:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Database error deleting product: ' + error.message, 
      error: error.message 
    });
  }
};

module.exports = {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct
};
