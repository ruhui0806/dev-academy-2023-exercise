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
  const stationIDelement = screen.getByRole("link", { name: `${station.ID}` });
  expect(stationIDelement).toBeInTheDocument();
  expect(stationIDelement).toHaveAttribute("href", `/stations/${station.ID}`);

  const stationNameElement = screen.getByRole("link", {
    name: `${station.Name}`,
  });
  expect(stationNameElement).toBeInTheDocument();
  expect(stationNameElement).toHaveAttribute("href", `/stations/${station.ID}`);

  const stationOsoiteElement = screen.getByRole("link", {
    name: `${station.Osoite}`,
  });
  expect(stationOsoiteElement).toBeInTheDocument();
  expect(stationOsoiteElement).toHaveAttribute(
    "href",
    `/stations/${station.ID}`
  );

  const stationKapasiteetElement = screen.getByRole("link", {
    name: `${station.Kapasiteet}`,
  });
  expect(stationKapasiteetElement).toBeInTheDocument();
  expect(stationKapasiteetElement).toHaveAttribute(
    "href",
    `/stations/${station.ID}`
  );

  const deleteButton = screen.getByRole("button");
  expect(deleteButton).toBeInTheDocument();
});
