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
        response.json({ currentStation: station, countJourneyStartHere: countJourneyStartHere, countJourneyEndHere: countJourneyEndHere });
    }
    catch (exception) {
        next(exception)
    }
});
stationRouter.get('/:ID/returnAggregation', aggregation.journeyAggrByReturnStation)
stationRouter.get('/:ID/deparAggregation', aggregation.journeyAggrByDepartureStation)

stationRouter.get('/:ID/distAggrByReturn', aggregation.journeyDistAggrByReturn)
stationRouter.get('/:ID/distAggrByDeparture', aggregation.journeyDistAggrByDeparture)

module.exports = stationRouter;
