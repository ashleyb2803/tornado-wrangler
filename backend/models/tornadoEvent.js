const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  author: String,
  text: String,
  createdAt: { type: Date, default: Date.now }
});


const tornadoEventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  coordinates: { type: [Number], required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
  username: { type: String }, 
  createdAt: { type: Date, default: Date.now }
});



module.exports = mongoose.model('TornadoEvent', tornadoEventSchema);