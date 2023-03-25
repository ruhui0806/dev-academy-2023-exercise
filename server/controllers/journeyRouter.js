const journeyRouter = require('express').Router();
const Journey = require('../models/journey');
const aggregation = require('../aggregation');

journeyRouter.get('/', async (request, response) => {
    const journeys = await Journey.find({})
    response.json(journeys);
    // Journey.find({}).then(journeys => response.json(journeys));
})

journeyRouter.get('/departureFrom/:departureStation', (request, response) => {
    Journey.find({ Departure_station_id: request.params.departureStation }).then(journeys => response.json(journeys));
})
journeyRouter.get('/departureFrom/:departureStation/count', (request, response) => {
    Journey.find({ Departure_station_id: request.params.departureStation }).count().then(journeys => response.json(journeys))
})
journeyRouter.get('/departureFrom/:departureStation/aggregation', aggregation.journeyAggrByDepartureStation)


journeyRouter.get('/returnFrom/:returnStation', (request, response) => {
    Journey.find({ Return_station_id: request.params.returnStation }).then(journeys => response.json(journeys));
})
journeyRouter.get('/returnFrom/:returnStation/count', (request, response) => {
    Journey.find({ Return_station_id: request.params.returnStation }).count().then(journeys => response.json(journeys))
})
journeyRouter.get('/returnFrom/:returnStation/aggregation', aggregation.journeyAggrByReturnStation)
module.exports = journeyRouter;