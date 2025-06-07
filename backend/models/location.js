const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    city: { type: String, required: true },
    state: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    riskLevel: { type: String, enum: ['Low', 'Moderate', 'High', 'Extreme'], default: 'Low' }
});

module.exports = mongoose.model('Location', locationSchema);

// This schema defines a location with fields for city, state, latitude, longitude, and risk level.
// The `riskLevel` field uses an enum to restrict values to 'Low', 'Moderate', 'High', or 'Extreme', with a default value of 'Low'.
// The `latitude` and `longitude` fields are required to specify the geographical coordinates of the location.
// The `city` and `state` fields are also required to provide the name of the location.
// This schema can be used to store information about various locations that may be affected by tornadoes or other weather events.