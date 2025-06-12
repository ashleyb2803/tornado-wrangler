const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
  text: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  createdAt: { type: Date, default: Date.now }
});

const userReportSchema = new mongoose.Schema({
  title: String,
  description: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
  comments: [commentSchema]
});

module.exports = mongoose.models.UserReport || mongoose.model('UserReport', userReportSchema);
// This schema defines a user report that can be linked to a tornado event and a location.
// It includes a reference to the user who made the report, the tornado event (if applicable),
// the location of the report, a description of the report, and a timestamp for when the report was made.
// The `reportedAt` field defaults to the current date and time when the report is created.