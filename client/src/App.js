import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React from "react";
import Stations from "./pages/Stations";
import Journeys from "./pages/Journeys";
import StationView from "./pages/StationView";
import Error from "./pages/Error";

const App = () => {
  return (
    <div className="box">
      <header>
        <h2>Helsinki City Bike App</h2>
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
          <Route
            path="/stations"
            element={<Stations />}
            errorElement={<Error />}
          />
          <Route
            path="/stations/:ID"
            element={<StationView />}
            errorElement={<Error />}
          />
          <Route
            path="/journeys"
            element={<Journeys />}
            errorElement={<Error />}
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
