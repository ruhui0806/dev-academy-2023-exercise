// src/mocks/handlers.js
import { rest } from "msw";
import { initialStations, stationByID, initialJourneys } from "./test_helper";
export const handlers = [
  rest.get("/api/stations", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(initialStations));
  }),
  rest.get("/api/stations/:ID", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(stationByID));
  }),
  rest.get("api/journeys", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(initialJourneys));
  }),
];
