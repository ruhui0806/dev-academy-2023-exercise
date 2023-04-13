const journeyRouter = require("express").Router();
const Journey = require("../models/journey");
const aggregation = require("../aggregation");

journeyRouter.get("/", (request, response) => {
  Journey.find({})
    .sort(request.query.order)
    .skip(Number(request.query.offset))
    .limit(Number(request.query.limit))
    .then((journeys) => {
      response.json(journeys);
    });
});

module.exports = journeyRouter;
