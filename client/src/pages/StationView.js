import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import stationService from "../services/stations";
import StationMap from "../components/StationMap";
import { useLoadScript } from "@react-google-maps/api";
import { FaTrashAlt } from "react-icons/fa";
export default function StationView() {
  const { ID } = useParams();
  const navigate = useNavigate();
  const { mapLoading } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  });
  const useStation = (ID) => {
    const [station, setStation] = useState(null);
    useEffect(() => {
      if (ID !== "") {
        stationService
          .getStationByID(ID)
          .then((data) => setStation(data))
          .catch((err) => console.log(err));
      }
    }, [ID]);
    return station;
  };
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
  const station = useStation(ID);
  //   console.log(station);
  if (!station) {
    return <div>wait...</div>;
  }
  if (mapLoading) {
    return <div>wait...</div>;
  }
  const buttonStyle = {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 7,
    paddingRight: 7,
    fontSize: 15,
  };
  return (
    <div id="station-view-page">
      <div className="station-info-box">
        <li>
          {" "}
          <b>Name:</b> {station.currentStation.Name}
        </li>
        <li>
          <b>ID:</b> {station.currentStation.ID}
        </li>
        <li>
          <b>Address:</b> {station.currentStation.Osoite}
        </li>
        <li>
          <b>Count Journeys: start here</b>
          {station.countJourneyStartHere}{" "}
        </li>
        <li>
          <b>Count Journeys: end here</b>
          {station.countJourneyEndHere}
        </li>
      </div>
      {/* <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Address</th>
            <th>Count Journeys: start here </th>
            <th>Count Journeys: end here</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{station.currentStation.Name}</td>
            <td>{station.currentStation.ID}</td>
            <td>{station.currentStation.Osoite}</td>
            <td>{station.countJourneyStartHere}</td>
            <td>{station.countJourneyEndHere}</td>
          </tr>
        </tbody>
      </table> */}
      <div id="station-view-div-box">
        <div>
          <div>
            <h4>
              Top 5 most popular return stations for journeys (counts) starting
              from: {station.currentStation.Name}
            </h4>
            <ul>
              {station.aggrJourneyDeparture.map((journey) => (
                <li key={journey._id}>
                  {journey._id}: {journey.count}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>
              Top 5 most popular departure stations for journeys (counts) ending
              at: <strong>{station.currentStation.Name}</strong>
            </h4>
            <ul>
              {station.aggrJourneyReturn.map((journey) => (
                <li key={journey._id}>
                  {journey._id}: {journey.count}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <div>
            <h4>Average distance of all journeys start here (m):</h4>
            <li>
              {Math.ceil(station.averageDepartunreDistance[0].averageDistance)}
            </li>
          </div>
          <div>
            <h4>Average distance of all journeys end here (m):</h4>
            <li>
              {Math.ceil(station.averageReturnDistance[0].averageDistance)}
            </li>
          </div>
        </div>
      </div>
      {station && !mapLoading && (
        <StationMap
          x={Number(station.currentStation.x)}
          y={Number(station.currentStation.y)}
        />
      )}
      <div className="station-view-footer">
        <Link to="/stations" className="button-link">
          Go Back
        </Link>
        <button
          className="button"
          style={buttonStyle}
          onClick={() => handleDeleteStation(station.currentStation.ID)}
        >
          <FaTrashAlt />{" "}
        </button>
      </div>
    </div>
  );
}
