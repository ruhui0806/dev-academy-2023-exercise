const journeyRouter = require('express').Router();
const Journey = require('../models/journey');
const aggregation = require('../aggregation');

const journeyPaginate = (offset, limit) => {
    return (req, res, next) => {
        req.offset = Number(offset);
        req.limit = Number(limit);
        next()
    }
}
journeyRouter.get('/', journeyPaginate(2, 4), (request, response) => {
    Journey.find({}).sort({
        Departure_station_id: -1
    }).skip(request.offset).limit(request.limit).then((journeys) => { response.json(journeys); })
})
//organize journeys by departure station id:
journeyRouter.get('/departureFrom/:departureStation', (request, response) => {
    Journey.find({ Departure_station_id: request.params.departureStation }).then(journeys => response.json(journeys));
})
journeyRouter.get('/departureFrom/:departureStation/count', (request, response) => {
    Journey.find({ Departure_station_id: request.params.departureStation }).count().then(count => response.json(count))
})

journeyRouter.get('/departureFrom/:departureStation/aggregation', aggregation.journeyAggrByDepartureStation)

journeyRouter.get('/departureFrom/:departureStation/averageDistance', aggregation.journeyDistAggrByDeparture)
//organize journeys by return station id:
journeyRouter.get('/returnAt/:returnStation', (request, response) => {
    Journey.find({ Return_station_id: request.params.returnStation }).then(journeys => response.json(journeys));
})
journeyRouter.get('/returnAt/:returnStation/count', (request, response) => {
    Journey.find({ Return_station_id: request.params.returnStation }).count().then(count => response.json(count))
})
journeyRouter.get('/returnAt/:returnStation/aggregation', aggregation.journeyAggrByReturnStation)

journeyRouter.get('/returnAt/:returnStation/averageDistance', aggregation.journeyDistAggrByReturn)
module.exports = journeyRouter;