const stationRouter = require("express").Router();
const Station = require("../models/station");
const Journey = require("../models/journey");
const config = require("../utils/config");
stationRouter.get("/", async (request, response) => {
  const stations = await Station.find({});
  response.json(stations);
});

stationRouter.get("/:ID", async (request, response) => {
  const station = await Station.findOne({ ID: request.params.ID });
  if (station) {
    const countJourneyStartHere = await Journey.find({
      Departure_station_id: request.params.ID,
    }).count();
    const countJourneyEndHere = await Journey.find({
      Return_station_id: request.params.ID,
    }).count();
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
    const googleMapApiKey = config.REACT_APP_GOOGLE_MAPS_API_KEY;

    response.json({
      currentStation: station,
      countJourneyStartHere: countJourneyStartHere,
      countJourneyEndHere: countJourneyEndHere,
      aggrJourneyReturn: aggrJourneyReturn,
      aggrJourneyDeparture: aggrJourneyDeparture,
      averageDepartunreDistance: averageDepartunreDistance,
      averageReturnDistance: averageReturnDistance,
      REACT_APP_GOOGLE_MAP_API_KEY: googleMapApiKey,
    });
  } else if (!Number(request.params.ID)) {
    response
      .status(400)
      .send({ error: "Request params ID should be a integer." });
  } else {
    response
      .status(404)
      .send({ error: "Station with the current ID does not exist." });
  }
});

stationRouter.delete("/:ID", async (request, response) => {
  const station = await Station.findOne({ ID: request.params.ID });
  if (station) {
    await Station.findOneAndDelete({ ID: request.params.ID });
    response.status(204).end();
  } else {
    return response
      .status(400)
      .send({ error: "Request params ID should be a integer." });
  }
});
stationRouter.delete("/", async (request, response) => {
  await Station.findByIdAndRemove(request.query.objectId);
  response.status(204).end();
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
