// backend/models/tornadoEventModel.js
const mongoose = require('mongoose');
const tornadoEventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  location: String,
  coordinates: [Number],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
module.exports = mongoose.model('TornadoEvent', tornadoEventSchema);