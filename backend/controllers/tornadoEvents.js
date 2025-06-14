import tornadoEvent from '../models/tornadoEvent.js';

// Get all tornado events (with comments)
exports.getAllEvents = async (req, res) => {
  try {
    const events = await tornadoEvent.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new tornado event
exports.createEvent = async (req, res) => {
  try {
    const event = new tornadoEvent(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Add a comment to a tornado event
exports.addComment = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { author, text } = req.body;
    const event = await tornadoEvent.findById(eventId);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    event.comments.push({ author, text });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};