const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  category: { type: String, required: true },
  categorySlug: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, default: 'Price on Enquiry' },
  images: [{ type: String }],
  sizes: [{ type: String }],
  colors: [{ type: String }],
  material: { type: String, default: 'Premium Fabric' },
  customizable: { type: Boolean, default: true },
  quantity: { type: Number, default: 1, min: 0 },
  stockStatus: { type: String, default: 'In Stock' },
  available: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  newArrival: { type: Boolean, default: false },
  tags: [{ type: String }],
  isSampleData: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
