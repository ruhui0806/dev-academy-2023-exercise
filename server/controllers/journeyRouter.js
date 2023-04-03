const journeyRouter = require('express').Router();
const Journey = require('../models/journey');
const aggregation = require('../aggregation');

journeyRouter.get('/', (request, response) => {
    // request.query.order should be an array of array. e.g., sort([['Return_station_name', 'ascending']])
    // or object: request.query.order = {"Return_station_name": "descending"}
    //or string: request.query.order='-Return_station_name' //descending order
    //or string: request.query.order='Return_station_name' //ascending order

    Journey.find({}).sort(
        request.query.order
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