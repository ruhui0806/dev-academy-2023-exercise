import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Stations from "../pages/Stations";
import { BrowserRouter as Router } from "react-router-dom";

test("render stations page", async () => {
  render(
    <Router>
      <Stations />
    </Router>
  );
  screen.debug();
  const stationTable = screen.getByRole("table");
  expect(stationTable).toBeInTheDocument();

  const stationElement1 = await screen.findByRole("link", {
    name: "Kaivopuisto",
  });
  expect(stationElement1).toBeInTheDocument();

  const stationsElement2 = await screen.findByRole("link", {
    name: "Central Railway Station/West",
  });
  expect(stationsElement2).toBeInTheDocument();
});
