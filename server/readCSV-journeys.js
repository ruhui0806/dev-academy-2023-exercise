const fs = require("fs");
const { parse } = require("csv-parse");
const { journeyValidation } = require("./utils/validation");
const mongoose = require("mongoose");
// const Station = require("./models/station");
const Journey = require("./models/journey");
const config = require("./utils/config");
const logger = require("./utils/logger");
//download the required files:
//wget https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv
//wget https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv
//wget https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv

mongoose.set("strictQuery", false);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

// Departure, Return, Departure station id, Departure station name, Return station id, Return station name, Covered distance(m), Duration(sec.)
const journeyHeaders = [
  "Departure",
  "Return",
  "Departure_station_id",
  "Departure_station_name",
  "Return_station_id",
  "Return_station_name",
  "Covered_distance_m",
  "Duration_sec",
];

let failedRows = 0;
let journeyRows = [];
fs.createReadStream("./2021-05.csv", { highWaterMark: 8 * 1024 })
  .pipe(
    parse({
      delimiter: ",",
      from_line: 2,
      skip_empty_lines: true,
    })
  )
  .on("data", function (row) {
    let journey_object = {};
    if (journeyValidation(row)) {
      journeyHeaders.forEach((columnName, idx) => {
        journey_object[columnName] = row[idx];
      });
      journey_object.Covered_distance_m = Number(
        journey_object.Covered_distance_m
      );
      journey_object.Duration_sec = Number(journey_object.Duration_sec);
      journeyRows.push(journey_object);
    } else {
      failedRows++;
    }
  })
  .on("end", function () {
    logger.info("finished");
    logger.info("failed rows currently: " + failedRows);
    logger.info("Journeys saved:", journeyRows.length);
    Journey.insertMany(journeyRows)
      .then(function () {
        console.log("Data inserted"); // Success
      })
      .catch(function (error) {
        console.log(error); // Failure
      });
  })
  .on("error", function (error) {
    logger.error(error.message);
    logger.info("failed rows currently: " + failedRows);
  });

//node readCSV-journeys.js
