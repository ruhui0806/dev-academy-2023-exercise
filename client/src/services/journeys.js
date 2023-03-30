import axios from 'axios';
const baseUrl = '/api/journeys'

const getAllJourneys = () => {
    const req = axios.get(baseUrl);
    return req.then((res) => res.data);
}

const getJourneyByDeparture = (departureStation) => {
    const req = axios.get(`${baseUrl}/departureFrom/${departureStation}`);
    return req.then((res) => console.log(res.data));
}

