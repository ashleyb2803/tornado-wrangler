const express = require('express');
const router = express.Router();
const tornadoEvent = require('../models/tornadoEvent');

// GET all tornado events (24-hour expiration)
router.get('/', async (req, res) => {
  try {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    const events = await tornadoEvent.find({
      createdAt: { $gte: twentyFourHoursAgo }
    })
    .populate('userId', 'username email')
    .sort({ createdAt: -1 });
    
    res.json(events);
  } catch (error) {
    console.error('Error fetching tornado events:', error);
    res.status(500).json({ error: 'Failed to fetch tornado events' });
  }
});

// POST - Create new tornado event
router.post('/', async (req, res) => {
  try {
    const { title, description, date, coordinates, username } = req.body;
    
    const newTornadoEvent = new tornadoEvent({
      title,
      description,
      date,
      coordinates,
      username,
      createdAt: new Date(), //a creation timestamp
      comments: [] // Initialize empty comments array
    });
    
    const savedEvent = await newTornadoEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error('Error creating tornado event:', error);
    res.status(500).json({ error: 'Failed to create tornado event' });
  }
});

// PUT - Update tornado event
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date } = req.body;
    
    const updatedEvent = await tornadoEvent.findByIdAndUpdate(
      id,
      { title, description, date, updatedAt: new Date() },
      { new: true }
    ).populate('userId', 'username email');
    
    if (!updatedEvent) {
      return res.status(404).json({ error: 'Tornado event not found' });
    }
    
    res.json(updatedEvent);
  } catch (error) {
    console.error('Error updating tornado event:', error);
    res.status(500).json({ error: 'Failed to update tornado event' });
  }
});

// DELETE - Delete tornado event
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedEvent = await tornadoEvent.findByIdAndDelete(id);
    
    if (!deletedEvent) {
      return res.status(404).json({ error: 'Tornado event not found' });
    }
    
    res.json({ message: 'Tornado event deleted successfully' });
  } catch (error) {
    console.error('Error deleting tornado event:', error);
    res.status(500).json({ error: 'Failed to delete tornado event' });
  }
});

// GET - Get comments for a specific tornado event
router.get('/:id/comments', async (req, res) => {
  try {
    const { id } = req.params;
    
    const event = await tornadoEvent.findById(id).select('comments');
    
    if (!event) {
      return res.status(404).json({ error: 'Tornado event not found' });
    }
    
    res.json(event.comments || []);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// POST - Add comment to tornado event
router.post('/:id/comments', async (req, res) => {
  try {
    const { id } = req.params;
    const { author, text } = req.body;
    
    if (!author || !text) {
      return res.status(400).json({ error: 'Author and text are required' });
    }
    
    const event = await tornadoEvent.findById(id);
    
    if (!event) {
      return res.status(404).json({ error: 'Tornado event not found' });
    }
    
    const newComment = {
      author: author.trim(),
      text: text.trim(),
      createdAt: new Date()
    };
    
    event.comments.push(newComment);
    await event.save();
    
    res.status(201).json(event);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// DELETE - Delete a specific comment
router.delete('/:eventId/comments/:commentId', async (req, res) => {
  try {
    const { eventId, commentId } = req.params;
    
    const event = await tornadoEvent.findById(eventId);
    
    if (!event) {
      return res.status(404).json({ error: 'Tornado event not found' });
    }
    
    // Find and remove the comment
    const commentIndex = event.comments.findIndex(
      comment => comment._id.toString() === commentId
    );
    
    if (commentIndex === -1) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    
    event.comments.splice(commentIndex, 1);
    await event.save();
    
    res.json(event);
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});

// Cleanup route - Remove expired events
router.delete('/cleanup/expired', async (req, res) => {
  try {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    const result = await tornadoEvent.deleteMany({
      createdAt: { $lt: twentyFourHoursAgo }
    });
    
    res.json({ 
      message: `Cleaned up ${result.deletedCount} expired tornado events`,
      deletedCount: result.deletedCount 
    });
  } catch (error) {
    console.error('Error cleaning up expired events:', error);
    res.status(500).json({ error: 'Failed to cleanup expired events' });
  }
});

module.exports = router;