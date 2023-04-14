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

// eslint-disable-next-line import/no-anonymous-default-export
export default { getJourneys };
