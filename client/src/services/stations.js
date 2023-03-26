import axios from 'axios';
const baseUrl = '/api/stations'

const getAllStations = () => {
    const req = axios.get(baseUrl);
    return req.then((res) => res.data);
};

const getStationById = (id) => {
    const req = axios.get(`${baseUrl}/${id}`);
    return req.then((res) => res.data);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAllStations, getStationById };