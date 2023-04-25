import axios from "axios";
const baseUrl = "/api/stations";

const getAllStations = () => {
  try {
    const req = axios.get(baseUrl);
    return req.then((res) => res.data);
  } catch (error) {
    alert(error);
  }
};

const getStationByID = (ID) => {
  try {
    const req = axios.get(`${baseUrl}/${ID}`);
    return req.then((res) => res.data);
  } catch (error) {
    alert(error);
  }
};
const deleteStationByID = (ID) => {
  try {
    const req = axios.delete(`${baseUrl}/${ID}`);
    return req.then((res) => res.data);
  } catch (error) {
    alert(error);
  }
};
const deleteStationById = async (objectId) => {
  try {
    const response = await axios.delete(`${baseUrl}?objectId=${objectId}`);
    return response.data;
  } catch (error) {
    alert(error);
  }
};

export default {
  getAllStations,
  getStationByID,
  deleteStationByID,
  deleteStationById,
};
