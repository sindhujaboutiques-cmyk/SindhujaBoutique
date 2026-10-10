const BusinessSettings = require('../models/BusinessSettings');
const defaultSettings = require('../config/businessConfig');
const { getIsConnected } = require('../config/db');

let inMemorySettings = { ...defaultSettings };

const getSettings = async (req, res) => {
  try {
    if (getIsConnected()) {
      let settings = await BusinessSettings.findOne();
      if (!settings) {
        settings = await BusinessSettings.create(defaultSettings);
      }
      return res.json({ success: true, data: settings });
    }
    return res.json({ success: true, data: inMemorySettings });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error retrieving settings', error: error.message });
  }
};

const updateSettings = async (req, res) => {
  try {
    const updates = req.body;
    if (getIsConnected()) {
      let settings = await BusinessSettings.findOne();
      if (!settings) {
        settings = await BusinessSettings.create({ ...defaultSettings, ...updates });
      } else {
        Object.assign(settings, updates);
        await settings.save();
      }
      return res.json({ success: true, message: 'Settings updated successfully', data: settings });
    }

    inMemorySettings = { ...inMemorySettings, ...updates };
    return res.json({ success: true, message: 'Settings updated in memory store', data: inMemorySettings });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error updating settings', error: error.message });
  }
};

module.exports = {
  getSettings,
  updateSettings
};
