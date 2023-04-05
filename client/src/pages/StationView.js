import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import stationService from '../services/stations'
import StationMap from '../components/StationMap'
import { useLoadScript } from '@react-google-maps/api';
import { FaTrashAlt } from 'react-icons/fa'
export default function StationView() {
    const { ID } = useParams()
    const navigate = useNavigate()
    const { mapLoading } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    })
    const useStation = (ID) => {
        const [station, setStation] = useState(null)
        useEffect(() => {
            if (ID !== "") {
                stationService.getStationByID(ID)
                    .then(data => setStation(data))
                    .catch(err => console.log(err))
            }
        }, [ID])
        return station
    }
const handleDeleteStation = (id) => {
    if(window.confirm(`Are you sure you want to delete ${station.currentStation.Name}?`)){
        stationService.deleteStationByID(id)
          .then(data => console.log(data))
          .catch(err => console.log(err))
        
        navigate('/stations')
    }
}
    const station = useStation(ID)
    console.log(station)
    if (!station) {
        return <div>wait...</div>;
    }
    if (mapLoading) { return <div>wait...</div> }
    return (
        <div>
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>ID</th>
                            <th>Address</th>
                            {/* <th>City</th> */}
                            <th>Journeys start here</th>
                            <th>Journeys end here</th>
                            <th>Ave Dist: journeys departure from here</th>
                            <th>Ave Dist: journeys end at here</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{station.currentStation.Name}</td>
                            <td>{station.currentStation.ID}</td>
                            <td>{station.currentStation.Osoite}</td>
                            {/* <td>{station.currentStation.Kaupunki}</td> */}
                            <td>{station.countJourneyStartHere}</td>
                            <td>{station.countJourneyEndHere}</td>
                            <td>{Math.ceil(station.averageDepartunreDistance[0].averageDistance)}</td>
                            <td>{Math.ceil(station.averageReturnDistance[0].averageDistance)}</td>
                        </tr>
                    </tbody>
                </table>
                <h4>Top 5 most popular return stations for journeys starting from: {station.currentStation.Name}</h4>
                <ul>
                    {station.aggrJourneyDeparture.map((journey) => (
                        <li key={journey._id}>{journey._id}: {journey.count}</li>
                    ))}
                </ul>
                <h4>Top 5 most popular departure stations for journeys ending at: {station.currentStation.Name}</h4>
                <ul>
                    {station.aggrJourneyReturn.map((journey) => (
                        <li key={journey._id}>{journey._id}: {journey.count}</li>
                    ))}
                </ul>
                <div className='station-view-footer'>
                    {/* <UpdateStationModal station={station} /> */}
                    <Link
                        to="/stations"
                        className="btn btn-primary ms-auto "
                    >
                        Go Back
                    </Link>
                    <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteStation(station.currentStation.ID)}
                >
                    <FaTrashAlt />{' '}
                </button>
                </div>

                {/* <div className="ratio ratio-16x9 mb-3">
                    {station && !mapLoading &&
                        <div>
                            <h4>map container</h4>

                            <StationMap x={Number(station.currentStation.x)} y={Number(station.currentStation.y)} />
                        </div>
                    }
                </div> */}
            </div>
        </div>
    )
}
