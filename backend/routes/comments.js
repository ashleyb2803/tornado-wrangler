// routes/comments.js
const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const { authenticateUser } = require('../middleware/auth');

router.post('/:eventId', authenticateUser, async (req, res) => {
  const comment = new Comment({
    user: req.user.id,
    event: req.params.eventId,
    text: req.body.text
  });
  await comment.save();
  res.json(comment);
});

router.put('/:id', authenticateUser, async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment || comment.user.toString() !== req.user.id) return res.status(403).send('Unauthorized');
  comment.text = req.body.text;
  await comment.save();
  res.json(comment);
});

router.delete('/:id', authenticateUser, async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment || comment.user.toString() !== req.user.id) return res.status(403).send('Unauthorized');
  await comment.deleteOne();
  res.json({ message: 'Comment deleted' });
});
