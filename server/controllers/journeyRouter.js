const journeyRouter = require('express').Router();
const Journey = require('../models/journey');
const aggregation = require('../aggregation');

journeyRouter.get('/', (request, response) => {
    // console.log(request)
    // request.query.order = ['Return_station_name', 'descending']
    Journey.find({}).sort(
        [request.query.order.split(',')]
    ).skip(Number(request.query.offset)).limit(Number(request.query.limit)).then((journeys) => { response.json(journeys); })
})

//organize journeys by departure station id:
journeyRouter.get('/departureFrom/:ID', (request, response) => {
    Journey.find({ Departure_station_id: request.params.ID }).then(journeys => response.json(journeys));
})
journeyRouter.get('/departureFrom/:departureStation/count', (request, response) => {
    Journey.find({ Departure_station_id: request.params.departureStation }).count().then(count => response.json(count))
})

journeyRouter.get('/departureFrom/:ID/aggregation', aggregation.journeyAggrByDepartureStation)

journeyRouter.get('/departureFrom/:ID/averageDistance', aggregation.journeyDistAggrByDeparture)
//organize journeys by return station id:
journeyRouter.get('/returnAt/:ID', (request, response) => {
    Journey.find({ Return_station_id: request.params.ID }).then(journeys => response.json(journeys));
})
journeyRouter.get('/returnAt/:returnStation/count', (request, response) => {
    Journey.find({ Return_station_id: request.params.returnStation }).count().then(count => response.json(count))
})
journeyRouter.get('/returnAt/:ID/aggregation', aggregation.journeyAggrByReturnStation)

journeyRouter.get('/returnAt/:ID/averageDistance', aggregation.journeyDistAggrByReturn)
module.exports = journeyRouter;