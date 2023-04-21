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
  const response = await axios.post(baseUrl, object);
  console.log("add new journey", response.data);
  return response.data;
};
const deleteJourneyById = async (objectId) => {
  const response = await axios.delete(`${baseUrl}?objectId=${objectId}`);
  return response.data;
};

export default { getJourneys, addJourney, deleteJourneyById };
