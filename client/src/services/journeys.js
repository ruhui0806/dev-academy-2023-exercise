import axios from 'axios';
const baseUrl = '/api/journeys'

const getJourneys = async (offset, limit, order) => {
    offset = parseInt(offset);
    limit = parseInt(limit);
    
    console.log("order in journeyService: ",order)
    const res = await axios.get(`${baseUrl}?offset=${offset}&limit=${limit}&order=${order}`);
    return res.data
}

const getJourneyByDeparture = (departureStation) => {
    const req = axios.get(`${baseUrl}/departureFrom/${departureStation}`);
    return req.then((res) => res.data);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getJourneys, getJourneyByDeparture };