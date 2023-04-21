import axios from "axios";
const baseUrl = "/api/stations";

const getAllStations = () => {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
};

const getStationByID = (ID) => {
  const req = axios.get(`${baseUrl}/${ID}`);
  return req.then((res) => res.data);
};
const deleteStationByID = (ID) => {
  const req = axios.delete(`${baseUrl}/${ID}`);
  return req.then((res) => res.data);
};
const deleteStationById = async (objectId) => {
  const response = await axios.delete(`${baseUrl}?objectId=${objectId}`);
  return response.data;
};

export default {
  getAllStations,
  getStationByID,
  deleteStationByID,
  deleteStationById,
};
