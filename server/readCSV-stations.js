const fs = require("fs");
const { parse } = require("csv-parse");
const { stationValidation } = require("./utils/validation");
const mongoose = require("mongoose");
const Station = require("./models/station");
const config = require("./utils/config");
const logger = require("./utils/logger");

////before run the current file, run the following two commands in the terminal:
//download the csv file:
//wget https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv
//Install wget package if you have not installed yet.
//The recommended method to install wget on Mac is with Homebrew: https://brew.sh/.
//To install on Mac OS: First, install Homebrew:$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
//Then, install wget:$ brew install wget
//To install and configure wget for Windows:
// Download wget for Windows and install the package.
// Copy the wget.exe file into your C:\Windows\System32 folder.
// Open the command prompt (cmd.exe) and run wget to see if it is installed.
// change the csv file name to stations.csv:
// mv 726277c507ef4914b0aec3cbcfcbfafc_0.csv stations.csv

mongoose.set("strictQuery", false);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });
// FID,ID,Nimi,Namn,Name,Osoite,Adress,Kaupunki,Stad,Operaattor,Kapasiteet,x,y
const stationHeaders = [
  "FID",
  "ID",
  "Nimi",
  "Namn",
  "Name",
  "Osoite",
  "Adress",
  "Kaupunki",
  "Stad",
  "Operaattor",
  "Kapasiteet",
  "x",
  "y",
];
fs.createReadStream("./stations.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    let station_object = {};
    if (stationValidation(row)) {
      stationHeaders.forEach((columnName, idx) => {
        station_object[columnName] = row[idx];
      });
      logger.info(station_object);
      Station.create(station_object).catch((error) => {
        logger.error(error.message);
      });
    } else {
      logger.error("Incorrect data type in this row:" + row);
    }
  })
  .on("end", function () {
    logger.info("finished");
  })
  .on("error", function (error) {
    logger.error(error.message);
  });
