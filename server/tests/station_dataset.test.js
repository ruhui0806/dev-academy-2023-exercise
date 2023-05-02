const { stationValidation } = require("../utils/validation");
describe("validation station", () => {
  //FID,ID,Nimi,Namn,Name,Osoite,Adress,Kaupunki,Stad,Operaattor,Kapasiteet,x,y
  test("It should accept a valid station", () => {
    const stationRow =
      "1,501,Hanasaari,Hanaholmen,Hanasaari,Hanasaarenranta 1,Hanaholmsstranden 1,Espoo,Esbo,CityBike Finland,10,24.840319,60.16582";
    const parsedStationRow = stationRow.split(",");
    const result = stationValidation(parsedStationRow);
    expect(result).toBe(true);
  });
  test("It should reject a station if a station ID is not a positibe integer", () => {
    const stationRow =
      "1,-501,Hanasaari,Hanaholmen,Hanasaari,Hanasaarenranta 1,Hanaholmsstranden 1,Espoo,Esbo,CityBike Finland,10,24.840319,60.16582";
    const parsedStationRow = stationRow.split(",");
    const result = stationValidation(parsedStationRow);
    expect(result).toBe(false);
  });
  test("It should reject a station if a station's location is not a valid location", () => {
    const stationRow =
      "1,-501,Hanasaari,Hanaholmen,Hanasaari,Hanasaarenranta 1,Hanaholmsstranden 1,Espoo,Esbo,CityBike Finland,10,24.840319,260.16582";
    const parsedStationRow = stationRow.split(",");
    const result = stationValidation(parsedStationRow);
    expect(result).toBe(false);
  });
});
