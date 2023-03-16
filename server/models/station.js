const mongoose = require('mongoose');

const StationSchema = new mongoose.Schema({
    Name: { type: String, unique: true },
    Nimi: { type: String },
    Namn: { type: String },
    Osoite: { type: String },
    Adress: { type: String },
    Kaupunki: { type: String },
    Stad: { type: String },
    Operaattor: { type: String },
    Kapasiteet: { type: Number },
    x: { type: String, unique: true },
    y: { type: String, unique: true },
    ID: {
        type: Number,
        unique: true,
        default: function () {
            return Math.floor(Math.random() * 10000 + 999);
        },
    },
});

module.exports = mongoose.model('Station', StationSchema);
