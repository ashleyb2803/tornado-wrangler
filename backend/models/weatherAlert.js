const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weatherAlertSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  severity: String,
  issuedAt: { type: Date, required: true },
  expiresAt: Date,
  location: { type: Schema.Types.ObjectId, ref: 'Location' }
}, { timestamps: true });

module.exports = mongoose.model('WeatherAlert', weatherAlertSchema);

// This schema defines a weather alert with fields for title, description, severity, issued date, expiration date, and location.
// The `title` and `issuedAt` fields are required, while `description`, `severity`, and `expiresAt` are optional.
// The `location` field references a `Location` document, allowing the alert to be associated with a specific geographical area.   