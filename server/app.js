const express = require("express");
const app = express();

const cors = require("cors");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");
const config = require("./utils/config");
const logger = require("./utils/logger");
require("express-async-errors");
const stationRouter = require("./controllers/stationRouter");

const journeyRouter = require("./controllers/journeyRouter");
mongoose.set("strictQuery", false);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.get("/", (request, response) => {

  response.send("<h1>City Bike App!</h1>");

});
app.use(middleware.requestLogger);
app.use("/api/stations", stationRouter);

app.use("/api/journeys", journeyRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
module.exports = app;
