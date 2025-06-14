// In your tornado routes file
const express = require('express');
const router = express.Router();
const tornadoEvent = require('../models/tornadoEvent');

// GET all tornado events with user info
router.get('/', async (req, res) => {
  try {
    const events = await tornadoEvent.find()
      .populate('userId', 'username email') // Populate user info (adjust fields as needed)
      .sort({ date: -1 });
    res.json(events);
  } catch (error) {
    console.error('Error fetching tornado events:', error);
    res.status(500).json({ error: 'Failed to fetch tornado events' });
  }
});

// POST route (if you want to store username when creating)
router.post('/', async (req, res) => {
  try {
    const { title, description, date, coordinates, username } = req.body; // Add username from frontend
    
    const newTornadoEvent = new tornadoEvent({
      title,
      description,
      date,
      coordinates,
      username // Store username directly
    });
    
    const savedEvent = await newTornadoEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error('Error creating tornado event:', error);
    res.status(500).json({ error: 'Failed to create tornado event' });
  }
});

module.exports = router;