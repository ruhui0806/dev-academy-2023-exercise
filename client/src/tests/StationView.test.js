import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import StationView from "../pages/StationView";
import { BrowserRouter as Router } from "react-router-dom";
import { renderHook } from "@testing-library/react-hooks";
test("render stationView page", async () => {
  render(
    <Router>
      <StationView />
    </Router>
  );
  screen.debug();
  const stationViewPageElement = await screen.getByRole("cell", {
    name: "Kaivopuisto",
  });
  expect(stationViewPageElement).toBeInTheDocument();
});
