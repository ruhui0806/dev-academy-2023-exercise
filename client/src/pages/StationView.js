import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import stationService from '../services/stations'

export default function StationView() {
    const { ID } = useParams()

    // useEffect(() => { }, [])
    // useEffect(() => { }, [])
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


    const station = useStation(ID)
    console.log(station)
    if (!station) {
        return <div>wait...</div>;
    }
    return (
        <div>
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>ID</th>
                            <th>Address</th>
                            <th>City</th>
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
                            <td>{station.currentStation.Kaupunki}</td>
                            <td>{station.countJourneyStartHere}</td>
                            <td>{station.countJourneyEndHere}</td>
                            <td>{station.averageDepartunreDistance[0].averageDistance}</td>
                            <td>{station.averageReturnDistance[0].averageDistance}</td>

                        </tr>
                    </tbody>
                </table>

                <h4>Top 5 most popular return stations for journeys starting from: {station.currentStation.Name}</h4>
                <ul>
                    {station.aggrJourneyDeparture.map((journey) => (
                        <li>{journey._id}: {journey.count}</li>
                    ))}
                </ul>
                <h4>Top 5 most popular departure stations for journeys ending at: {station.currentStation.Name}</h4>
                <ul>
                    {station.aggrJourneyReturn.map((journey) => (
                        <li>{journey._id}: {journey.count}</li>
                    ))}
                </ul>
                <div className="d-flex mb-3 gap-3">
                    {/* <UpdateStationModal station={station} /> */}
                    <Link
                        to="/stations"
                        className="btn btn-primary ms-auto "
                    >
                        Go Back
                    </Link>
                </div>
            </div>


            <div className="ratio ratio-16x9 mb-3">
                {/* <StationMap x={Number(station.x)} y={Number(station.y)} /> */}
            </div>

        </div>

    )
}
