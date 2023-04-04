import React, { useState, useEffect } from 'react';
import { FaSort } from 'react-icons/fa';
import Pagination from '../components/pagination';
import stationService from '../services/stations.js';
import StationRow from '../components/StationRow';
const Stations = () => {
    const [stationsPerPage, setStationsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [stations, setStations] = useState([]);
    const [sortConfig, setSortConfig] = useState({
        attr: 'ID',
        direction: 'ascending',
    });
    const [valueToSearch, setValueToSearch] = useState('');

    useEffect(() => {
        stationService.getAllStations().then(stations => {
            setStations(stations)
        })
    }, [])

    //sort-by-column functions:
    const SortByColumn = (a, b) => {
        if (a[sortConfig.attr] < b[sortConfig.attr]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.attr] > b[sortConfig.attr]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    };
    const requestSort = (attr) => {
        let direction = 'ascending';
        if (sortConfig.attr === attr && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ attr, direction });
    };

    //component styles:
    const buttonStyle = {
        marginLeft: 5,
        padding: 0.5,
        paddingBottom: 3.5,
        paddingTop: 2,
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: 15,
    };
    const handleChangeRowsPerPage = (event) => {
        setStationsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const stationToShow = [...stations].filter(
        (station) =>
        station.Name.includes(valueToSearch) ||
        station.Osoite.includes(valueToSearch)
        )
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        if(stationToShow.length < stationsPerPage) {
        setPage(0)
        }
    };
   
    return (
        <div>
            <form className="form-inline">
                <h5 className="d-inline p-3">
                    Search Station by Name/Address:
                </h5>
                <input
                    type="text"
                    id="nameToSearch"
                    placeholder="Search for stations"
                    onChange={(e) => setValueToSearch(e.target.value)}
                />
            </form>

            <table className="table table-hover mt-3">
                <thead>
                    <tr>
                        <th>
                            ID
                            <button
                                style={buttonStyle}
                                className="btn btn-light btn-sm"
                                onClick={() => requestSort('ID')}
                                id="btn-sort-id"
                            >
                                {' '}
                                <FaSort />
                            </button>
                        </th>
                        <th>
                            Name
                            <button
                                onClick={() => requestSort('Name')}
                                style={buttonStyle}
                                className="btn btn-light btn-sm"
                                id="btn-sort-name"
                            >
                                {' '}
                                <FaSort />
                            </button>
                        </th>
                        <th>
                            Address
                            <button
                                onClick={() => requestSort('Osoite')}
                                style={buttonStyle}
                                className="btn btn-light btn-sm"
                                id="btn-sort-address"
                            >
                                {' '}
                                <FaSort />
                            </button>
                        </th>
                        <th>
                            Capacity
                            <button
                                onClick={() => requestSort('Kapasiteet')}
                                style={buttonStyle}
                                className="btn btn-light btn-sm"
                                id="btn-sort-capacity"
                            >
                                {' '}
                                <FaSort />
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        stationToShow
                            .sort(SortByColumn)
                            .slice(
                                page * stationsPerPage,
                                page * stationsPerPage + stationsPerPage
                            )
                            .map((station) => (
                                <StationRow
                                    station={station}
                                    key={station.ID}
                                />
                            ))}
                </tbody>
            </table>
            <Pagination
                count={Number(stations.length)}
                component="div"
                rowsPerPage={stationsPerPage}
                page={page}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    );
};
export default Stations
