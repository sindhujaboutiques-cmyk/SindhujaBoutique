const ContactEnquiry = require('../models/ContactEnquiry');
const { getIsConnected } = require('../config/db');

let inMemoryEnquiries = [
  {
    id: 'enq-sample-1',
    _id: 'enq-sample-1',
    name: 'Priyanka Sundaram',
    phone: '+91 98401 23456',
    email: 'priyanka.s@gmail.com',
    serviceInterest: 'Bridal Blouse Designing',
    message: 'Hello Sinduja! I have an upcoming wedding on Nov 18th and need 3 heavy Maggam work blouses custom designed for my Muhurtham silk sarees. Can I visit this weekend for measurement?',
    status: 'New',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: 'enq-sample-2',
    _id: 'enq-sample-2',
    name: 'Ananya Ramesh',
    phone: '+91 97890 65432',
    email: 'ananya.ramesh@yahoo.com',
    serviceInterest: 'Custom Tailoring & Stitching',
    message: 'Looking for custom Anarkali stitching with hand embroidered neckline and matching dupatta finish. How many days would tailoring take?',
    status: 'Contacted',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
];

const submitEnquiry = async (req, res) => {
  try {
    const { name, phone, email, serviceInterest, message } = req.body;

    if (!name || !phone || !message) {
      return res.status(400).json({ success: false, message: 'Please provide Name, Phone number, and Message' });
    }

    const data = {
      name,
      phone,
      email: email || '',
      serviceInterest: serviceInterest || 'General Enquiry',
      message,
      status: 'New'
    };

    if (getIsConnected()) {
      const enquiry = await ContactEnquiry.create(data);
      return res.status(201).json({ success: true, message: 'Your enquiry has been received. Sinduja will get back to you shortly.', data: enquiry });
    }

    const newEnquiry = { id: 'enq-' + Date.now(), _id: 'enq-' + Date.now(), ...data, createdAt: new Date() };
    inMemoryEnquiries.unshift(newEnquiry);
    return res.status(201).json({ success: true, message: 'Your enquiry has been received. Sinduja will get back to you shortly.', data: newEnquiry });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error submitting enquiry', error: error.message });
  }
};

const getEnquiries = async (req, res) => {
  try {
    if (getIsConnected()) {
      const enquiries = await ContactEnquiry.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: enquiries.length, data: enquiries });
    }
    return res.json({ success: true, count: inMemoryEnquiries.length, data: inMemoryEnquiries });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching enquiries', error: error.message });
  }
};

const updateEnquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (getIsConnected()) {
      const updated = await ContactEnquiry.findByIdAndUpdate(id, { status }, { new: true });
      if (!updated) return res.status(404).json({ success: false, message: 'Enquiry not found' });
      return res.json({ success: true, data: updated, message: 'Status updated' });
    }

    const item = inMemoryEnquiries.find(e => e.id === id || e._id === id);
    if (!item) return res.status(404).json({ success: false, message: 'Enquiry not found' });
    item.status = status;
    return res.json({ success: true, data: item, message: 'Status updated' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error updating status' });
  }
};

const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      await ContactEnquiry.findByIdAndDelete(id);
      return res.json({ success: true, message: 'Enquiry removed' });
    }

    inMemoryEnquiries = inMemoryEnquiries.filter(e => e.id !== id && e._id !== id);
    return res.json({ success: true, message: 'Enquiry removed' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error deleting enquiry' });
  }
};

module.exports = {
  submitEnquiry,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry
};
