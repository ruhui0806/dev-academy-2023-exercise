import axios from "axios";
const baseUrl = "/api/journeys";

const getJourneys = async (
  offset,
  limit,
  order,
  filterByDistance,
  filterByDuration
) => {
  offset = parseInt(offset);
  limit = parseInt(limit);
  filterByDistance = filterByDistance ? parseInt(filterByDistance) : 0;
  filterByDuration = filterByDuration ? parseInt(filterByDuration) : 0;
  const res = await axios.get(
    `${baseUrl}?offset=${offset}&limit=${limit}&order=${order}&filterByDistance=${filterByDistance}&filterByDuration=${filterByDuration}`
  );
  return res.data;
};

const addJourney = async (object) => {
  // object = {
  //   Departure: "2021-05-31T23:52:03",
  //   Departure_station_id: "116",
  //   Departure_station_name: "Linnanmäki",
  //   Return: "2021-06-01T00:15:16",
  //   Return_station_id: "117",
  //   Return_station_name: "Brahen puistikko",
  //   Covered_distance_m: 3700000,
  //   Duration_sec: 1393,
  // };
  const response = await axios.post(baseUrl, object);
  console.log("add new journey", response.data);
  return response.data;
};
// const deleteJourneyById = (objectId) => {
//   const res = axios.delete(`${baseUrl}?objectId=${objectId}`);
// }

export default { getJourneys, addJourney };
