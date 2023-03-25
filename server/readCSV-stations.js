const fs = require('fs');
const { parse } = require('csv-parse');
const { stationValidation } = require('./utils/validation')
const mongoose = require('mongoose');
const Station = require('./models/station');

const config = require('./utils/config');
const logger = require('./utils/logger');

////before run the current file, run the following two commands in the terminal:
//download the csv file:
//wget https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv
//change the csv file name to stations.csv:
//mv 726277c507ef4914b0aec3cbcfcbfafc_0.csv stations.csv

mongoose.set('strictQuery', false);
mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB');
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message);
    });
// FID,ID,Nimi,Namn,Name,Osoite,Adress,Kaupunki,Stad,Operaattor,Kapasiteet,x,y
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
            logger.info(station_object);
            Station.create(station_object).catch(error => {
                console.log(error);
            })
        }
        else { logger.error('Incorrect data type in this row:' + row); }
    })
    .on('end', function () {
        logger.info('finished');
    })
    .on('error', function (error) {
        logger.error(error.message);
    });

// // Departure, Return, Departure station id, Departure station name, Return station id, Return station name, Covered distance(m), Duration(sec.)
// const journeyHeaders = [
//     'Departure',
//     'Return',
//     'Departure_station_id',
//     'Departure_station_name',
//     'Return_station_id',
//     'Return_station_name',
//     'Covered_distance_m',
//     'Duration_sec',
// ];
// // const parseOptions = (chunkSize, count) => {
// //     let parseObjList = []
// //     for (let i = 0; i < (count / chunkSize); i++) {
// //         const from_line = (i * chunkSize) + 1
// //         const to_line = (i + 1) * chunkSize;
// //         let parseObj = {
// //             delimiter: ',',
// //             from_line: from_line,
// //             to_line: to_line,
// //             skip_empty_lines: true
// //         }
// //         parseObjList.push(parseObj);
// //     }
// //     return parseObjList;
// // }
// // delimiter: ",",
// // from_line: 1, // it will read from line one
// // to_line: 5 // to line 5 and skip everything that comes after line number 5, you may remove it if you want to read complete file

// // journey_object.Covered_distance_m = Number(journey_object.Covered_distance_m)
// // journey_object.Duration_sec = Number(journey_object.Duration_sec)
// // .pipe(parse({ delimiter: ',', from_line: startLine, to_line: startLine + chunkSize }))
// // function parseJourney(filepath) {
// //     const count = 820000
// //     const chunkSize = 10000;
// //     let failedRows = 0;
// //     let journeyRows = [];
// //     const parseObjList = parseOptions(chunkSize, count)
// //     logger.info('starting parsing');
// //     for (let i = 0; i < parseObjList.length; i++) {
// //         fs.createReadStream(filepath, { highWaterMark: 1024 })
// //             .pipe(parse(parseObjList[i]))
// //             .on('data', function (row) {
// //                 let journey_object = {};
// //                 if (journeyValidation(row)) {
// //                     journeyHeaders.forEach((columnName, idx) => {
// //                         journey_object[columnName] = row[idx];
// //                     });
// //                     // logger.info(journey_object);
// //                     // Journey.create(journey_object).catch(error => {
// //                     //     logger.error(error);
// //                     // })
// //                     journeyRows.push(journey_object);
// //                 } else {
// //                     failedRows++;
// //                 }
// //             })
// //             .on('end', function () {
// //                 logger.info('chunk finished');
// //                 logger.info('failed rows currently: ' + failedRows);
// //             })
// //             .on('error', function (error) {
// //                 logger.info('failed rows currently: ' + failedRows);
// //                 logger.error(error.message);
// //             });
// //     }
// //     logger.info('Journeys saved:', journeyRows.length);
// // }
// // parseJourney('./2021-05.csv')
// let failedRows = 0;
// let journeyRows = [];
// fs.createReadStream('./2021-05.csv', { highWaterMark: 8 * 1024 })
//     .pipe(parse({
//         delimiter: ',',
//         from_line: 2,
//         skip_empty_lines: true
//     }))
//     .on('data', function (row) {
//         let journey_object = {};
//         if (journeyValidation(row)) {
//             journeyHeaders.forEach((columnName, idx) => {
//                 journey_object[columnName] = row[idx];
//             });
//             journeyRows.push(journey_object);
//         }
//         else { failedRows++; }
//     })
//     .on('end', function () {
//         logger.info('finished');
//         logger.info('failed rows currently: ' + failedRows);
//         logger.info('Journeys saved:', journeyRows.length);
//         Journey.insertMany(journeyRows).then(function () {
//             console.log("Data inserted")  // Success
//         }).catch(function (error) {
//             console.log(error)      // Failure
//         });
//     })
//     .on('error', function (error) {
//         logger.error(error.message);
//         logger.info('failed rows currently: ' + failedRows);
//     });


