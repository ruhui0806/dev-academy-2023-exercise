const stationRouter = require('express').Router();
const Station = require('../models/station');
const Journey = require('../models/journey');
const aggregation = require('../aggregation');

stationRouter.get('/', (request, response) => {
    Station.find({}).then((stations) => response.json(stations));
});

stationRouter.get('/:ID', async (request, response, next) => {
    try {
        const station = await Station.findOne({ ID: request.params.ID })
        const countJourneyStartHere = await Journey.find({ Departure_station_id: request.params.ID }).count()
        const countJourneyEndHere = await Journey.find({ Return_station_id: request.params.ID }).count()
            .count()
        const aggrJourneyReturn = await Journey.aggregate([
            {
                '$match': {
                    'Return_station_id': request.params.ID
                }
            }, {
                '$sortByCount': '$Departure_station_name'
            }, {
                '$sort': {
                    'count': -1
                }
            }, {
                '$limit': 5
            }
        ])
        const aggrJourneyDeparture = await Journey.aggregate([
            {
                '$match': {
                    'Departure_station_id': request.params.ID
                }
            }, {
                '$sortByCount': '$Return_station_name'
            }, {
                '$sort': {
                    'count': -1
                }
            }, {
                '$limit': 5
            }
        ])
        response.json({ currentStation: station, countJourneyStartHere: countJourneyStartHere, countJourneyEndHere: countJourneyEndHere, aggrJourneyReturn: aggrJourneyReturn, aggrJourneyDeparture: aggrJourneyDeparture });
    }
    catch (exception) {
        next(exception)
    }
});

module.exports = stationRouter;
