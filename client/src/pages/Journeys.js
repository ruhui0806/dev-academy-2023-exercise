import React, { useState, useEffect } from 'react';
import { FaSort } from 'react-icons/fa';
import JourneyRow from '../components/JourneyRow';
import journeyService from '../services/journeys.js';
import Pagination from '../components/pagination';

export default function Journeys() {
    const [journeys, setJourneys] = useState([]);
    const [page, setPage] = useState(0);
    const [journeysPerPage, setJourneysPerPage] = useState(10); //limit
    //// eslint-disable-next-line no-unused-vars
    //const [valueForSearch, setValueForSearch] = useState('')
    const [valueForFilterByDistance, setValueForFilterByDistance] = useState(0)
    const [valueForFilterByDuration, setValueForFilterByDuration] = useState(0)
    const [sortConfig, setSortConfig] = useState({
        attr: 'Return_station_name',
        direction: 'descending',
    });
    useEffect(() => {
        let direction = sortConfig.direction === 'ascending'? '' : '-';
        let orderByColumn = direction + sortConfig.attr;
        //offset = page*journeysPerPage, limit=journeysPerPage, order = orderByColumn
        journeyService.getJourneys(page*journeysPerPage, journeysPerPage, orderByColumn, valueForFilterByDistance,valueForFilterByDuration).then(data => {
            setJourneys(data)
        })
    }, [page, journeysPerPage, sortConfig.attr, sortConfig.direction,valueForFilterByDistance,valueForFilterByDuration]);
 
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
            if(journeys.length < journeysPerPage) {
                setPage(0)
            }
        };
        const handleChangeRowsPerPage = (event) => {
            setJourneysPerPage(parseInt(event.target.value, 10));
            setPage(0);
        };

    return (
        <div>
            <h3>Journeys</h3>
            <div className="d-inline p-3 form-group ml-auto">
                {/* <h5 className="d-inline p-3">
                    Search journey by depature/return station name:
                </h5>
                <input
                    type="text"
                    id="nameForSearch"
                    placeholder="Search by stations"
                    onChange={(e) => setValueForSearch(e.target.value)}
                /> */}
                <h5 className="d-inline p-3">
                    Filter journey by covered distance (km) longer than:
                </h5>
                <input
                    type="number"
                    id="valueForFilterByDistance"
                    placeholder="filter by distance"
                    onChange={(e) => setValueForFilterByDistance((e.target.value)*1000)}
                />
                <h5 className="d-inline p-3">
                    Filter journey by duration (min) longer than:
                </h5>
                <input
                    type="number"
                    id="valueForFilterByDuration"
                    placeholder="filter by duration"
                    onChange={(e) => setValueForFilterByDuration((e.target.value)*60)}
                />
            </div>
                
            <table>
                <thead>
                    <tr>
                        <th>Departure Station
                        <button
                                style={buttonStyle}
                                className="btn btn-light btn-sm"
                                onClick={() => requestSort('Departure_station_name')}
                                id="Departure_station_name"
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
                                id="Return_station_name"
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
                                id="valueForFilterByDistance"
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

                    {
                    // [...journeys]
                    // .filter(journey => journey.Departure_station_name.includes(valueForSearch) || journey.Return_station_name.includes(valueForSearch))
                    journeys
                    .map(journey => (
                        <JourneyRow key={journey._id} journey={journey} />
                    ))
                    }
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
