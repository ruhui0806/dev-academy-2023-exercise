import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React from 'react';
import Stations from './pages/Stations';
import Journeys from './pages/Journeys';
import StationView from './pages/StationView';


const App = () => {

  return (
    <div className="box">
      <h1>hello world</h1>
      <Router>
        <div className='router-link-container'>
          <Link to="/stations">Stations</Link>
          <Link to="/journeys">Journeys</Link>
        </div>
        <Routes>
          <Route path="/stations" element={<Stations />} />
          <Route
            path="/stations/:ID"
            element={<StationView />}
          />
          <Route path="/journeys" element={<Journeys />} />
        </Routes>
      </Router>
    </div>
  )
}


export default App;
