const journeyRouter = require("express").Router();
const Journey = require("../models/journey");

journeyRouter.get("/", async (request, response, next) => {
  try {
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
  } catch (exception) {
    next(exception);
  }
});

module.exports = journeyRouter;
