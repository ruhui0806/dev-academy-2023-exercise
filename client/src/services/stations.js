import axios from 'axios';
const baseUrl = '/api/stations'

const getAllStations = () => {
    const req = axios.get(baseUrl);
    return req.then((res) => res.data);
};

const getStationByID = (ID) => {
    const req = axios.get(`${baseUrl}/${ID}`);
    return req.then((res) => (res.data));
}
const deleteStationByID = (ID) => {
    const req = axios.delete(`${baseUrl}/${ID}`);
    return req.then((res) => (res.data));
}
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAllStations, getStationByID,deleteStationByID };