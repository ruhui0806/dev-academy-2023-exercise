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

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [stations, setStations] = useState([]);
  const [departureTime, setDepartureTime] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [departureStation, setDepartureStation] = useState("");
  const [returnStation, setReturnStation] = useState("");

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

  const addJourney = (e) => {
    e.preventDefault();
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
          <form onSubmit={addJourney}>
            <InputLabel style={{ marginTop: 20 }}>Departure time</InputLabel>
            <TextField
              margin="dense"
              id="departureTime"
              type="datetime-local"
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
                    <MenuItem key={station._id} value={station.Name}>
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
                    <MenuItem key={station._id} value={station.Name}>
                      {station.ID}: {station.Name}
                    </MenuItem>
                  ))}
            </Select>
            <InputLabel style={{ marginTop: 20 }}>
              Covered Distance (m)
            </InputLabel>
            <TextField
              margin="dense"
              id="departureStation"
              type="number"
              fullWidth
              variant="standard"
            />
            <InputLabel style={{ marginTop: 20 }}>Duration Time (s)</InputLabel>
            <TextField
              margin="dense"
              id="departureStation"
              type="number"
              fullWidth
              variant="standard"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add New</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
