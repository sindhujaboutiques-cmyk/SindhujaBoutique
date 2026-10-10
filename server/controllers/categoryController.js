const Category = require('../models/Category');
const { getIsConnected } = require('../config/db');
let { categories: inMemoryCategories } = require('../data/seedData');

const getCategories = async (req, res) => {
  try {
    if (getIsConnected()) {
      const categories = await Category.find().sort({ order: 1 });
      return res.json({ success: true, count: categories.length, data: categories });
    }
    return res.json({ success: true, count: inMemoryCategories.length, data: inMemoryCategories });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching categories', error: error.message });
  }
};

const getCategoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    if (getIsConnected()) {
      const category = await Category.findOne({ slug });
      if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
      return res.json({ success: true, data: category });
    }
    const category = inMemoryCategories.find(c => c.slug === slug);
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
    return res.json({ success: true, data: category });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error retrieving category', error: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, description, image, parentCategory, featured } = req.body;
    if (!name || !description || !image) {
      return res.status(400).json({ success: false, message: 'Name, description and image are required' });
    }
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const data = { name, slug, description, image, parentCategory: parentCategory || "Women's Wear", featured: !!featured, order: inMemoryCategories.length + 1 };

    if (getIsConnected()) {
      const category = await Category.create(data);
      return res.status(201).json({ success: true, message: 'Category created', data: category });
    }

    const newCat = { id: 'cat-' + Date.now(), ...data };
    inMemoryCategories.push(newCat);
    return res.status(201).json({ success: true, message: 'Category created', data: newCat });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error creating category', error: error.message });
  }
};

module.exports = {
  getCategories,
  getCategoryBySlug,
  createCategory
};
