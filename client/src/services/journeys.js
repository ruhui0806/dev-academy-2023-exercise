import axios from 'axios';
const baseUrl = '/api/journeys'


// const getJourneys = (offset, limit) => {
//     const req = axios.get(`${baseUrl}/${offset}/${limit}`);
//     return req.then((res) => res.data);
// }

const getJourneys = async (offset, limit) => {
    const res = await axios.get(`${baseUrl}/${offset}/${limit}`);
    return res.data;
}
// const getJourneyById = (id) => {
//     const req = axios.get(`${baseUrl}/${id}`);
//     return req.then((res) => res.data);
// }

const getJourneyByDeparture = (departureStation) => {
    const req = axios.get(`${baseUrl}/departureFrom/${departureStation}`);
    return req.then((res) => res.data);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getJourneys, getJourneyByDeparture };