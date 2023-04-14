import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React from "react";
import Stations from "./pages/Stations";
import Journeys from "./pages/Journeys";
import StationView from "./pages/StationView";

const App = () => {
  return (
    <div className="box">
      <header id="header">
        <h1>Helsinki City Bike</h1>
      </header>

      <Router>
        <div className="router-link-container">
          <Link className="button-link" to="/stations">
            {" "}
            STATIONS
          </Link>
          <Link className="button-link" to="/journeys">
            JOURNEYS
          </Link>
        </div>
        <Routes>
          <Route path="/stations" element={<Stations />} />
          <Route path="/stations/:ID" element={<StationView />} />
          <Route path="/journeys" element={<Journeys />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
