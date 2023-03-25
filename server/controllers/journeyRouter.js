const journeyRouter = require('express').Router();
const Journey = require('../models/journey');
const aggregation = require('../aggregation');

journeyRouter.get('/', async (request, response) => {
    const journeys = await Journey.find({})
    response.json(journeys);
    // Journey.find({}).then(journeys => response.json(journeys));
})

journeyRouter.get('/:departureStation', (request, response) => {
    Journey.find({ Departure_station_name: request.params.departureStation }).then(journeys => response.json(journeys));
})
journeyRouter.get('/:departureStation/aggregation', aggregation.journeyAggrByDepartureStation)
module.exports = journeyRouter;