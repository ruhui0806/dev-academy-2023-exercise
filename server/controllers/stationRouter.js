const stationRouter = require('express').Router();
const Station = require('../models/station');
const Journey = require('../models/journey');
const aggregation = require('../aggregation');
const { populate } = require('../models/station');

stationRouter.get('/', (request, response) => {
    Station.find({}).then((stations) => response.json(stations));
});

stationRouter.get('/:ID', async (request, response, next) => {
    try {
        const station = await Station.findOne({ ID: request.params.ID })
        const countJourneyStartHere = await Journey.find({ Departure_station_id: request.params.ID }).count()
        const countJourneyEndHere = await Journey.find({ Return_station_id: request.params.ID }).count()
            .count()
        const aggrJourneyReturn = await Journey.aggregate(
            AggrCountParams({ 'Return_station_id': request.params.ID }, '$Departure_station_name', -1, 5)
        )
        const aggrJourneyDeparture = await Journey.aggregate(
            AggrCountParams({ 'Departure_station_id': request.params.ID }, '$Return_station_name', -1, 5)
        )
        const averageDepartunreDistance = await Journey.aggregate(
            AverageParams({ 'Departure_station_id': request.params.ID }, "$Departure_station_id"))
        const averageReturnDistance = await Journey.aggregate(
            AverageParams({ 'Return_station_id': request.params.ID }, "$Return_station_id"))

        response.json({
            currentStation: station, countJourneyStartHere: countJourneyStartHere,
            countJourneyEndHere: countJourneyEndHere, aggrJourneyReturn: aggrJourneyReturn,
            aggrJourneyDeparture: aggrJourneyDeparture, averageDepartunreDistance: averageDepartunreDistance,
            averageReturnDistance: averageReturnDistance
        });
    }
    catch (exception) {
        next(exception)
    }
});

const AggrCountParams = (matchObj, sortByKey, sortCount, limit) => {
    return [
        {
            '$match': matchObj
        }, {
            '$sortByCount': sortByKey
        }, {
            '$sort': {
                'count': sortCount
            }
        }, {
            '$limit': limit
        }
    ]
};

const AverageParams = (matchObj, groupByKey) => {
    return [
        {
            '$match': matchObj
        }, {
            '$group': {
                '_id': groupByKey,
                'averageDistance': {
                    '$avg': '$Covered_distance_m'
                }
            }
        }
    ]
}


module.exports = stationRouter;
