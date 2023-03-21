const journeyValidation = (row) => {
    return row.length == 8
    const isString = (text) => {
        return typeof text === 'string' || text instanceof String
    }

    const isDate = (date) => {
        return Boolean(Date.parse(date))
    };

    const Departure = row[0]
    if (!isString(Departure) || !isDate(Departure) || Departure.length !== 19) {
        return false
    }

    const Return = row[1]
    if (!isString(Return) || !isDate(Return) || Departure.length !== 19) {
        return false
    }

    if (Departure > Return) {
        return false
    }

    const Departure_station_id = row[2]
    const Departure_station_name = row[3]
    const Return_station_id = row[4]
    const Return_station_name = row[5]

    const Covered_distance_m = Number(row[6])
    if (Covered_distance_m < 10 || isNaN(Covered_distance_m)) {
        return false
    }

    const Duration_sec = Number(row[7])
    if (Duration_sec < 10 || isNaN(Duration_sec)) {
        return false
    }


}
module.exports = { journeyValidation }