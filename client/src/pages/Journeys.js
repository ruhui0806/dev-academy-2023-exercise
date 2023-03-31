import React, { useState, useEffect } from 'react';
import { FaSort } from 'react-icons/fa';
import JourneyRow from '../components/JourneyRow';
import journeyService from '../services/journeys.js';
import Pagination from '../components/pagination';

export default function Journeys() {
    const [journeys, setJourneys] = useState([]);
    const [page, setPage] = useState(0);
    const [journeysPerPage, setJourneysPerPage] = useState(10); //limit
  
    // const [offset, setoffset] = useState(0);
    const [sortConfig, setSortConfig] = useState({
        attr: 'ID',
        direction: 'ascending',
    });
    useEffect(() => {
        //getJourneys =  (offset, limit) => {} //Number(page*journeysPerPage), Number(journeysPerPage) 
        journeyService.getJourneys(page*journeysPerPage,journeysPerPage).then(data => {
            setJourneys(data)
        })
    }, [page, journeysPerPage]);
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
        const handleChangePage = (event, newPage) => {
            setPage(newPage);
        };
        const handleChangeRowsPerPage = (event) => {
            setJourneysPerPage(parseInt(event.target.value, 10));
            setPage(0);
        };
    return (
        <div>
            <h3>Journeys</h3>
            <div className="d-inline p-3 form-group ml-auto">
                    <label className=" p-3 form-label ml-auto">
                        Stations Per Page:
                    </label>
                    <select
                        id="journeysPerPage"
                        className="w-30 ml-auto"
                        value={journeysPerPage}
                        form-select-border-width="1"
                        onChange={(e) =>
                            setJourneysPerPage(parseInt(e.target.value))
                        }
                    >
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>
            <table>
                <thead>
                    <tr>
                        <th>Departure Station
                        <button
                                style={buttonStyle}
                                className="btn btn-light btn-sm"
                                onClick={() => requestSort('Departure_station_name')}
                                id="btn-sort-id"
                            >
                                {' '}
                                <FaSort />
                        </button>
                        </th>
                        <th>Return Station
                        <button
                                style={buttonStyle}
                                className="btn btn-light btn-sm"
                                onClick={() => requestSort('Return_station_name')}
                                id="btn-sort-id"
                            >
                                {' '}
                                <FaSort />
                        </button>
                        </th>
                        <th>Covered distance km
                        <button
                                style={buttonStyle}
                                className="btn btn-light btn-sm"
                                onClick={() => requestSort('Covered_distance_m')}
                                id="btn-sort-id"
                            >
                                {' '}
                                <FaSort />
                        </button>
                        </th>
                        <th>Duration in min
                        <button
                                style={buttonStyle}
                                className="btn btn-light btn-sm"
                                onClick={() => requestSort('Duration_sec')}
                                id="btn-sort-id"
                            >
                                {' '}
                                <FaSort />
                        </button>
                        </th>
                    </tr>
                </thead>
                <tbody>

                    {journeys
                    .sort(SortByColumn)
                    // .slice(offset, offset + journeysPerPage)
                    .map(journey => (
                        <JourneyRow key={journey._id} journey={journey} />
                    ))}
                </tbody>
            </table>
            <Pagination
                count={Number(782598)}
                component="div"
                rowsPerPage={journeysPerPage}
                page={page}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    )
}
