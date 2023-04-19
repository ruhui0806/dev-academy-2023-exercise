import PropTypes from "prop-types";
import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import StationMap from "../components/StationMap";
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
          <Typography>{children}</Typography>
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

export default function Tabination({ mapLoading, station }) {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const boxStyle = {
    bgcolor: "transparent",
    width: {
      tablet: 640,
      laptop: 1024,
      desktop: 1280,
    },
  };

  const appBarStyle = {
    borderBottom: 1,
    borderColor: "divider",
    width: { tablet: 640, laptop: 1024, desktop: 1280 },
    fontSize: 12,
    height: "window.innerHeight",
  };
  return (
    <Box sx={boxStyle} id="tab-box">
      <AppBar id="app-bar" position="static" sx={appBarStyle}>
        <Tabs
          id="tab-container"
          value={value}
          onChange={handleChange}
          indicatorColor="inherit"
          textColor="inherit"
          variant="fullWidth"
        >
          <Tab label="Journeys start here" {...a11yProps(0)} />
          <Tab label="Journeys end here" {...a11yProps(1)} />
          <Tab label="Average journey distance start here" {...a11yProps(2)} />
          <Tab label="Average journey distance end here" {...a11yProps(3)} />
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
          The amount of journeys that start from {station.currentStation.Name}:{" "}
          {station.countJourneyStartHere}
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
          Average ditance of journeys that end at {station.currentStation.Name}:{" "}
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
  );
}
