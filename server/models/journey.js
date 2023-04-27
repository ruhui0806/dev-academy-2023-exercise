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
// JourneySchema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject._id = returnedObject._id.toString();
//     delete returnedObject.__v;
//   },
// });
module.exports = mongoose.model("Journey", JourneySchema);
