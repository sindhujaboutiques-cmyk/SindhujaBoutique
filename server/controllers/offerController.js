const Offer = require('../models/Offer');
const { getIsConnected } = require('../config/db');

// In-memory initial empty offers list
let inMemoryOffers = [];

const getOffers = async (req, res) => {
  try {
    if (getIsConnected()) {
      const offers = await Offer.find({ active: true });
      return res.json({ success: true, count: offers.length, data: offers });
    }
    const activeOffers = inMemoryOffers.filter(o => o.active);
    return res.json({ success: true, count: activeOffers.length, data: activeOffers });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching offers', error: error.message });
  }
};

const createOffer = async (req, res) => {
  try {
    const { title, badge, description, details, image, validUntil, active } = req.body;
    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and description required' });
    }

    const data = { title, badge: badge || 'Promotion', description, details: details || [], image, validUntil, active: active !== undefined ? active : true };

    if (getIsConnected()) {
      const offer = await Offer.create(data);
      return res.status(201).json({ success: true, data: offer });
    }

    const newOffer = { id: 'off-' + Date.now(), ...data };
    inMemoryOffers.unshift(newOffer);
    return res.status(201).json({ success: true, data: newOffer });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error creating offer', error: error.message });
  }
};

module.exports = {
  getOffers,
  createOffer
};
