const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Journey = require("../models/journey");
const { initialJourneys, JourneyInDb } = require("./test_helper");

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

test("The journey list should be paginated by setting limit(items per page), offset(skip) on the API request", async () => {
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
  const responseDelete = await api.delete(
    `/api/journeys?objectId=${testObjectId}`
  );
  const journeysAtEnd = await JourneyInDb();
  expect(responseDelete.status).toBe(204);
  expect(journeysAtEnd).toHaveLength(initialJourneys.length - 1);
});

test("A journey with invalid object ID can not be deleted", async () => {
  const testObjectId = "malformattedID";
  const responseDelete = await api.delete(
    `/api/journeys?objectId=${testObjectId}`
  );
  const journeysAtEnd = await JourneyInDb();
  expect(responseDelete.status).toBe(400);
  expect(journeysAtEnd).toHaveLength(initialJourneys.length);
});

test("A journey can be added", async () => {
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
  const journeysAtEnd = await JourneyInDb();
  expect(journeysAtEnd).toHaveLength(initialJourneys.length + 1);
}, 10000);

test("A journey does not pass newJourneyDataValidation is not added", async () => {
  const badJourney = {
    Departure: "2021-05-08TAB12:28:31",
    Departure_station_id: "001",
    Departure_station_name: "Kaivopuisto",
    Return: "2021-05-26T13:07:04",
    Return_station_id: "001",
    Return_station_name: "Kaivopuisto",
    Covered_distance_m: 3600,
    Duration_sec: 1557513,
  };
  await api.post("/api/journeys").send(badJourney).expect(500);

  const journeysAtEnd = await JourneyInDb();
  expect(journeysAtEnd).toHaveLength(initialJourneys.length);
}, 10000);

afterAll(async () => {
  await mongoose.connection.close();
});
