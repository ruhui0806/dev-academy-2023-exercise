import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import stationService from "../services/stations";
import { useLoadScript } from "@react-google-maps/api";
import { FaTrashAlt } from "react-icons/fa";
import StationMap from "../components/StationMap";
import Tabination from "../components/Tabination";
import useStation from "../components/useStation";
//define stationView component for single station:
export default function StationView() {
  const { ID } = useParams();
  const navigate = useNavigate();

  // const useStation = (ID) => {
  //   const [station, setStation] = useState(null);

  //   useEffect(() => {
  //     if (!isNaN(Number(ID)) && ID.length === 3) {
  //       stationService
  //         .getStationByID(ID)
  //         .then((data) => setStation(data))
  //         .catch((err) => console.log(err));
  //     } else {
  //       alert("Station ID does not exist");
  //       navigate("/stations");
  //     }
  //   }, [ID]);
  //   return station;
  // };

  const station = useStation(ID);

  const { mapLoading } = useLoadScript({
    // eslint-disable-next-line no-undef
    googleMapsApiKey: station && station.REACT_APP_GOOGLE_MAP_API_KEY,
  });
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

  if (!station) {
    return <span className="loader"></span>;
  }

  if (mapLoading) {
    return <span className="loader"></span>;
  }
  const buttonStyle = {
    marginTop: 1,
    marginBottom: 1,
    padding: 6,
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
      </div>
      <div id="station-view-div-box">
        <Tabination mapLoading={mapLoading} station={station} />
        {/* below the station-info-table-sm div is only showed on smaller screen */}
        <div id="station-info-table-sm">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>ID</th>
                <th>Address</th>
                <th>Journeys start here</th>
                <th>Journeys end here</th>
                <th>journeys start here</th>
                <th>journeys end here</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{station.currentStation.Name}</td>
                <td>{station.currentStation.ID}</td>
                <td>{station.currentStation.Osoite}</td>
                <td>{station.countJourneyStartHere}</td>
                <td>{station.countJourneyEndHere}</td>
                <td>
                  {Math.ceil(
                    station.averageDepartunreDistance[0].averageDistance
                  )}
                </td>
                <td>
                  {Math.ceil(station.averageReturnDistance[0].averageDistance)}
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <div>
              <h4>
                Top 5 most popular return stations for journeys (counts)
                starting from: {station.currentStation.Name}
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
                Top 5 most popular departure stations for journeys (counts)
                ending at:
                {station.currentStation.Name}
              </h4>
              <ul>
                {station.aggrJourneyReturn.map((journey) => (
                  <li key={journey._id}>
                    {journey._id}: {journey.count}
                  </li>
                ))}
              </ul>
            </div>
            <p>
              Average distance for journey starts here:{" "}
              {Math.ceil(station.averageDepartunreDistance[0].averageDistance)}{" "}
              m
            </p>
            <p>
              Average distance for journey ends here:{" "}
              {Math.ceil(station.averageReturnDistance[0].averageDistance)} m
            </p>
          </div>
          {station && !mapLoading && (
            <StationMap
              id="stationMap"
              x={Number(station.currentStation.x)}
              y={Number(station.currentStation.y)}
            />
          )}
        </div>
      </div>

      <div className="station-view-footer">
        <Link to="/stations" className="button-link">
          Go Back
        </Link>
        <button
          style={buttonStyle}
          className="button"
          onClick={() => handleDeleteStation(ID)}
        >
          <FaTrashAlt />{" "}
        </button>
      </div>
    </div>
  );
}
