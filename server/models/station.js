const mongoose = require("mongoose");

const StationSchema = new mongoose.Schema({
  FID: { type: String },
  Name: { type: String, unique: true, required: true },
  Nimi: { type: String, required: true },
  Namn: { type: String, required: true },
  Osoite: { type: String, required: true },
  Adress: { type: String, required: true },
  Kaupunki: { type: String, required: true },
  Stad: { type: String, required: true },
  Operaattor: { type: String, required: true },
  Kapasiteet: { type: String, required: true },
  x: { type: String, unique: true, required: true },
  y: { type: String, unique: true, required: true },
  ID: {
    type: mongoose.Schema.Types.String,
    unique: true,
    required: true,
  },
});
module.exports = mongoose.model("Station", StationSchema);
