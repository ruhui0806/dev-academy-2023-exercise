const journeyRouter = require("express").Router();
const Journey = require("../models/journey");
const aggregation = require("../aggregation");

journeyRouter.get("/", (request, response) => {
  Journey.find({
    Covered_distance_m: { $gte: request.query.filterByDistance },
    Duration_sec: { $gte: request.query.filterByDuration },
  })
    .sort(request.query.order)
    .skip(Number(request.query.offset))
    .limit(Number(request.query.limit))
    .then((journeys) => {
      response.json(journeys);
    });
});

module.exports = journeyRouter;
