const journeyRouter = require("express").Router();
const Journey = require("../models/journey");
const { newJourneyDataValidation } = require("../utils/validation");
journeyRouter.get("/", async (request, response) => {
  const journeys = await Journey.find({
    Covered_distance_m: { $gte: request.query.filterByDistance },
    Duration_sec: { $gte: request.query.filterByDuration },
  })
    .sort(request.query.order)
    .skip(Number(request.query.offset))
    .limit(Number(request.query.limit));

  const journeysCount = await Journey.find({
    Covered_distance_m: { $gte: request.query.filterByDistance },
    Duration_sec: { $gte: request.query.filterByDuration },
  }).count();
  response.json({ journeys, journeysCount });

  console.log(request.query);
});

journeyRouter.post("/", async (request, response) => {
  const body = request.body;
  if (newJourneyDataValidation(body)) {
    const journey = new Journey({
      Departure: body.Departure,
      Departure_station_id: body.Departure_station_id,
      Departure_station_name: body.Departure_station_name,
      Return: body.Return,
      Return_station_id: body.Return_station_id,
      Return_station_name: body.Return_station_name,
      Covered_distance_m: body.Covered_distance_m,
      Duration_sec: body.Duration_sec,
    });
    const savedJourney = await journey.save();
    response.json(savedJourney.toJSON());
  } else {
    return response
      .status(400)
      .json({ error: "content missing || incorrect data input" });
  }
});
module.exports = journeyRouter;
