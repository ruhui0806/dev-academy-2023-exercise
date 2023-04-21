import React from "react";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
// import stationService from "../services/stations";
export default function StationRow({ station, deleteStation }) {
  const buttonStyle = {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 7,
    paddingRight: 7,
    fontSize: 15,
  };
  const handleDeleteStation = (id) => {
    if (
      window.confirm(
        `Are you sure you want to delete station:  ${station.ID} (ID)-${station.Name}`
      )
    ) {
      deleteStation(id);
      // journeyService.deleteJourneyById(id);
    }
  };

  return (
    <tr>
      <td>
        <Link to={`/stations/${station.ID}`} className="page-link ">
          {station.ID}
        </Link>
      </td>
      <td>
        <Link to={`/stations/${station.ID}`} className="page-link ">
          {station.Name}
        </Link>
      </td>
      <td>
        <Link to={`/stations/${station.ID}`} className="page-link ">
          {station.Osoite}
        </Link>
      </td>
      <td>
        <Link to={`/stations/${station.ID}`} className="page-link ">
          {station.Kapasiteet}
        </Link>
      </td>

      <td>
        <button
          style={buttonStyle}
          className="button"
          onClick={() => handleDeleteStation(station._id)}
        >
          <FaTrashAlt />{" "}
        </button>
      </td>
    </tr>
  );
}
