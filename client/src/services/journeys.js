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
  filterByDistance =
    typeof filterByDistance === "number" ? filterByDistance : 0;
  filterByDuration =
    typeof filterByDuration === "number" ? filterByDuration : 0;
  try {
    const res = await axios.get(
      `${baseUrl}?offset=${offset}&limit=${limit}&order=${order}&filterByDistance=${filterByDistance}&filterByDuration=${filterByDuration}`
    );
    return res.data;
  } catch (error) {
    alert(error);
  }
};

const addJourney = async (object) => {
  try {
    const response = await axios.post(baseUrl, object);
    console.log("add new journey", response.data);
    return response.data;
  } catch (error) {
    alert(`Add journey failed with wrong data type:  ${error}`);
  }
};
const deleteJourneyById = async (objectId) => {
  try {
    const response = await axios.delete(`${baseUrl}?objectId=${objectId}`);
    return response.data;
  } catch (error) {
    alert(error);
  }
};

export default { getJourneys, addJourney, deleteJourneyById };
