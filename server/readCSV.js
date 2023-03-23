const fs = require('fs');
const { parse } = require('csv-parse');
const { journeyValidation, stationValidation } = require('./utils/validation')

//download the required files:
//wget https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv
//wget https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv
//wget https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv

//wget https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv
//mv 726277c507ef4914b0aec3cbcfcbfafc_0.csv stations.csv

//FID,ID,Nimi,Namn,Name,Osoite,Adress,Kaupunki,Stad,Operaattor,Kapasiteet,x,y
const stationHeaders = [
    'FID',
    'ID',
    'Nimi',
    'Namn',
    'Name',
    'Osoite',
    'Adress',
    'Kaupunki',
    'Stad',
    'Operaattor',
    'Kapasiteet',
    'x',
    'y',
];
fs.createReadStream('./stations.csv')
    .pipe(parse({ delimiter: ',', from_line: 2 }))
    .on('data', function (row) {
        let station_object = {};
        if (stationValidation(row)) {
            stationHeaders.forEach((columnName, idx) => {
                station_object[columnName] = row[idx];
            });
        }
        else { console.log('Incorrect data type in this row:' + row); }
        console.log(station_object);
    })
    .on('end', function () {
        console.log('finished');
    })
    .on('error', function (error) {
        console.log(error.message);
    });

// Departure,Return,Departure station id,Departure station name,Return station id,Return station name,Covered distance (m),Duration (sec.)
const journeyHeaders = [
    'Departure',
    'Return',
    'Departure_station_id',
    'Departure_station_name',
    'Return_station_id',
    'Return_station_name',
    'Covered_distance_m',
    'Duration_sec',
];
fs.createReadStream('./2021-05.csv')
    .pipe(parse({ delimiter: ',', from_line: 2 }))
    .on('data', function (row) {
        let db_object = {};
        if (row.length == 8 && journeyValidation(row)) {
            journeyHeaders.forEach((columnName, idx) => {
                db_object[columnName] = row[idx];
            });
        }
        else { console.log('Incorrect data type in this row: ' + row); }
        console.log(db_object);
    })
    .on('end', function () {
        console.log('finished');
    })
    .on('error', function (error) {
        console.log(error.message);
    });