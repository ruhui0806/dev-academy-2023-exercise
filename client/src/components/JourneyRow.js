import React from 'react'
import { Link } from 'react-router-dom'
import { FaTrashAlt } from 'react-icons/fa'
export default function JourneyRow({ journey }) {
    return (
        <tr>
            <td>
                <Link to={`/stations/${journey.Departure_station_id}`} className="page-link ">
                    {journey.Departure_station_name}
                </Link>
            </td>
            <td>
                <Link to={`/stations/${journey.Return_station_id}`} className="page-link ">
                    {journey.Return_station_name}
                </Link>
            </td>
            <td>
                {journey.Covered_distance_m / 1000}
                {/* <Link to={`/stations/${journey.ID}`} className="page-link ">
                </Link> */}
            </td>
            <td>
                {Math.ceil(journey.Duration_sec / 60)}
                {/* <Link to={`/stations/${journey.ID}`} className="page-link ">
                </Link> */}
            </td>
            <td>
                <button
                    className="btn btn-danger btn-sm"
                // onClick={deletejourney}
                >
                    <FaTrashAlt />{' '}
                </button>
            </td>
        </tr>
    )

}