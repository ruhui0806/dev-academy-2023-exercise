const fs = require('fs');
const { parse } = require('csv-parse');

// Departure,Return,Departure station id,Departure station name,Return station id,Return station name,Covered distance (m),Duration (sec.)
const csv_headers = [
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
        csv_headers.forEach((columnName, idx) => {
            db_object[columnName] = row[idx];
        });
        console.log(db_object);
    })
    .on('end', function () {
        console.log('finished');
    })
    .on('error', function (error) {
        console.log(error.message);
    });
