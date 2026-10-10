const mongoose = require('mongoose');

const contactEnquirySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, trim: true },
  serviceInterest: { type: String, default: 'General Enquiry' },
  message: { type: String, required: true },
  status: { type: String, enum: ['New', 'Contacted', 'Completed'], default: 'New' },
  notes: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('ContactEnquiry', contactEnquirySchema);
