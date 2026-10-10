const mongoose = require('mongoose');

const businessSettingsSchema = new mongoose.Schema({
  businessName: { type: String, default: 'Sinduja Boutique' },
  ownerName: { type: String, default: 'Sinduja' },
  phone: { type: String, default: '9360530071' },
  whatsapp: { type: String, default: '9360530071' },
  instagram: { type: String, default: 'https://www.instagram.com/sinduja_boutique08/' },
  instagramHandle: { type: String, default: '@sinduja_boutique08' },
  tagline: { type: String, default: 'Your Style. Your Rule.' },
  openingHours: { type: String, default: 'Every day, 9:00 AM – 9:00 PM' },
  openingTime: { type: String, default: '09:00 AM' },
  closingTime: { type: String, default: '09:00 PM' },
  address: { type: String, default: '52A, Sri Guru Brindhavan Complex, Indira Nagar, MTP Road, Nsn palayam, Coimbatore, Tamil Nadu 641031' },
  googleMapsUrl: { type: String, default: 'https://share.google/bO2Dbk8bGUxWvLBWf' },
  logoImage: { type: String, default: '' },
  theme: {
    primaryColor: { type: String, default: '#FFFFFF' },
    accentPink: { type: String, default: '#E08E9D' },
    deepPink: { type: String, default: '#8C2D4B' }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('BusinessSettings', businessSettingsSchema);
