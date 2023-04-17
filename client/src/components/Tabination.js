import PropTypes from "prop-types";
import React, { useState } from "react";
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

export default function Tabination(station) {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: "background.paper", width: 1000 }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Count Journeys start here" {...a11yProps(0)} />
          <Tab label="Count Journeys end here" {...a11yProps(1)} />
          <Tab label="Average journey distance start here" {...a11yProps(2)} />
          <Tab label="Average journey distance end here" {...a11yProps(3)} />
          <Tab
            label="Top 5 departure staions for journeys start here"
            {...a11yProps(4)}
          />
          <Tab
            label="Top 5 departure staions for journeys end here"
            {...a11yProps(5)}
          />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          {station.countJourneyStartHere}
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          {station.countJourneyEndHere}
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          {Math.ceil(station.averageDepartunreDistance[0].averageDistance)}
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          {Math.ceil(station.averageReturnDistance[0].averageDistance)}
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
          <ul>
            {station.aggrJourneyDeparture.map((journey) => (
              <li key={journey._id}>
                {journey._id}: {journey.count}
              </li>
            ))}
          </ul>
        </TabPanel>
        <TabPanel value={value} index={5} dir={theme.direction}>
          <ul>
            {station.aggrJourneyReturn.map((journey) => (
              <li key={journey._id}>
                {journey._id}: {journey.count}
              </li>
            ))}
          </ul>
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
