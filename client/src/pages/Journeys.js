import React, { useState, useEffect } from 'react';
import { FaSort } from 'react-icons/fa';
import JourneyRow from '../components/JourneyRow';
import journeyService from '../services/journeys.js';
import Pagination from '../components/pagination';

export default function Journeys() {
    const [journeys, setJourneys] = useState([]);
    const [page, setPage] = useState(0);
    const [journeysPerPage, setJourneysPerPage] = useState(10); //limit
    const [sortConfig, setSortConfig] = useState({
        attr: 'Return_station_name',
        direction: 'descending',
    });
    useEffect(() => {
        // let orderByColumn = ['Return_station_name', 'descending']
        //let orderByColumn = 'Departure_station_name,ascending';
        let direction = sortConfig.direction === 'ascending'? '' : '-';
        let orderByColumn = direction + sortConfig.attr;
        console.log(orderByColumn)
        //offset = page*journeysPerPage, limit=journeysPerPage, order = orderByColumn
        journeyService.getJourneys(page*journeysPerPage, journeysPerPage, orderByColumn).then(data => {
            setJourneys(data)
        })
    }, [page, journeysPerPage, sortConfig.attr, sortConfig.direction]);
 
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
