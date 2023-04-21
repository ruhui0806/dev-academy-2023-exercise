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
  return (
    (typeof text === "string" || text instanceof String) && text.length > 0
  );
};
const isDate = (date) => {
  return Boolean(Date.parse(date));
};

//add journey validation for csv data:
const journeyValidation = (row) => {
  if (row.length !== 8) {
    return false;
  }
  const departureDate = new Date(row[0]);
  if (!isDate(row[0]) || row[0].length !== 19) {
    // throw new Error('Incorrect date type: ' + departureDate)
    return false;
  }
  const returnDate = new Date(row[1]);
  if (!isDate(row[1]) || row[1].length !== 19) {
    // throw new Error('Incorrect date type: ' + returnDate)
    return false;
  }
  if (departureDate.getTime() > returnDate.getTime()) {
    // throw new Error('Departure date should not be later than return date');
    return false;
  }
  const Departure_station_id = Number(row[2]);
  if (Departure_station_id < 0 || !Number.isInteger(Departure_station_id)) {
    return false;
  }
  const Departure_station_name = row[3];
  if (!isString(Departure_station_name)) {
    return false;
  }

  const Return_station_id = Number(row[4]);
  if (Return_station_id < 0 || !Number.isInteger(Return_station_id)) {
    return false;
  }
  const Return_station_name = row[5];
  if (!isString(Return_station_name)) {
    return false;
  }

  const Covered_distance_m = Number(row[6]);
  if (Covered_distance_m < 10 || isNaN(Covered_distance_m)) {
    return false;
  }

  const Duration_sec = Number(row[7]);
  if (Duration_sec < 10 || isNaN(Duration_sec)) {
    return false;
  }
  return true;
};

//add station validation for csv data:
const stationValidation = (row) => {
  if (row.length !== 13) {
    return false;
  }
  // const stationFID = Number(row[0])
  // if (stationFID < 0 || !Number.isInteger(stationFID)) {
  //     return false
  // }
  const stationID = Number(row[1]);
  if (stationID < 0 || !Number.isInteger(stationID)) {
    return false;
  }
  const stationNimi = row[2];
  if (!(typeof stationNimi === "string" || stationNimi instanceof String)) {
    return false;
  }
  const stationNamn = row[3];
  if (!(typeof stationNamn === "string" || stationNamn instanceof String)) {
    return false;
  }
  const stationName = row[4];
  if (!(typeof stationName === "string" || stationName instanceof String)) {
    return false;
  }

  const stationOsoite = row[5];
  if (!(typeof stationOsoite === "string" || stationOsoite instanceof String)) {
    return false;
  }

  const stationAdress = row[6];
  if (!(typeof stationAdress === "string" || stationAdress instanceof String)) {
    return false;
  }

  // const stationKaupunki = row[7]
  // if (typeof stationKaupunki === 'string' || stationKaupunki instanceof String) { return false }

  // const stationStad = row[8]
  // if (typeof stationStad === 'string' || stationStad instanceof String) { return false }

  // const stationOperaattor = row[9]
  // if (typeof stationOperaattor === 'string' || stationOperaattor instanceof String) { return false }

  const stationKapasiteet = Number(row[10]);
  if (stationKapasiteet < 0 || !Number.isInteger(stationKapasiteet)) {
    return false;
  }
  const longitude = Number(row[11]);
  if (longitude < -180 || longitude > 180 || isNaN(longitude)) {
    return false;
  }
  const latitude = Number(row[12]);
  if (latitude < -90 || latitude > 90 || isNaN(latitude)) {
    return false;
  }

  return true;
};

//add journey validation for new journey data:
const newJourneyDataValidation = (object) => {
  const parseDate = (date) => {
    if (!isString(date) || !isDate(date)) {
      throw new Error(`In correct or missing date format: ${date}`);
    }
    return date;
  };

  const parseID = (id) => {
    if (!id || Number(id) < 0) {
      throw new Error(`In correct or missing ID format: ${id}`);
    }
    return id;
  };

  const parseName = (name) => {
    if (!isString(name)) {
      throw new Error(`In correct or missing station name: ${name}`);
    }
    return name;
  };

  const parseDistance = (distance) => {
    if (distance < 10 || isNaN(distance)) {
      throw new Error(`In correct or missing journey distance: ${distance}`);
    }
    return distance;
  };

  const parseDuration = (duration) => {
    if (duration < 10 || isNaN(duration)) {
      throw new Error(`In correct or missing journey duration: ${duration}`);
    }
    return duration;
  };

  const Departure = parseDate(object.Departure);
  const Return = parseDate(object.Return);
  const Departure_station_id = parseID(object.Departure_station_id);
  const Return_station_id = parseID(object.Return_station_id);
  const Departure_station_name = parseName(object.Departure_station_name);
  const Return_station_name = parseName(object.Return_station_name);
  const Covered_distance_m = parseDistance(object.Covered_distance_m);
  const Duration_sec = parseDuration(object.Duration_sec);
  if (Date.parse(Departure) > Date.parse(Return)) {
    throw new Error(
      `departure time${Departure} should be earlier than return time: ${Return}`
    );
  }
  return {
    Departure,
    Departure_station_id,
    Departure_station_name,
    Return,
    Return_station_id,
    Return_station_name,
    Covered_distance_m,
    Duration_sec,
  };
};
module.exports = {
  journeyValidation,
  stationValidation,
  newJourneyDataValidation,
};
