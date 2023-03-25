const pipeline = [
    {
        '$match': {
            'Departure_station_id': '036'
        }
    }, {
        '$sortByCount': '$Return_station_name'
    }, {
        '$sort': {
            'count': -1
        }
    }
]

module.exports = pipeline