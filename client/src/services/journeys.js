import axios from 'axios';
const baseUrl = '/api/journeys'


// const getJourneys = (offset, limit) => {
//     const req = axios.get(`${baseUrl}/${offset}/${limit}`);
//     return req.then((res) => res.data);
// }

// const getJourneys = async (offset, limit, order) => {
//     const res = await axios.get(`${baseUrl}/${offset}/${limit}/${order}`);
//     return res.data;
// }

const getJourneys = async (offset, limit) => {
    offset = parseInt(offset);
    limit = parseInt(limit);
    let order = ['Return_station_name', 'ascending'];
    console.log(order)
    const res = await axios.get(`${baseUrl}?offset=${offset}&limit=${limit}&order=${order}`);
    return res.data
}

const getJourneyByDeparture = (departureStation) => {
    const req = axios.get(`${baseUrl}/departureFrom/${departureStation}`);
    return req.then((res) => res.data);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getJourneys, getJourneyByDeparture };