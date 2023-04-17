const stationRouter = require("express").Router();
const Station = require("../models/station");
const Journey = require("../models/journey");

stationRouter.get("/", async (request, response) => {
  const stations = await Station.find({});
  response.json(stations);
});

stationRouter.delete("/:ID", async (request, response) => {
  await Station.findOneAndDelete({ ID: request.params.ID });
  response.status(204).end();
});

stationRouter.get("/:ID", async (request, response, next) => {
  const station = await Station.findOne({ ID: request.params.ID });
  if (station) {
    const countJourneyStartHere = await Journey.find({
      Departure_station_id: request.params.ID,
    }).count();
    const countJourneyEndHere = await Journey.find({
      Return_station_id: request.params.ID,
    })
      .count()
      .count();
    const aggrJourneyReturn = await Journey.aggregate(
      AggrCountParams(
        { Return_station_id: request.params.ID },
        "$Departure_station_name",
        -1,
        5
      )
    );
    const aggrJourneyDeparture = await Journey.aggregate(
      AggrCountParams(
        { Departure_station_id: request.params.ID },
        "$Return_station_name",
        -1,
        5
      )
    );
    const averageDepartunreDistance = await Journey.aggregate(
      AverageParams(
        { Departure_station_id: request.params.ID },
        "$Departure_station_id"
      )
    );
    const averageReturnDistance = await Journey.aggregate(
      AverageParams(
        { Return_station_id: request.params.ID },
        "$Return_station_id"
      )
    );

    response.json({
      currentStation: station,
      countJourneyStartHere: countJourneyStartHere,
      countJourneyEndHere: countJourneyEndHere,
      aggrJourneyReturn: aggrJourneyReturn,
      aggrJourneyDeparture: aggrJourneyDeparture,
      averageDepartunreDistance: averageDepartunreDistance,
      averageReturnDistance: averageReturnDistance,
    });
  } else {
    response.status(404).send({ error: "unknown endpoint" });
  }
});

const AggrCountParams = (matchObj, sortByKey, sortCount, limit) => {
  return [
    {
      $match: matchObj,
    },
    {
      $sortByCount: sortByKey,
    },
    {
      $sort: {
        count: sortCount,
      },
    },
    {
      $limit: limit,
    },
  ];
};

const AverageParams = (matchObj, groupByKey) => {
  return [
    {
      $match: matchObj,
    },
    {
      $group: {
        _id: groupByKey,
        averageDistance: {
          $avg: "$Covered_distance_m",
        },
      },
    },
  ];
};

module.exports = stationRouter;
