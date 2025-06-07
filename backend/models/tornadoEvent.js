const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tornadoEventSchema = new Schema({
    date: { type: Date, required: true },
    location: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
    intensity: { type: String, enum: ['EF0', 'EF1', 'EF2', 'EF3', 'EF4', 'EF5'], required: true },
    description: { type: String },
    reportedBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('TornadoEvent', tornadoEventSchema);

// This schema defines a tornado event with fields for the date, location, intensity, description, and the user who reported it.
// The `location` field references a `Location` document, and the `reportedBy` field references a `User` document.
// The `timestamps` option automatically adds `createdAt` and `updatedAt` fields to the schema.
// The `intensity` field uses an enum to restrict values to the Enhanced Fujita scale ratings (EF0 to EF5).
// The `description` field is optional and can be used to provide additional details about the tornado event.
// The `date` field is required to indicate when the tornado event occurred.