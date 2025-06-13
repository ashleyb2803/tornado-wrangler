const express = require('express');
const router = express.Router();
const TornadoEvent = require('../models/TornadoEvent');
const { authenticateUser } = require('../middleware/auth');

router.post('/', authenticateUser, async (req, res) => {
  try {
    const { title, description, date, coordinates } = req.body;
    const event = new TornadoEvent({
      user: req.user.id,
      title,
      description,
      date,
      location: {
        type: 'Point',
        coordinates,
      }
    });
    await event.save();
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const events = await TornadoEvent.find().populate('user', 'username');
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;