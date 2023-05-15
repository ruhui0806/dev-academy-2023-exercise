import React, { useState, useEffect } from "react";
import { FaSort } from "react-icons/fa";
import JourneyRow from "../components/JourneyRow";
import journeyService from "../services/journeys.js";
import Pagination from "../components/pagination";
import AddJourneyModal from "../components/AddJourneyModal";
import { MdFilterAlt } from "react-icons/md";
import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";
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
  const { showBoundary } = useErrorBoundary();
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
      .then(
        (data) => {
          setJourneys(data.journeys);
          setJourneyCount(data.journeysCount);
        },
        (error) => showBoundary(error)
      );
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
    if (filterByDistanceInput > 0) {
      setValueForFilterByDistance(filterByDistanceInput);
      setPage(0);
    } else {
      alert("The filter value should not be a negative number.");
    }
  };
  const handleFilterByDuration = (event) => {
    event.preventDefault();
    setFilterByDurationInput(event.target.value * 60);
    setPage(0);
  };
  const handleFilterByDurationChange = () => {
    if (filterByDurationInput > 0 || filterByDurationInput === 0) {
      setValueForFilterByDuration(filterByDurationInput);
      setPage(0);
    } else {
      alert("The filter value should not be a negative number.");
    }
  };
  const handleAddNewJourney = (object) => {
    journeyService.addJourney(object);
    setPage(0);
  };
  const handleDeleteJourney = (id) => {
    journeyService.deleteJourneyById(id).then(
      () => setJourneys(journeys.filter((j) => j._id !== id)),
      (error) => showBoundary(error)
    );
  };

  return (
    <div id="journeys-page">
      <h3>Journeys</h3>
      <div>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <AddJourneyModal handleAddNewJourney={handleAddNewJourney} />
        </ErrorBoundary>
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
            id="btn-filter-distance"
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
            id="btn-filter-duration"
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
              Distance-km
              <button
                style={buttonStyle}
                className="button-order"
                onClick={() => requestSort("Covered_distance_m")}
                id="btn-sort-covered_distance_m"
              >
                {" "}
                <FaSort />
              </button>
            </th>
            <th>
              Duration-min
              <button
                style={buttonStyle}
                className="button-order"
                onClick={() => requestSort("Duration_sec")}
                id="btn-sort-duration_sec"
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
