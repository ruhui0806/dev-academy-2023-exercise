import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import JourneyRow from "../components/JourneyRow";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
test("render JourneyRow", () => {
  const journey = {
    Departure_station_id: "989",
    Departure_station_name: "Test Departure Station Name",
    Return_station_id: "797",
    Return_station_name: "Test Return Station Name",
    Covered_distance_m: "100",
    Duration_sec: "1000",
  };
  render(
    <Router>
      <JourneyRow journey={journey} key="this-is-a-test-id" />
    </Router>
  );
  const element = screen.getByText("Test Departure Station Name");
  expect(element).toBeDefined();
});

test("click the delete button calls event handler once and calls window confirm once", async () => {
  const mockHandler = jest.fn();
  const journey = {
    _id: "test-id",
    Departure_station_id: "989",
    Departure_station_name: "Test Departure Station Name",
    Return_station_id: "797",
    Return_station_name: "Test Return Station Name",
    Covered_distance_m: "100",
    Duration_sec: "1000",
  };
  render(
    <Router>
      <JourneyRow
        journey={journey}
        key="this-is-a-test-id"
        deleteJourney={mockHandler(journey._id)}
      />
    </Router>
  );
  screen.debug();
  const element = screen.getByText("Test Departure Station Name");
  expect(element).toBeDefined();

  const user = userEvent.setup();
  const button = screen.getByRole("button");
  const confirmMock = jest.spyOn(window, "confirm").mockImplementation();
  await user.click(button);
  expect(mockHandler.mock.calls).toHaveLength(1);
  expect(confirmMock).toHaveBeenCalledTimes(1);
});
