const Journey = require("../models/journey");
const Station = require("../models/station");
const initialJourneys = [
  {
    Departure: "2021-05-08T12:28:31",
    Departure_station_id: "001",
    Departure_station_name: "Kaivopuisto",
    Return: "2021-05-26T13:07:04",
    Return_station_id: "997",
    Return_station_name: "Workshop Helsinki",
    Covered_distance_m: 3680771,
    Duration_sec: 1557495,
  },
  {
    Departure: "2021-05-08T12:28:31",
    Departure_station_id: "001",
    Departure_station_name: "Kaivopuisto",
    Return: "2021-05-26T13:07:04",
    Return_station_id: "997",
    Return_station_name: "Workshop Helsinki",
    Covered_distance_m: 3680771,
    Duration_sec: 1557495,
  },
  {
    Departure: "2021-05-31T23:46:14",
    Departure_station_id: "137",
    Departure_station_name: "Arabian kauppakeskus",
    Return: "2021-05-31T23:55:58",
    Return_station_id: "044",
    Return_station_name: "Sörnäinen (M)",
    Covered_distance_m: 1970,
    Duration_sec: 582,
  },
  {
    Departure: "2021-05-31T23:29:30",
    Departure_station_id: "041",
    Departure_station_name: "Ympyrätalo",
    Return: "2021-05-31T23:49:01",
    Return_station_id: "028",
    Return_station_name: "Lastenlehto",
    Covered_distance_m: 2717,
    Duration_sec: 1166,
  },
  {
    Departure: "2021-05-31T23:56:44",
    Departure_station_id: "123",
    Departure_station_name: "Näkinsilta",
    Return: "2021-06-01T00:03:26",
    Return_station_id: "121",
    Return_station_name: "Vilhonvuorenkatu",
    Covered_distance_m: 1025,
    Duration_sec: 399,
  },
  {
    Departure: "2021-05-31T23:45:26",
    Departure_station_id: "264",
    Departure_station_name: "Eränkävijäntori",
    Return: "2021-06-01T00:12:04",
    Return_station_id: "267",
    Return_station_name: "Roihupelto",
    Covered_distance_m: 3134,
    Duration_sec: 1597,
  },
  {
    Departure: "2021-05-31T23:56:23",
    Departure_station_id: "004",
    Departure_station_name: "Viiskulma",
    Return: "2021-06-01T00:29:58",
    Return_station_id: "065",
    Return_station_name: "Hernesaarenranta",
    Covered_distance_m: 4318,
    Duration_sec: 2009,
  },
  {
    Departure: "2021-05-31T23:23:34",
    Departure_station_id: "042",
    Departure_station_name: "Haapaniemenkatu",
    Return: "2021-05-31T23:49:44",
    Return_station_id: "147",
    Return_station_name: "Käpylän asema",
    Covered_distance_m: 4712,
    Duration_sec: 1564,
  },
  {
    Departure: "2021-05-31T23:05:22",
    Departure_station_id: "239",
    Departure_station_name: "Viikin tiedepuisto",
    Return: "2021-05-31T23:12:55",
    Return_station_id: "240",
    Return_station_name: "Viikin normaalikoulu",
    Covered_distance_m: 1403,
    Duration_sec: 452,
  },
  {
    Departure: "2021-05-31T22:51:17",
    Departure_station_id: "012",
    Departure_station_name: "Kanavaranta",
    Return: "2021-05-31T23:01:09",
    Return_station_id: "026",
    Return_station_name: "Kamppi (M)",
    Covered_distance_m: 1894,
    Duration_sec: 592,
  },
  {
    Departure: "2021-05-31T22:48:58",
    Departure_station_id: "235",
    Departure_station_name: "Katariina Saksilaisen katu",
    Return: "2021-05-31T22:59:00",
    Return_station_id: "235",
    Return_station_name: "Katariina Saksilaisen katu",
    Covered_distance_m: 1660,
    Duration_sec: 598,
  },
  {
    Departure: "2021-05-31T22:38:11",
    Departure_station_id: "123",
    Departure_station_name: "Näkinsilta",
    Return: "2021-05-31T22:46:47",
    Return_station_id: "022",
    Return_station_name: "Rautatientori / länsi",
    Covered_distance_m: 1705,
    Duration_sec: 511,
  },
];
const initialStations = [
  {
    FID: "2",
    Name: "Keilalahti",
    Nimi: "Keilalahti",
    Namn: "Kägelviken",
    Osoite: "Keilalahdentie 2",
    Adress: "Kägelviksvägen 2",
    Kaupunki: "Espoo",
    Stad: "Esbo",
    Operaattor: "CityBike Finland",
    Kapasiteet: "28",
    x: "24.827467",
    y: "60.171524",
    ID: "503",
  },
  {
    FID: "3",
    Name: "Westendinasema",
    Nimi: "Westendinasema",
    Namn: "Westendstationen",
    Osoite: "Westendintie 1",
    Adress: "Westendvägen 1",
    Kaupunki: "Espoo",
    Stad: "Esbo",
    Operaattor: "CityBike Finland",
    Kapasiteet: "16",
    x: "24.805758",
    y: "60.168266",
    ID: "505",
  },
  {
    FID: "4",
    Name: "Golfpolku",
    Nimi: "Golfpolku",
    Namn: "Golfstigen",
    Osoite: "Golfpolku 3",
    Adress: "Golfstigen 3",
    Kaupunki: "Espoo",
    Stad: "Esbo",
    Operaattor: "CityBike Finland",
    Kapasiteet: "16",
    x: "24.796136",
    y: "60.168143",
    ID: "507",
  },
  {
    FID: "5",
    Name: "Revontulentie",
    Nimi: "Revontulentie",
    Namn: "Norrskensvägen",
    Osoite: "Revontulentie 10",
    Adress: "Norrskensvägen 10",
    Kaupunki: "Espoo",
    Stad: "Esbo",
    Operaattor: "CityBike Finland",
    Kapasiteet: "30",
    x: "24.802938",
    y: "60.171551",
    ID: "509",
  },
  {
    FID: "1",
    Name: "Hanasaari",
    Nimi: "Hanasaari",
    Namn: "Hanaholmen",
    Osoite: "Hanasaarenranta 1",
    Adress: "Hanaholmsstranden 1",
    Kaupunki: "Espoo",
    Stad: "Esbo",
    Operaattor: "CityBike Finland",
    Kapasiteet: "10",
    x: "24.840319",
    y: "60.16582",
    ID: "501",
  },
  {
    FID: "7",
    Name: "Hakalehto",
    Nimi: "Hakalehto",
    Namn: "Hagliden",
    Osoite: "Merituulentie 18",
    Adress: "Havsvindsvägen 18",
    Kaupunki: "Espoo",
    Stad: "Esbo",
    Operaattor: "CityBike Finland",
    Kapasiteet: "24",
    x: "24.79139",
    y: "60.173567",
    ID: "513",
  },
  {
    FID: "9",
    Name: "Länsituuli",
    Nimi: "Länsituuli",
    Namn: "Västanvinden",
    Osoite: "Länsituulenkuja 3",
    Adress: "Västanvindsgränden 3",
    Kaupunki: "Espoo",
    Stad: "Esbo",
    Operaattor: "CityBike Finland",
    Kapasiteet: "24",
    x: "24.802049",
    y: "60.175358",
    ID: "517",
  },
  {
    FID: "10",
    Name: "Tuulimäki",
    Nimi: "Tuulimäki",
    Namn: "Väderbacken",
    Osoite: "Itätuulenkuja 11",
    Adress: "Östanvindsgränden 11",
    Kaupunki: "Espoo",
    Stad: "Esbo",
    Operaattor: "CityBike Finland",
    Kapasiteet: "18",
    x: "24.806051",
    y: "60.174144",
    ID: "518",
  },
  {
    FID: "11",
    Name: "Tapionaukio",
    Nimi: "Tapionaukio",
    Namn: "Tapioplatsen",
    Osoite: "Tapionaukio 9",
    Adress: "Tapioplatsen 9",
    Kaupunki: "Espoo",
    Stad: "Esbo",
    Operaattor: "CityBike Finland",
    Kapasiteet: "26",
    x: "24.805825",
    y: "60.176168",
    ID: "519",
  },
  {
    FID: "12",
    Name: "Kulttuuriaukio",
    Nimi: "Kulttuuriaukio",
    Namn: "Kulturplatsen",
    Osoite: "Kulttuuriaukio 2",
    Adress: "Kulturplatsen 2",
    Kaupunki: "Espoo",
    Stad: "Esbo",
    Operaattor: "CityBike Finland",
    Kapasiteet: "30",
    x: "24.803942",
    y: "60.177588",
    ID: "521",
  },
  {
    FID: "13",
    Name: "Ahertajantie",
    Nimi: "Ahertajantie",
    Namn: "Flitarvägen",
    Osoite: "Ahertajantie 1",
    Adress: "Flitargränden 1",
    Kaupunki: "Espoo",
    Stad: "Esbo",
    Operaattor: "CityBike Finland",
    Kapasiteet: "20",
    x: "24.797984",
    y: "60.17875",
    ID: "523",
  },
  {
    FID: "14",
    Name: "Mäntyviita",
    Nimi: "Mäntyviita",
    Namn: "Tallbysket",
    Osoite: "Mäntyviita 2",
    Adress: "Tallbysket 2",
    Kaupunki: "Espoo",
    Stad: "Esbo",
    Operaattor: "CityBike Finland",
    Kapasiteet: "10",
    x: "24.810974",
    y: "60.178702",
    ID: "525",
  },
];

const JourneyInDb = async () => {
  const journeys = await Journey.find({});
  return journeys.map((j) => j.toJSON());
};

const stationInDb = async () => {
  const stations = await Station.find({});
  return stations.map((s) => s.toJSON());
};
module.exports = { initialJourneys, initialStations, JourneyInDb, stationInDb };
