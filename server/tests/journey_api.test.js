const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Journey = require("../models/journey");

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

beforeEach(async () => {
  await Journey.deleteMany({});
  await Journey.insertMany(initialJourneys);
});

const api = supertest(app);
test("journeys are returned as json", async () => {
  await api
    .get("/api/journeys?offset=0&filterByDistance=0&filterByDuration=0")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 10000);

test("all journeys are returned when skip, offset, and filter equals to 0", async () => {
  const response = await api.get(
    "/api/journeys?offset=0&filterByDistance=0&filterByDuration=0"
  );
  expect(response.body.journeys).toHaveLength(initialJourneys.length);
  expect(response.body.journeysCount).toBe(initialJourneys.length);
}, 10000);

test("The journey list should be paginated with journey count on API requests by setting limit(items per page), offset(skip) for the API request", async () => {
  const response = await api.get(
    "/api/journeys?limit=5&offset=5&filterByDistance=0&filterByDuration=0"
  );
  expect(response.body.journeys).toHaveLength(5);
  expect(response.body.journeysCount).toBe(initialJourneys.length);
  const departureNameList = response.body.journeys.map(
    (j) => j.Departure_station_name
  );
  expect(departureNameList).toContain("Viiskulma");
  expect(departureNameList).toContain("Viikin tiedepuisto");
  expect(departureNameList).not.toContain("Kaivopuisto");
}, 10000);

test("Journey filteration works on the API side: only 2 journeys will be returned that is longer than 3600km and lasts longer than 100s", async () => {
  const response = await api.get(
    "/api/journeys?limit=0&offset=0&filterByDistance=3600000&filterByDuration=100"
  );
  expect(response.body.journeys).toHaveLength(2);
  expect(response.body.journeysCount).toBe(2);
}, 10000);

test("A journey can be deleted", async () => {
  const response = await api.get(
    "/api/journeys?offset=0&filterByDistance=0&filterByDuration=0"
  );
  const objectIdList = response.body.journeys.map((j) => j._id);
  const testObjectId = objectIdList[0];
  console.log(testObjectId);
  const responseDelete = await api.delete(
    `/api/journeys?objectId=${testObjectId}`
  );
  expect(responseDelete.status).toBe(204);
});
test("A journey can be created", async () => {
  const newJourney = {
    Departure: "2021-05-08T12:28:31",
    Departure_station_id: "001",
    Departure_station_name: "Kaivopuisto",
    Return: "2021-05-26T13:07:04",
    Return_station_id: "001",
    Return_station_name: "Kaivopuisto",
    Covered_distance_m: 3600,
    Duration_sec: 1557513,
  };
  await api
    .post("/api/journeys")
    .send(newJourney)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const response = await api.get(
    "/api/journeys?offset=0&filterByDistance=0&filterByDuration=0"
  );
  expect(response.body.journeys).toHaveLength(initialJourneys.length + 1);
}, 10000);

afterAll(async () => {
  await mongoose.connection.close();
});
