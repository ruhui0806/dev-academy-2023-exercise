import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import stationService from "../services/stations.js";

export default function FormDialog({ handleAddNewJourney }) {
  const [open, setOpen] = useState(false);
  const [stations, setStations] = useState([]);
  const [departureTime, setDepartureTime] = useState("2023-05-31T00:00:00");
  const [returnTime, setReturnTime] = useState("2023-05-31T00:00:00");
  const [departureStation, setDepartureStation] = useState("");
  const [returnStation, setReturnStation] = useState("");
  const [distance, setDistance] = useState(0);
  // const [duration, setDuration] = useState(0);

  useEffect(() => {
    stationService.getAllStations().then((stations) => {
      setStations(stations);
    });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // console.log("return station", returnStation.split(",")[0]);
  // console.log("return station", returnStation.split(",")[1]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const journeyObject = {
      Departure: departureTime,
      Return: returnTime,
      Departure_station_name: departureStation.split(",")[1],
      Departure_station_id: departureStation.split(",")[0],
      Return_station_name: returnStation.split(",")[1],
      Return_station_id: returnStation.split(",")[0],
      Covered_distance_m: distance,
      Duration_sec: (Date.parse(returnTime) - Date.parse(departureTime)) / 1000,
    };
    handleAddNewJourney(journeyObject);
    setOpen(false);
    setDepartureStation("");
    setReturnStation("");
    setDepartureTime("2023-05-31T00:00:00");
    setReturnTime("2023-05-31T00:00:00");
    setDistance(0);
    // setDuration(0);
    console.log("new journey", journeyObject);
  };

  if (!stations || stations.length === 0) {
    return <span className="loader"></span>;
  }
  return (
    <div>
      <button onClick={handleClickOpen} className="button-link">
        ADD NEW JOURNEY
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="dialog-title">Add New Journey</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <InputLabel style={{ marginTop: 20 }}>Departure time</InputLabel>
            <TextField
              margin="dense"
              id="departureTime"
              type="datetime-local"
              inputProps={{ step: 1 }}
              fullWidth
              variant="standard"
              value={departureTime}
              onChange={({ target }) => setDepartureTime(target.value)}
            />
            <InputLabel style={{ marginTop: 20 }}>Return time</InputLabel>
            <TextField
              margin="dense"
              id="returnTime"
              type="datetime-local"
              inputProps={{ step: 1 }}
              fullWidth
              variant="standard"
              value={returnTime}
              onChange={({ target }) => setReturnTime(target.value)}
            />
            <InputLabel style={{ marginTop: 20 }}>Departure Station</InputLabel>
            <Select
              variant="standard"
              id="departureStation"
              type="text"
              fullWidth
              margin="dense"
              value={departureStation}
              onChange={({ target }) => setDepartureStation(target.value)}
            >
              {stations &&
                stations
                  .sort((a, b) => Number(a.ID) - Number(b.ID))
                  .map((station) => (
                    <MenuItem
                      key={station._id}
                      value={station.ID + "," + station.Name}
                    >
                      {station.ID}: {station.Name}
                    </MenuItem>
                  ))}
            </Select>
            <InputLabel style={{ marginTop: 20 }}>Return Station</InputLabel>
            <Select
              variant="standard"
              id="returnStation"
              type="text"
              fullWidth
              margin="dense"
              value={returnStation}
              onChange={({ target }) => setReturnStation(target.value)}
            >
              {stations &&
                stations
                  .sort((a, b) => Number(a.ID) - Number(b.ID))
                  .map((station) => (
                    <MenuItem
                      key={station._id}
                      value={station.ID + "," + station.Name}
                    >
                      {station.ID}: {station.Name}
                    </MenuItem>
                  ))}
            </Select>
            <InputLabel style={{ marginTop: 20 }}>
              Covered Distance (m)
            </InputLabel>
            <TextField
              margin="dense"
              id="distance"
              type="number"
              fullWidth
              variant="standard"
              value={distance}
              onChange={({ target }) => setDistance(target.value)}
            />
            <InputLabel style={{ marginTop: 20 }}>Duration Time (s)</InputLabel>
            <TextField
              margin="dense"
              id="duration"
              type="number"
              fullWidth
              variant="standard"
              value={
                (Date.parse(returnTime) - Date.parse(departureTime)) / 1000
              }
              // onChange={({ target }) => setDuration(target.value)}
            />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" label="Submit">
                Add New
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
