const { journeyValidation } = require("../utils/validation");

describe("journey validation", () => {
  test("It should accept a valid trip", () => {
    const journeyRow =
      "2021-05-31T23:57:25,2021-06-01T00:05:46,094,Laajalahden aukio,100,Teljäntie,2043,500";
    const parsedJourneyRow = journeyRow.split(",");
    const result = journeyValidation(parsedJourneyRow);
    expect(result).toBe(true);
  });
  test("It should reject a journey where departure time is not a parseable DateTime", () => {
    const journeyRow =
      "2021-05-31ABC23:57:25,2021-06-01T00:05:46,094,Laajalahden aukio,100,Teljäntie,2043,500";
    const parsedJourneyRow = journeyRow.split(",");
    const result = journeyValidation(parsedJourneyRow);
    expect(result).toBe(false);
  });
  test("It should reject a journey where arrival time is not a parseable DateTime", () => {
    const journeyRow =
      "2021-05-31T23:57:25,2021-06-0100:05:46,094,Laajalahden aukio,100,Teljäntie,2043,500";
    const parsedJourneyRow = journeyRow.split(",");
    const result = journeyValidation(parsedJourneyRow);
    expect(result).toBe(false);
  });
  test("It should reject a journey where arrival happens before departure", () => {
    const journeyRow =
      "2021-06-03T23:57:25,2021-06-01T00:05:46,094,Laajalahden aukio,100,Teljäntie,2043,500";
    const parsedJourneyRow = journeyRow.split(",");
    const result = journeyValidation(parsedJourneyRow);
    expect(result).toBe(false);
  });
  test("It should reject if a departure station id is not a positive integer (float)", () => {
    const journeyRow =
      "2021-05-31T23:57:25,2021-06-01T00:05:46,0.94,Laajalahden aukio,100,Teljäntie,2043,500";
    const parsedJourneyRow = journeyRow.split(",");
    const result = journeyValidation(parsedJourneyRow);
    expect(result).toBe(false);
  });
  test("It should reject if a return station id is not a positive integer (negative integer)", () => {
    const journeyRow =
      "2021-05-31T23:57:25,2021-06-01T00:05:46,094,Laajalahden aukio,-100,Teljäntie,2043,500";
    const parsedJourneyRow = journeyRow.split(",");
    const result = journeyValidation(parsedJourneyRow);
    expect(result).toBe(false);
  });
  test("It should reject if a departure station id is not a positive integer (string)", () => {
    const journeyRow =
      "2021-05-31T23:57:25,2021-06-01T00:05:46,A94,Laajalahden aukio,B100,Teljäntie,2043,500";
    const parsedJourneyRow = journeyRow.split(",");
    const result = journeyValidation(parsedJourneyRow);
    expect(result).toBe(false);
  });
  test("It should reject if duration of the trip is not a positive integer (string)", () => {
    const journeyRow =
      "2021-05-31T23:57:25,2021-06-01T00:05:46,094,Laajalahden aukio,100,Teljäntie,20A43,500";
    const parsedJourneyRow = journeyRow.split(",");
    const result = journeyValidation(parsedJourneyRow);
    expect(result).toBe(false);
  });
  test("It should reject if length of the trip is not a positive integer (string)", () => {
    const journeyRow =
      "2021-05-31T23:57:25,2021-06-01T00:05:46,094,Laajalahden aukio,100,Teljäntie,2043,50B0";
    const parsedJourneyRow = journeyRow.split(",");
    const result = journeyValidation(parsedJourneyRow);
    expect(result).toBe(false);
  });
  test("It should reject a trip that is less than 10 seconds", () => {
    const journeyRow =
      "2021-05-31T23:57:25,2021-06-01T00:05:46,094,Laajalahden aukio,100,Teljäntie,2043,5";
    const parsedJourneyRow = journeyRow.split(",");
    const result = journeyValidation(parsedJourneyRow);
    expect(result).toBe(false);
  });
  test("It should reject a trip that is less than 10 meters", () => {
    const journeyRow =
      "2021-05-31T23:57:25,2021-06-01T00:05:46,094,Laajalahden aukio,100,Teljäntie,2,500";
    const parsedJourneyRow = journeyRow.split(",");
    const result = journeyValidation(parsedJourneyRow);
    expect(result).toBe(false);
  });
});
