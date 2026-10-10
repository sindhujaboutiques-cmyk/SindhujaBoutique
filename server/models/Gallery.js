const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['Sarees', 'Women\'s Wear', 'Jewels', 'Fancy', 'Stitching', 'Boutique']
  },
  caption: { type: String },
  featured: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('Gallery', gallerySchema);
