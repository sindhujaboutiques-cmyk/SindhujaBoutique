const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  badge: { type: String, default: 'Special Promotion' },
  description: { type: String, required: true },
  details: [{ type: String }],
  image: { type: String },
  validFrom: { type: Date },
  validUntil: { type: Date },
  active: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('Offer', offerSchema);
