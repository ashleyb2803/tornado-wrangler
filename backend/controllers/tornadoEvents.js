const TornadoEvent = require('../models/TornadoEvent');
const mongoose = require('mongoose');

// Create a new tornado event
const createTornadoEvent = async (req, res) => {
  try {
    const { title, description, date, location, coordinates } = req.body;

  const newEvent = new TornadoEvent({
  title,
  description,
  date,
  location: {
    type: 'Point',
    coordinates, 
  },
  user: req.user._id,
});

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create event', error: err.message });
  }
};

// Get all tornado events
const getAllTornadoEvents = async (req, res) => {
  try {
    const events = await TornadoEvent.find().populate('user', 'username');
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get events', error: err.message });
  }
};

// Get a single event by ID
const getTornadoEventById = async (req, res) => {
  try {
    const event = await TornadoEvent.findById(req.params.id).populate('user', 'username');
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get event', error: err.message });
  }
};

// Delete a tornado event
const deleteTornadoEvent = async (req, res) => {
  try {
    const event = await TornadoEvent.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (event.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await event.deleteOne();
    res.status(200).json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete event', error: err.message });
  }
};

module.exports = {
  createTornadoEvent,
  getAllTornadoEvents,
  getTornadoEventById,
  deleteTornadoEvent,
};