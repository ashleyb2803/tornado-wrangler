const TornadoEvent = require('../models/tornadoEvents');

// Get all tornado events
exports.getAllTornadoEvents = async (req, res) => {
  try {
    const events = await TornadoEvent.find().populate('location');
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single tornado event by ID
exports.getTornadoEventById = async (req, res) => {
  try {
    const event = await TornadoEvent.findById(req.params.id).populate('location');
    if (!event) return res.status(404).json({ error: 'Tornado event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new tornado event
exports.createTornadoEvent = async (req, res) => {
  try {
    const event = await TornadoEvent.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a tornado event
exports.updateTornadoEvent = async (req, res) => {
  try {
    const event = await TornadoEvent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ error: 'Tornado event not found' });
    res.json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a tornado event
exports.deleteTornadoEvent = async (req, res) => {
  try {
    const event = await TornadoEvent.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ error: 'Tornado event not found' });
    res.json({ message: 'Tornado event deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};