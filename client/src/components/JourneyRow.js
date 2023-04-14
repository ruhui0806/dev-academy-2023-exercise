import React from "react";
import { Link } from "react-router-dom";
export default function JourneyRow({ journey }) {
  return (
    <tr>
      <td>
        <Link
          to={`/stations/${journey.Departure_station_id}`}
          className="page-link "
        >
          {journey.Departure_station_name}
        </Link>
      </td>
      <td>
        <Link
          to={`/stations/${journey.Return_station_id}`}
          className="page-link "
        >
          {journey.Return_station_name}
        </Link>
      </td>
      <td>{journey.Covered_distance_m / 1000}</td>
      <td>{Math.ceil(journey.Duration_sec / 60)}</td>
    </tr>
  );
}
