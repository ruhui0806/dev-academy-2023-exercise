import React from "react";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
export default function JourneyRow({ journey, deleteJourney }) {
  const buttonStyle = {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 7,
    paddingRight: 7,
    fontSize: 15,
  };
  const handleDeleteJourney = (id) => {
    if (
      window.confirm(
        `Are you sure you want to delete the journey start from ${journey.Departure_station_name}?`
      )
    ) {
      deleteJourney(id);
    }
  };
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
      <td>{Number.parseFloat(journey.Covered_distance_m / 1000).toFixed(2)}</td>
      <td>{Number.parseFloat(journey.Duration_sec / 60).toFixed(2)}</td>
      <td>
        <button
          style={buttonStyle}
          className="button"
          onClick={() => handleDeleteJourney(journey._id)}
        >
          <FaTrashAlt />{" "}
        </button>
      </td>
    </tr>
  );
}
