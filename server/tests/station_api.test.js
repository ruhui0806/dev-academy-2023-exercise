const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Station = require("../models/station");
const { initialStations, stationInDb } = require("./test_helper");

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
  const response = await api.get("/api/stations/001");

  expect(response.status).toBe(200);
  expect(response.body.currentStation).toHaveProperty("Name", "Kaivopuisto");
  expect(response.body.currentStation).toHaveProperty("Osoite", "Meritori 1");
  expect(response.body.currentStation).toHaveProperty("x", "24.9502114714031");
  expect(response.body.currentStation).toHaveProperty("y", "60.155369615074");
  expect(response.body).toHaveProperty("currentStation");
  expect(response.body).toHaveProperty("countJourneyStartHere", 2);
  expect(response.body).toHaveProperty("countJourneyEndHere");
  expect(response.body).toHaveProperty("aggrJourneyReturn");
  expect(response.body).toHaveProperty("aggrJourneyDeparture");
  expect(response.body).toHaveProperty("averageDepartunreDistance", [
    { _id: "001", averageDistance: 3680771 },
  ]);
  expect(response.body).toHaveProperty("averageReturnDistance");
}, 10000);
test("A station can be deleted with a valid objectId", async () => {
  const response = await api.get("/api/stations");
  const objectIdList = response.body.map((s) => s._id);
  const testObjectId = objectIdList[0];
  const responseDelete = await api.delete(
    `/api/stations?objectId=${testObjectId}`
  );
  const stationAtEnd = await stationInDb();
  expect(responseDelete.status).toBe(204);
  expect(stationAtEnd).toHaveLength(initialStations.length - 1);
});
test("It should return 400 for trying to delete a nonexisting station by objectId", async () => {
  const testObjectId = "malformattedID";
  const responseDelete = await api.delete(
    `/api/stations?objectId=${testObjectId}`
  );
  const stationAtEnd = await stationInDb();
  expect(responseDelete.status).toBe(400);
  expect(stationAtEnd).toHaveLength(initialStations.length);
});
test("A station can be deleted with a valid ID", async () => {
  const testObjectID = "001";
  const responseDelete = await api.delete(`/api/stations/${testObjectID}`);
  const stationAtEnd = await stationInDb();
  expect(responseDelete.status).toBe(204);
  expect(stationAtEnd).toHaveLength(initialStations.length - 1);
});

test("It should return 400 for trying to delete a nonexisting station by objectId", async () => {
  const testObjectID = "malformattedID";
  const responseDelete = await api.delete(`/api/stations/${testObjectID}`);
  const stationAtEnd = await stationInDb();
  expect(responseDelete.status).toBe(400);
  expect(responseDelete.body.error).toContain(
    "Request params ID should be a integer."
  );
  expect(stationAtEnd).toHaveLength(initialStations.length);
});
afterAll(async () => {
  await mongoose.connection.close();
});
