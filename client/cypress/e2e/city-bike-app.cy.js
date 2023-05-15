describe("City Bike App pages can be opened", () => {
  it("journey page can be opened", () => {
    cy.visit("http://localhost:3000/journeys");
    cy.contains("Helsinki City Bike App");
    cy.contains("Filter journey by covered distance (km) longer than:");
    cy.contains("Filter journey by duration (min) longer than:");
    cy.contains("Departure Station");
    cy.contains("Return Station");
    cy.contains("Distance-km");
    cy.contains("Duration-min");
  });
  it("station page can be opened", () => {
    cy.visit("http://localhost:3000/stations");
    cy.contains("Helsinki City Bike App");
    cy.contains("ID");
    cy.contains("Name");
    cy.contains("Address");
    cy.contains("Capacity");
  });
  it("stationView page can be opened", () => {
    cy.visit("http://localhost:3000/stations/001");
    cy.contains("Helsinki City Bike App");
    cy.contains("ID: 001");
    cy.contains("Name: Kaivopuisto");
    cy.contains("Address: Meritori 1");
    cy.contains("The amount of journeys that start from Kaivopuisto:");
  });
});

describe("Journey list view", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/journeys");
  });
  it("Ordering per column: departure station", () => {
    cy.get("#Departure_station_name").click().wait(1000);
    cy.get("tr td:nth-child(1):first").should(
      "have.text",
      "A.I. Virtasen aukio"
    );
  });
  it("Ordering per column: return station", () => {
    cy.get("#Return_station_name").click().wait(1000);
    cy.get("tr td:nth-child(2):first").should("have.text", "Ympyrätalo");
  });
  it("Ordering per column: covered distance", () => {
    cy.get("#btn-sort-covered_distance_m").click().wait(1000);
    cy.get("tr td:nth-child(3):first").should("have.text", "0.01");
  });
  it("Ordering per column: duration", () => {
    cy.get("#btn-sort-duration_sec").click();
    cy.get("tr td:nth-child(4):first").should("have.text", "0.23");
  });
  it("Filter by journey distance", () => {
    cy.get("#filterByDistanceInput").click().type("10");
    cy.get("#btn-filter-distance").click();
    cy.get("#btn-sort-covered_distance_m").click().wait(1000);
    cy.get("tr td:nth-child(3):first").should("have.text", "10.00");
  });
  it("Filter by journey duration", () => {
    cy.get("#filterByDurationInput").click().type("10");
    cy.get("#btn-filter-duration").click();
    cy.get("#btn-sort-duration_sec").click().wait(1000);
    cy.get("tr td:nth-child(4):first").should("have.text", "10.00");
  });
});

describe("station list view", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/stations");
  });
  it("Ordering per column: ID", () => {
    cy.get("#btn-sort-id").click().wait(1000);
    cy.get("tr td:nth-child(1):first").should("have.text", "902");
  });
  it("Ordering per column: Name", () => {
    cy.get("#btn-sort-name").click().wait(1000);
    cy.get("tr td:nth-child(2):first").should(
      "have.text",
      "A.I. Virtasen aukio"
    );
  });
  it("Ordering per column: Address", () => {
    cy.get("#btn-sort-address").click().wait(1000);
    cy.get("tr td:nth-child(3):first").should(
      "have.text",
      "Aarteenetsijäntie 10"
    );
  });
  it("Ordering per column: Capacity", () => {
    cy.get("#btn-sort-capacity").click().wait(1000);
    cy.get("tr td:nth-child(4):first").should("have.text", "8");
  });
  it("Search by station name", () => {
    cy.get("#nameToSearch").click().type("helsingin");
    cy.get("tr td:nth-child(1):first").should("have.text", "045");
    cy.get("tr td:nth-child(2):first").should("have.text", "Brahen kenttä");
    cy.get("tr td:nth-child(3):first").should("have.text", "Helsinginkatu 22");
  });
});
