const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Station = require("../models/station");
const { initialStations } = require("./test_helper");

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

test("It should return 404 for trying to retrieve the nonexisting station by ID", async () => {
  const response = await api.get("/api/stations/9999");
  expect(response.status).toBe(404);
});

test("It should return 400 if the station identifier is invalid: if numbers are used then giving a string should return this error", async () => {
  const response = await api.get("/api/stations/Kaivopuisto");
  expect(response.status).toBe(400);
  expect(response.body.error).toContain(
    "Request params ID should be a integer."
  );
});

test("It should return 200 and the station info for a valid call", async () => {
  const response = await api.get("/api/stations/503");
  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty("currentStation");
  expect(response.body).toHaveProperty("countJourneyStartHere");
  expect(response.body).toHaveProperty("countJourneyEndHere");
  expect(response.body).toHaveProperty("aggrJourneyReturn");
  expect(response.body).toHaveProperty("aggrJourneyDeparture");
  expect(response.body).toHaveProperty("averageDepartunreDistance");
  expect(response.body).toHaveProperty("averageReturnDistance");
}, 10000);
afterAll(async () => {
  await mongoose.connection.close();
});
