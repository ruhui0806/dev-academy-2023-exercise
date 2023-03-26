import React from 'react'
import { Link } from 'react-router-dom'
import { FaTrashAlt } from 'react-icons/fa'
export default function StationRow({ station }) {
    return (
        <tr>
            <td>
                <Link to={`/stations/${station.ID}`} className="page-link ">
                    {station.ID}
                </Link>
            </td>
            <td>
                <Link to={`/stations/${station.ID}`} className="page-link ">
                    {station.Name}
                </Link>
            </td>
            <td>
                <Link to={`/stations/${station.ID}`} className="page-link ">
                    {station.Osoite}
                </Link>
            </td>
            <td>
                <Link to={`/stations/${station.ID}`} className="page-link ">
                    {station.Kapasiteet}
                </Link>
            </td>

            <td>
                <button
                    className="btn btn-danger btn-sm"
                // onClick={deleteStation}
                >
                    <FaTrashAlt />{' '}
                </button>
            </td>
        </tr>
    )

}
