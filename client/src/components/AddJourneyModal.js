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
          {/* <DialogContentText>Add new journey...</DialogContentText> */}
          <form onSubmit={addJourney}>
            <InputLabel style={{ marginTop: 20 }}>Departure time</InputLabel>
            <TextField
              autoFocus
              margin="dense"
              id="departure"
              //   label="Departure Time"
              type="date"
              fullWidth
              variant="standard"
              //   placeholder="."
              //   value={departure}
              //   onChange={({ target }) => setDeparture(target.value)}
            />
            <InputLabel style={{ marginTop: 20 }}>Return time</InputLabel>
            <TextField
              autoFocus
              margin="dense"
              id="return"
              //   label="Return Time"
              type="date"
              fullWidth
              variant="standard"
            />
            <InputLabel style={{ marginTop: 20 }}>Departure Station</InputLabel>
            {/* <TextField
              autoFocus
              margin="dense"
              id="departureStation"
              type="text"
              fullWidth
              variant="standard"
            /> */}
            <Select
              id="departureStation"
              label="Departure Station"
              fullWidth
              //   value={departureStation}
              //   onChange={handleDepartureStationChange}
            >
              {stations &&
                stations.map((station) => (
                  <MenuItem key={station._id} value={station.Name}>
                    {station.ID}: {station.Name}
                  </MenuItem>
                ))}
            </Select>
            <InputLabel style={{ marginTop: 20 }}>Return Station</InputLabel>
            <Select
              //   autoFocus
              id="returnStation"
              label="Return Station"
              type="text"
              fullWidth
              //   variant="standard"
              margin="dense"
              //   value={departureStation}
              //   onChange={handleDepartureStationChange}
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
              autoFocus
              margin="dense"
              id="departureStation"
              //   label="Return Time"
              type="number"
              fullWidth
              variant="standard"
            />
            <InputLabel style={{ marginTop: 20 }}>Duration Time (s)</InputLabel>
            <TextField
              autoFocus
              margin="dense"
              id="departureStation"
              //   label="Return Time"
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
