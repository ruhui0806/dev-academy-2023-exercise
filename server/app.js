const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const stationRouter = require('./controllers/stationRouter');
const middleware = require('./utils/middleware');
const config = require('./utils/config');
const logger = require('./utils/logger');
const Station = require('./models/station');
const Journey = require('./models/journey');
const journeyRouter = require('./controllers/journeyRouter');
mongoose.set('strictQuery', false);
mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB');
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message);
    });

// let journeys = [
//     {
//         Departure: '2021_05_31T23:57:25',
//         Return: '2021_06_01T00:05:46',
//         Departure_station_id: 94,
//         Departure_station_name: 'Laajalahden aukio',
//         Return_station_id: 100,
//         Return_station_name: 'Teljäntie',
//         Covered_distance_m: 2043,
//         Duration_sec: 500,
//     },
//     {
//         Departure: '2021_05_31T23:57:25',
//         Return: '2021_06_01T00:05:46',
//         Departure_station_id: 95,
//         Departure_station_name: 'Laajalahden aukio',
//         Return_station_id: 100,
//         Return_station_name: 'Teljäntie',
//         Covered_distance_m: 2043,
//         Duration_sec: 500,
//     },
//     {
//         Departure: '2021_05_31T23:57:25',
//         Return: '2021_06_01T00:05:46',
//         Departure_station_id: 34,
//         Departure_station_name: 'Laajalahden aukio',
//         Return_station_id: 100,
//         Return_station_name: 'Teljäntie',
//         Covered_distance_m: 2043,
//         Duration_sec: 500,
//     },
//     {
//         Departure: '2021_05_31T23:57:25',
//         Return: '2021_06_01T00:05:46',
//         Departure_station_id: 56,
//         Departure_station_name: 'Laajalahden aukio',
//         Return_station_id: 100,
//         Return_station_name: 'Teljäntie',
//         Covered_distance_m: 2043,
//         Duration_sec: 500,
//     },
// ];
// let stations = [
//     {
//         ID: 501,
//         Nimi: 'Hanasaari',
//         Namn: 'Hanaholmen',
//         Name: 'Hanasaari',
//         Osoite: 'Hanasaarenranta 1',
//         Adress: 'Hanaholmsstranden 1',
//         Kaupunki: 'Espoo',
//         Stad: 'Esbo',
//         Operaattor: 'CityBike Finland',
//         Kapasiteet: 10,
//         x: '24.840319',
//         y: '60.16582',
//     },
//     {
//         ID: 503,
//         Nimi: 'Keilalahti',
//         Namn: 'Kägelviken',
//         Name: 'Keilalahti',
//         Osoite: 'Keilalahdentie 2',
//         Adress: 'Kägelviksvägen 2',
//         Kaupunki: 'Espoo',
//         Stad: 'Esbo',
//         Operaattor: 'CityBike Finland',
//         Kapasiteet: 10,
//         x: '24.805758',
//         y: '60.168266',
//     },
//     {
//         ID: 507,
//         Nimi: 'Golfpolku',
//         Namn: 'Golfstigen',
//         Name: 'Golfpolku',
//         Osoite: 'Golfpolku 3',
//         Adress: 'Golfstigen 3',
//         Kaupunki: 'Espoo',
//         Stad: 'Esbo',
//         Operaattor: 'CityBike Finland',
//         Kapasiteet: 10,
//         x: '24.796136',
//         y: '60.168143',
//     },
// ];

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>');
});

app.use('/api/stations', stationRouter);
// app.get('/api/journeys', (request, response) => {
//     Journey.find({}).then((journeys) => response.json(journeys));
// });
app.use('/api/journeys', journeyRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
module.exports = app;
