// const isString = (text) => {
//     return (typeof text === 'string' || text instanceof String) && text.length > 0
// }
// const parseString = (input) => {
//     if (!isString(input)) {
//         throw new Error('Incorrect or missing input')
//     }
//     return input
// }
// const isDate = (date) => {
//     return Boolean(Date.parse(date))
// };

// const parseDate = (date) => {
//     if (!isString(date) || !isDate(date) || date.length !== 19) {
//         throw new Error('Incorrect date: ' + date)
//     }
//     return Date.parse(date)
// }
// const parseIntID = (input) => {
//     parsedId = Number(input)
//     if (id < 0 || !Number.isInteger(id)) {
//         throw new Error('Incorrect id: ' + id)
//     }
//     return parsedId
// }

// const parseNumber = (input) => {
//     const parsedInput = Number(input)
//     if (input < 10 || isNaN(input)) {
//         throw new Error('Incorrect input: ' + input)
//     }
//     return parsedInput
// }

// const journeyValidation = (journeyRow) => {

//     if ('Departure' in journeyRow && 'Return' in journeyRow && 'Departure' in journeyRow && 'Departure_station_id' in journeyRow && 'Return_station_id' in journeyRow && 'Return_station_name' in journeyRow && 'Covered_distance_m' in journeyRow && 'Duration_sec' in journeyRow) {
//         const validateJourney = {
//             Departure: parseDate(journeyRow[0]),
//             Return: parseDate(journeyRow[1]),
//             Departure_station_id: parseIntID(journeyRow[2]),
//             Departure_station_name: parseString(journeyRow[3]),
//             Return_station_name: parseString(journeyRow[4]),
//             Return_station_id: parseIntID(journeyRow[5]),
//             Covered_distance_m: parseNumber(journeyRow[6]),
//             Duration_sec: parseNumber(journeyRow[7])
//         }
//         if (Departure > Return) {
//             throw new Error('peuarture time must not be earlier than return time')
//         }
//         return validateJourney
//     }
//     throw new Error('missing data')
// }

const isString = (text) => {
    return (typeof text === 'string' || text instanceof String) && text.length > 0
}
const isDate = (date) => {
    return Boolean(Date.parse(date))
};

const journeyValidation = (row) => {
    if (row.length !== 8) {
        // throw new Error('Incorrect data length:' + row);
        return false
    }
    const departureDate = new Date(row[0])
    if (!isDate(departureDate) || row[0].length !== 19) {
        // throw new Error('Incorrect date type: ' + departureDate)
        return false
    }
    const returnDate = new Date(row[1])
    if (!isDate(returnDate) || row[1].length !== 19) {
        // throw new Error('Incorrect date type: ' + returnDate)
        return false
    }
    if (departureDate > returnDate) {
        // throw new Error('Departure date should not be later than return date');
        return false
    }
    const Departure_station_id = Number(row[2])
    if (Departure_station_id < 0 || !Number.isInteger(Departure_station_id)) {
        return false
    }
    const Departure_station_name = row[3]
    if (!isString(Departure_station_name)) {
        return false
    }

    const Return_station_id = Number(row[4])
    if (Return_station_id < 0 || !Number.isInteger(Return_station_id)) {
        return false
    }
    const Return_station_name = row[5]
    if (!isString(Return_station_name)) {
        return false
    }

    const Covered_distance_m = Number(row[6])
    if (Covered_distance_m < 10 || isNaN(Covered_distance_m)) {
        return false
    }

    const Duration_sec = Number(row[7])
    if (Duration_sec < 10 || isNaN(Duration_sec)) {
        return false
    }

    return true
}

const stationValidation = (row) => {

}

module.exports = { journeyValidation }