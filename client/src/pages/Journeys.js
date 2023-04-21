import React, { useState, useEffect } from "react";
import { FaSort } from "react-icons/fa";
import JourneyRow from "../components/JourneyRow";
import journeyService from "../services/journeys.js";
import Pagination from "../components/pagination";
import AddJourneyModal from "../components/AddJourneyModal";
import { MdFilterAlt } from "react-icons/md";
export default function Journeys() {
  const [journeys, setJourneys] = useState([]);
  const [page, setPage] = useState(0);
  const [journeysPerPage, setJourneysPerPage] = useState(10); //limit
  const [valueForFilterByDistance, setValueForFilterByDistance] = useState(0);
  const [filterByDistanceInput, setFilterByDistanceInput] = useState(0);
  const [valueForFilterByDuration, setValueForFilterByDuration] = useState(0);
  const [filterByDurationInput, setFilterByDurationInput] = useState(0);
  const [sortConfig, setSortConfig] = useState({
    attr: "Return_station_name",
    direction: "descending",
  });
  const [journeyCount, setJourneyCount] = useState(Number(782599));
  useEffect(() => {
    let direction = sortConfig.direction === "ascending" ? "" : "-";
    let orderByColumn = direction + sortConfig.attr;
    //NB: offset = page*journeysPerPage, limit=journeysPerPage, order = orderByColumn
    journeyService
      .getJourneys(
        page * journeysPerPage,
        journeysPerPage,
        orderByColumn,
        valueForFilterByDistance,
        valueForFilterByDuration
      )
      .then((data) => {
        setJourneys(data.journeys);
        setJourneyCount(data.journeysCount);
      });
  }, [
    page,
    journeysPerPage,
    sortConfig.attr,
    sortConfig.direction,
    valueForFilterByDistance,
    valueForFilterByDuration,
  ]);

  const requestSort = (attr) => {
    let direction = "ascending";
    if (sortConfig.attr === attr && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ attr, direction });
  };
  //component styles:
  const buttonStyle = {
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 8,
    padding: 6,
    fontSize: 15,
  };
  const handleChangePage = (event, newPage) => {
    event.preventDefault();
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    event.preventDefault();
    setJourneysPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleFilterByDistance = (event) => {
    event.preventDefault();
    setFilterByDistanceInput(event.target.value * 1000);
  };
  const handleFilterByDistanceChange = () => {
    setValueForFilterByDistance(filterByDistanceInput);
    setPage(0);
  };
  const handleFilterByDuration = (event) => {
    event.preventDefault();
    setFilterByDurationInput(event.target.value * 60);
    setPage(0);
  };
  const handleFilterByDurationChange = () => {
    setValueForFilterByDuration(filterByDurationInput);
    setPage(0);
  };
  const handleAddNewJourney = (object) => {
    journeyService.addJourney(object);
    setPage(0);
  };
  const handleDeleteJourney = (id) => {
    journeyService
      .deleteJourneyById(id)
      .then(() => setJourneys(journeys.filter((j) => j._id !== id)));
  };

  return (
    <div id="journeys-page">
      <h3>Journeys</h3>
      <div>
        <AddJourneyModal handleAddNewJourney={handleAddNewJourney} />
      </div>
      <div id="filter-journey">
        <div className="journey-filter-box">
          <h5>Filter journey by covered distance (km) longer than:</h5>
          <input
            type="number"
            min="0"
            id="filterByDistanceInput"
            placeholder="Filter by distance"
            onChange={handleFilterByDistance}
          />
          <button
            onClick={handleFilterByDistanceChange}
            style={buttonStyle}
            className="button"
          >
            <MdFilterAlt />{" "}
          </button>
        </div>
        <div className="journey-filter-box">
          <h5>Filter journey by duration (min) longer than:</h5>
          <input
            type="number"
            min="0"
            id="filterByDurationInput"
            placeholder="Filter by duration"
            onChange={handleFilterByDuration}
          />
          <button
            onClick={handleFilterByDurationChange}
            style={buttonStyle}
            className="button"
          >
            <MdFilterAlt />{" "}
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>
              Departure Station
              <button
                style={buttonStyle}
                className="button-order"
                onClick={() => requestSort("Departure_station_name")}
                id="Departure_station_name"
              >
                {" "}
                <FaSort />
              </button>
            </th>
            <th>
              Return Station
              <button
                style={buttonStyle}
                className="button-order"
                onClick={() => requestSort("Return_station_name")}
                id="Return_station_name"
              >
                {" "}
                <FaSort />
              </button>
            </th>
            <th>
              Covered distance km
              <button
                style={buttonStyle}
                className="button-order"
                onClick={() => requestSort("Covered_distance_m")}
                id="valueForFilterByDistance"
              >
                {" "}
                <FaSort />
              </button>
            </th>
            <th>
              Duration in min
              <button
                style={buttonStyle}
                className="button-order"
                onClick={() => requestSort("Duration_sec")}
                id="btn-sort-id"
              >
                {" "}
                <FaSort />
              </button>
            </th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {journeys.map((journey) => (
            <JourneyRow
              key={journey._id}
              journey={journey}
              deleteJourney={handleDeleteJourney}
            />
          ))}
        </tbody>
      </table>
      <Pagination
        count={journeyCount}
        component="div"
        rowsPerPage={journeysPerPage}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}
