const Service = require('../models/Service');
const { getIsConnected } = require('../config/db');
let { services: inMemoryServices } = require('../data/seedData');

const getServices = async (req, res) => {
  try {
    if (getIsConnected()) {
      const services = await Service.find({ active: true }).sort({ order: 1 });
      return res.json({ success: true, count: services.length, data: services });
    }
    return res.json({ success: true, count: inMemoryServices.length, data: inMemoryServices });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching services', error: error.message });
  }
};

const getServiceBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    if (getIsConnected()) {
      const service = await Service.findOne({ slug });
      if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
      return res.json({ success: true, data: service });
    }
    const service = inMemoryServices.find(s => s.slug === slug || s.id === slug);
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
    return res.json({ success: true, data: service });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching service', error: error.message });
  }
};

module.exports = {
  getServices,
  getServiceBySlug
};
