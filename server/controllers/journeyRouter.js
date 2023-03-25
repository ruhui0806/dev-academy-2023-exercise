const journeyRouter = require('express').Router();
const Journey = require('../models/journey');

journeyRouter.get('/', async (request, response) => {
    Journey.find({}).then(journeys => response.json(journeys));
})
module.exports = journeyRouter;