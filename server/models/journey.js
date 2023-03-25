const mongoose = require('mongoose');

const JourneySchema = new mongoose.Schema({
    Departure: {
        type: String,
        required: true
    },
    Departure_station_id: { type: String, ref: 'Station', required: true },
    Departure_station_name: { type: String, required: true },
    Return: { type: String, required: true },
    Return_station_id: { type: String, ref: 'Station', required: true },
    Return_station_name: { type: String, required: true },
    Covered_distance_m: { type: Number, required: true },
    Duration_sec: { type: Number, required: true },
});

module.exports = mongoose.model('Journey', JourneySchema);
