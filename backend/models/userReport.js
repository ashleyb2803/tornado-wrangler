const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userReportSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tornadoEvent: { type: Schema.Types.ObjectId, ref: 'TornadoEvent' },
    location: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
    description: { type: String, required: true },
    reportedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserReport', userReportSchema);


// This schema defines a user report that can be linked to a tornado event and a location.
// It includes a reference to the user who made the report, the tornado event (if applicable),
// the location of the report, a description of the report, and a timestamp for when the report was made.
// The `reportedAt` field defaults to the current date and time when the report is created.