import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import StationRow from "../components/StationRow";
import { BrowserRouter as Router } from "react-router-dom";
// import userEvent from "@testing-library/user-event";

test("render stationRow", () => {
  const mockHandler = jest.fn();
  const station = {
    ID: "123",
    Name: "test station",
    Osoite: "test address",
    Kapasiteet: "20",
    _id: "test-station-id",
  };
  render(
    <Router>
      <StationRow
        station={station}
        key={station.ID}
        deleteStation={mockHandler(station._id)}
      />
    </Router>
  );
  screen.debug();
  const element = screen.getByText("test station");
  expect(element).toBeDefined();
});
