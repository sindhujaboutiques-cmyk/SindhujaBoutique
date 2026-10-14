const BusinessSettings = require('../models/BusinessSettings');
const defaultSettings = require('../config/businessConfig');
const { connectDB } = require('../config/db');

const getSettings = async (req, res) => {
  try {
    await connectDB();
    let settings = await BusinessSettings.findOne();
    if (!settings) {
      settings = await BusinessSettings.create(defaultSettings);
    }
    return res.json({ success: true, data: settings });
  } catch (error) {
    console.error('Error retrieving settings from database:', error);
    return res.json({ success: true, data: defaultSettings });
  }
};

const updateSettings = async (req, res) => {
  try {
    await connectDB();
    const updates = req.body;
    let settings = await BusinessSettings.findOne();
    if (!settings) {
      settings = await BusinessSettings.create({ ...defaultSettings, ...updates });
    } else {
      Object.assign(settings, updates);
      await settings.save();
    }
    return res.json({ success: true, message: 'Settings updated successfully in database', data: settings });
  } catch (error) {
    console.error('Error updating settings in database:', error);
    return res.status(500).json({ success: false, message: 'Error updating settings in database', error: error.message });
  }
};

module.exports = {
  getSettings,
  updateSettings
};
