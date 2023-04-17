const mongoose = require("mongoose");
// const Station = require("./models/station");
const Journey = require("./models/journey");
const config = require("./utils/config");
const logger = require("./utils/logger");
mongoose.set("strictQuery", false);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

const journeyAggrByDepartureStation = (req, res, next) => {
  Journey.aggregate([
    {
      $match: {
        Departure_station_id: req.params.ID,
      },
    },
    {
      $sortByCount: "$Return_station_name",
    },
    {
      $sort: {
        count: -1,
      },
    },
    {
      $limit: 5,
    },
  ])
    .then((result) => res.json(result))
    .catch((error) => next(error));
};
const journeyAggrByReturnStation = (req, res, next) => {
  Journey.aggregate([
    {
      $match: {
        Return_station_id: req.params.ID,
      },
    },
    {
      $sortByCount: "$Departure_station_name",
    },
    {
      $sort: {
        count: -1,
      },
    },
    {
      $limit: 5,
    },
  ])
    .then((result) => res.json(result))
    .catch((error) => next(error));
};

const journeyDistAggrByDeparture = (req, res, next) => {
  Journey.aggregate([
    {
      $match: {
        Departure_station_id: req.params.ID,
      },
    },
    {
      $group: {
        _id: "$Departure_station_id",
        averageDistance: {
          $avg: "$Covered_distance_m",
        },
      },
    },
  ])
    .then((result) => res.json(result))
    .catch((error) => next(error));
};
const journeyDistAggrByReturn = (req, res, next) => {
  Journey.aggregate([
    {
      $match: {
        Return_station_id: req.params.ID,
      },
    },
    {
      $group: {
        _id: "$Return_station_id",
        averageDistance: {
          $avg: "$Covered_distance_m",
        },
      },
    },
  ])
    .then((result) => res.json(result))
    .catch((error) => next(error));
};

module.exports = {
  journeyAggrByDepartureStation,
  journeyAggrByReturnStation,
  journeyDistAggrByDeparture,
  journeyDistAggrByReturn,
};
