const mongoose = require('mongoose');
const Station = require('./models/station');
const Journey = require('./models/journey');
const config = require('./utils/config');
const logger = require('./utils/logger');
mongoose.set('strictQuery', false);
mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB');
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message);
    });
const pipeline = [
    {
        '$match': {
            'Departure_station_name': 'Ympyrätalo'
        }
    }, {
        '$sortByCount': '$Return_station_name'
    }, {
        '$sort': {
            'count': -1
        }
    }
]

const journeyAggrByDepartureStation = (req, res, next) => {
    Journey.aggregate(pipeline)
        .then(response => console.log(response))
        .catch(error => {
            logger.error({
                message: 'An error occured!' + error.message
            })
        })
}
// journeyAggrByDepartureStation()
module.exports = journeyAggrByDepartureStation