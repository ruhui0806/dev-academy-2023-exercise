const mongoose = require('mongoose')

const StationSchema = new mongoose.Schema({
    ID: { type: Number },
    Nimi: { type: String },
    Namn: { type: String },
    Name: { type: String },
    Osoite: { type: String },
    Adress: { type: String },
    Kaupunki: { type: String },
    Stad: { type: String },
    Operaattor: { type: String },
    Kapasiteet: { type: Number },
    x: { type: String },
    y: { type: String },
})

module.exports = mongoose.model('Station', StationSchema)
