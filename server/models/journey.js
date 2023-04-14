const mongoose = require("mongoose");

const JourneySchema = new mongoose.Schema({
  Departure: {
    type: String,
    required: true,
  },
  Departure_station_id: {
    type: mongoose.Schema.Types.String,
    required: true,
    ref: "Station",
  },
  Departure_station_name: { type: String, required: true },
  Return: { type: String, required: true },
  Return_station_id: {
    type: mongoose.Schema.Types.String,
    required: true,
    ref: "Station",
  },
  Return_station_name: { type: String, required: true },
  Covered_distance_m: { type: Number, required: true },
  Duration_sec: { type: Number, required: true },
});

JourneySchema.virtual("departure_station", {
  ref: "Station",
  localField: "Departure_station_id",
  foreignField: "ID",
});
JourneySchema.virtual("return_station", {
  ref: "Station",
  localField: "Return_station_id",
  foreignField: "ID",
});
module.exports = mongoose.model("Journey", JourneySchema);
