const Gallery = require('../models/Gallery');
const { connectDB, getIsConnected } = require('../config/db');
let { galleryItems: inMemoryGallery } = require('../data/seedData');

const getGalleryItems = async (req, res) => {
  try {
    await connectDB();
    const { category } = req.query;

    if (getIsConnected()) {
      let query = {};
      if (category && category !== 'All') {
        query.category = category;
      }
      const items = await Gallery.find(query).sort({ createdAt: -1 });
      return res.json({ success: true, count: items.length, data: items });
    }

    let items = [...inMemoryGallery];
    if (category && category !== 'All') {
      items = items.filter(g => g.category.toLowerCase() === category.toLowerCase());
    }
    return res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching gallery', error: error.message });
  }
};

const createGalleryItem = async (req, res) => {
  try {
    await connectDB();
    const { title, image, category, caption } = req.body;
    if (!title || !image || !category) {
      return res.status(400).json({ success: false, message: 'Title, image and category are required' });
    }

    const data = { title, image, category, caption: caption || '', featured: false };

    if (getIsConnected()) {
      const item = await Gallery.create(data);
      return res.status(201).json({ success: true, message: 'Gallery item added', data: item });
    }

    const newItem = { id: 'gal-' + Date.now(), ...data };
    inMemoryGallery.unshift(newItem);
    return res.status(201).json({ success: true, message: 'Gallery item added', data: newItem });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error creating gallery item', error: error.message });
  }
};

const deleteGalleryItem = async (req, res) => {
  try {
    await connectDB();
    const { id } = req.params;
    if (getIsConnected()) {
      await Gallery.findByIdAndDelete(id);
      return res.json({ success: true, message: 'Item removed' });
    }
    inMemoryGallery = inMemoryGallery.filter(g => g.id !== id);
    return res.json({ success: true, message: 'Item removed' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error deleting gallery item', error: error.message });
  }
};

module.exports = {
  getGalleryItems,
  createGalleryItem,
  deleteGalleryItem
};
