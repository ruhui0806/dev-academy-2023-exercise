const stationRouter = require('express').Router();
const Station = require('../models/station');

stationRouter.get('/', (request, response) => {
    Station.find({}).then((stations) => response.json(stations));
});
stationRouter.get('/:id', (request, response, next) => {
    Station.findOne({ ID: request.params.id })
        .then((station) => {
            if (station) {
                response.json(station);
            } else {
                response.status(404).end();
            }
        })
        .catch((error) => next(error));
});
module.exports = stationRouter;
