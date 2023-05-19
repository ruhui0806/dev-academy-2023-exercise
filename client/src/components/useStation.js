import { useState, useEffect } from "react";
import stationService from "../services/stations";
import { useNavigate } from "react-router-dom";

const useStation = (ID) => {
  const navigate = useNavigate();
  const [station, setStation] = useState(null);

  useEffect(() => {
    if (!isNaN(Number(ID)) && ID.length === 3) {
      stationService
        .getStationByID(ID)
        .then((data) => setStation(data))
        .catch((err) => console.log(err));
    } else {
      alert("Station ID does not exist");
      navigate("/stations");
    }
  }, [ID]);

  return station;
};
export default useStation;
