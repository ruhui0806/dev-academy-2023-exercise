import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import stationService from "../services/stations";
export default function StationRow({ station }) {
  const navigate = useNavigate();
  const handleDeleteStation = (id) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${station.currentStation.Name}?`
      )
    ) {
      stationService
        .deleteStationByID(id)
        .then((data) => console.log(data))
        .catch((err) => console.log(err));

      navigate("/stations");
    }
  };
  const buttonStyle = {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 7,
    paddingRight: 7,
    fontSize: 15,
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
          onClick={() => handleDeleteStation(station.ID)}
        >
          <FaTrashAlt />{" "}
        </button>
      </td>
    </tr>
  );
}
