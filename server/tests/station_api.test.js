const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Station = require("../models/station");

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

beforeEach(async () => {
  await Station.deleteMany({});
  await Station.insertMany(initialStations);
});

const api = supertest(app);
test("stations are returned as json", async () => {
  await api
    .get("/api/stations")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 10000);

test("all stations are returned", async () => {
  const response = await api.get("/api/stations");
  expect(response.body).toHaveLength(initialStations.length);
}, 10000);

afterAll(async () => {
  await mongoose.connection.close();
});
