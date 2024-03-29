/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import { FaSort } from "react-icons/fa";
import Pagination from "../components/Pagination";
import stationService from "../services/stations.js";
import StationRow from "../components/StationRow";
const Stations = () => {
  const [stationsPerPage, setStationsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [stations, setStations] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    attr: "ID",
    direction: "ascending",
  });
  const [valueToSearch, setValueToSearch] = useState("");

  useEffect(() => {
    stationService.getAllStations().then((stations) => {
      setStations(stations);
    });
  }, []);

  //sort-by-column functions:
  const SortByColumn = (a, b) => {
    if (sortConfig.attr === "Kapasiteet") {
      a[sortConfig.attr] = parseInt(a[sortConfig.attr]);
      b[sortConfig.attr] = parseInt(b[sortConfig.attr]);
      if (a[sortConfig.attr] < b[sortConfig.attr]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.attr] > b[sortConfig.attr]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    }
    if (a[sortConfig.attr] < b[sortConfig.attr]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.attr] > b[sortConfig.attr]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  };
  const requestSort = (attr) => {
    let direction = "ascending";
    if (sortConfig.attr === attr && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ attr, direction });
  };

  //component styles:
  const buttonStyle = {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    paddingLeft: 7,
    paddingRight: 7,
    fontSize: 15,
  };
  const handleChangeRowsPerPage = (event) => {
    event.preventDefault();
    setStationsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const stationToShow = stations.filter(
    (station) =>
      station.Name.toLowerCase().includes(valueToSearch.toLowerCase()) ||
      station.Osoite.toLowerCase().includes(valueToSearch.toLowerCase())
  );
  const handleStationToShow = (event) => {
    event.preventDefault();
    setValueToSearch(event.target.value);
    setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    event.preventDefault();
    setPage(newPage);
  };

  const handleDeleteStation = (id) => {
    stationService
      .deleteStationById(id)
      .then(() => setStations(stations.filter((s) => s._id !== id)));
  };
  return (
    <div id="stations-page">
      <form id="search-station">
        <h5>Search Station by Name/Address:</h5>
        <input
          type="text"
          id="nameToSearch"
          placeholder="Search stations"
          onChange={handleStationToShow}
        />
      </form>

      <table>
        <thead>
          <tr>
            <th>
              ID
              <button
                style={buttonStyle}
                className="button-order"
                onClick={() => requestSort("ID")}
                id="btn-sort-id"
              >
                {" "}
                <FaSort />
              </button>
            </th>
            <th>
              Name
              <button
                onClick={() => requestSort("Name")}
                style={buttonStyle}
                className="button-order"
                id="btn-sort-name"
              >
                {" "}
                <FaSort />
              </button>
            </th>
            <th>
              Address
              <button
                onClick={() => requestSort("Osoite")}
                style={buttonStyle}
                className="button-order"
                id="btn-sort-address"
              >
                {" "}
                <FaSort />
              </button>
            </th>
            <th>
              Capacity
              <button
                onClick={() => requestSort("Kapasiteet")}
                style={buttonStyle}
                className="button-order"
                id="btn-sort-capacity"
              >
                {" "}
                <FaSort />
              </button>
            </th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {stationToShow.length > stationsPerPage
            ? stationToShow
                .sort(SortByColumn)
                .slice(
                  page * stationsPerPage,
                  page * stationsPerPage + stationsPerPage
                )
                .map((station) => (
                  <StationRow
                    station={station}
                    key={station.ID}
                    deleteStation={handleDeleteStation}
                  />
                ))
            : stationToShow
                .sort(SortByColumn)
                .map((station) => (
                  <StationRow
                    station={station}
                    key={station.ID}
                    deleteStation={handleDeleteStation}
                  />
                ))}
        </tbody>
      </table>

      <Pagination
        count={Number(stationToShow.length)}
        component="div"
        rowsPerPage={stationsPerPage}
        page={stationToShow.length > stationsPerPage ? page : 0}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};
export default Stations;
