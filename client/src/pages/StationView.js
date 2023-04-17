import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import stationService from "../services/stations";
import StationMap from "../components/StationMap";
import { useLoadScript } from "@react-google-maps/api";
import { FaTrashAlt } from "react-icons/fa";
import PropTypes from "prop-types";

import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"div"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function StationView() {
  const theme = useTheme();
  const { ID } = useParams();
  const navigate = useNavigate();
  const { mapLoading } = useLoadScript({
    // eslint-disable-next-line no-undef
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  });
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const useStation = (ID) => {
    const [station, setStation] = useState(null);
    useEffect(() => {
      if (ID !== "") {
        stationService
          .getStationByID(ID)
          .then((data) => setStation(data))
          .catch((err) => console.log(err));
      }
    }, [ID]);
    return station;
  };
  const handleDeleteStation = (id) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${station.currentStation.Name}?`
      )
    ) {
      stationService
        .deleteStationByID(id)
        .then((data) => console.log(data))
        .catch((err) => console.log(err));

      navigate("/stations");
    }
  };
  const station = useStation(ID);
  if (!station) {
    return <span className="loader"></span>;
  }
  if (mapLoading) {
    return <span className="loader"></span>;
  }
  const buttonStyle = {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 7,
    paddingRight: 7,
    fontSize: 15,
  };
  return (
    <div id="station-view-page">
      <div className="station-info-box">
        <li>
          {" "}
          <b>Name:</b> {station.currentStation.Name}
        </li>
        <li>
          <b>ID:</b> {station.currentStation.ID}
        </li>
        <li>
          <b>Address:</b> {station.currentStation.Osoite}
        </li>
      </div>
      <div id="station-view-div-box">
        <Box sx={{ bgcolor: "transparent", width: "100%" }}>
          <AppBar
            id="app-bar"
            position="static"
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <Tabs
              id="tabs"
              value={value}
              onChange={handleChange}
              indicatorColor="inherit"
              textColor="inherit"
              variant="fullWidth"
            >
              <Tab label="Journeys start here" {...a11yProps(0)} />
              <Tab label="Journeys end here" {...a11yProps(1)} />
              <Tab
                label="Average journey distance start here"
                {...a11yProps(2)}
              />
              <Tab
                label="Average journey distance end here"
                {...a11yProps(3)}
              />
              <Tab label="Top 5 return stations" {...a11yProps(4)} />
              <Tab label="Top 5 departure stations" {...a11yProps(5)} />
              <Tab label="Location " {...a11yProps(6)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel
              value={value}
              index={0}
              dir={theme.direction}
              className="tab-panel"
            >
              The amount of journeys that start from{" "}
              {station.currentStation.Name}: {station.countJourneyStartHere}
            </TabPanel>
            <TabPanel
              value={value}
              index={1}
              dir={theme.direction}
              className="tab-panel"
            >
              The amount of journeys that end at {station.currentStation.Name}:{" "}
              {station.countJourneyEndHere}
            </TabPanel>
            <TabPanel
              value={value}
              index={2}
              dir={theme.direction}
              className="tab-panel"
            >
              Average ditance of journeys that start from{" "}
              {station.currentStation.Name}:{" "}
              {Math.ceil(station.averageDepartunreDistance[0].averageDistance)}
            </TabPanel>
            <TabPanel
              value={value}
              index={3}
              dir={theme.direction}
              className="tab-panel"
            >
              Average ditance of journeys that end at{" "}
              {station.currentStation.Name}:{" "}
              {Math.ceil(station.averageReturnDistance[0].averageDistance)}
            </TabPanel>
            <TabPanel
              value={value}
              index={4}
              dir={theme.direction}
              className="tab-panel"
            >
              <span>
                Below are the top 5 Return stations for journeys starting from{" "}
                {station.currentStation.Name}:
              </span>
              <ul>
                {station.aggrJourneyDeparture.map((journey) => (
                  <li key={journey._id}>
                    {journey._id}: {journey.count}
                  </li>
                ))}
              </ul>
            </TabPanel>
            <TabPanel
              value={value}
              index={5}
              dir={theme.direction}
              className="tab-panel"
            >
              <span>
                Below are the top 5 departure stations for journeys ends here{" "}
                {station.currentStation.Name}:
              </span>
              <ul>
                {station.aggrJourneyReturn.map((journey) => (
                  <li key={journey._id}>
                    {journey._id}: {journey.count}
                  </li>
                ))}
              </ul>
            </TabPanel>
            <TabPanel
              value={value}
              index={6}
              dir={theme.direction}
              className="tab-panel"
            >
              {station && !mapLoading && (
                <StationMap
                  x={Number(station.currentStation.x)}
                  y={Number(station.currentStation.y)}
                />
              )}
            </TabPanel>
          </SwipeableViews>
        </Box>
      </div>

      <div className="station-view-footer">
        <Link to="/stations" className="button-link">
          Go Back
        </Link>
        <button
          className="button"
          style={buttonStyle}
          onClick={() => handleDeleteStation(station.currentStation.ID)}
        >
          <FaTrashAlt />{" "}
        </button>
      </div>
    </div>
  );
}
