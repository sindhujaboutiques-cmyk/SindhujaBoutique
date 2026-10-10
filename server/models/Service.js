const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  tagline: { type: String },
  description: { type: String, required: true },
  features: [{ type: String }],
  image: { type: String },
  icon: { type: String, default: 'Scissors' },
  active: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, {
  timestamps: true
});

module.exports = mongoose.model('Service', serviceSchema);
