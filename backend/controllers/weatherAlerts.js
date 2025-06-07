const WeatherAlert = require('../models/weatherAlert');

// Get all weather alerts
exports.getAllAlerts = async (req, res) => {
  try {
    const alerts = await WeatherAlert.find().populate('location');
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single weather alert by ID
exports.getAlertById = async (req, res) => {
  try {
    const alert = await WeatherAlert.findById(req.params.id).populate('location');
    if (!alert) return res.status(404).json({ error: 'Alert not found' });
    res.json(alert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new weather alert
exports.createAlert = async (req, res) => {
  try {
    const alert = await WeatherAlert.create(req.body);
    res.status(201).json(alert);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a weather alert
exports.updateAlert = async (req, res) => {
  try {
    const alert = await WeatherAlert.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!alert) return res.status(404).json({ error: 'Alert not found' });
    res.json(alert);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a weather alert
exports.deleteAlert = async (req, res) => {
  try {
    const alert = await WeatherAlert.findByIdAndDelete(req.params.id);
    if (!alert) return res.status(404).json({ error: 'Alert not found' });
    res.json({ message: 'Alert deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};