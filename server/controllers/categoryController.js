const Category = require('../models/Category');
const { connectDB } = require('../config/db');
const { categories: fallbackCategories } = require('../data/seedData');

const getCategories = async (req, res) => {
  try {
    await connectDB();
    const categories = await Category.find().sort({ order: 1 });
    if (categories && categories.length > 0) {
      return res.json({ success: true, count: categories.length, data: categories });
    }
    return res.json({ success: true, count: fallbackCategories.length, data: fallbackCategories });
  } catch (error) {
    console.error('Error in getCategories:', error);
    return res.json({ success: true, count: fallbackCategories.length, data: fallbackCategories });
  }
};

const getCategoryBySlug = async (req, res) => {
  try {
    await connectDB();
    const { slug } = req.params;
    const category = await Category.findOne({ slug });
    if (!category) {
      const fallback = fallbackCategories.find(c => c.slug === slug);
      if (fallback) return res.json({ success: true, data: fallback });
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    return res.json({ success: true, data: category });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error retrieving category', error: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    await connectDB();
    const { name, description, image, parentCategory, featured } = req.body;
    if (!name || !description || !image) {
      return res.status(400).json({ success: false, message: 'Name, description and image are required' });
    }
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const count = await Category.countDocuments();
    const data = { 
      name, 
      slug, 
      description, 
      image, 
      parentCategory: parentCategory || "Women's Wear", 
      featured: !!featured, 
      order: count + 1 
    };

    const category = await Category.create(data);
    return res.status(201).json({ success: true, message: 'Category created in database', data: category });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error creating category in database', error: error.message });
  }
};

module.exports = {
  getCategories,
  getCategoryBySlug,
  createCategory
};
