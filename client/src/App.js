import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Stations from './pages/Stations';
import StationView from './pages/StationView';


const App = () => {

  return (
    <div>
      <h1>hello world</h1>
      <Router>
        <Routes>
          <Route path="/stations" element={<Stations />} />
          <Route
            path="/stations/:ID"
            element={<StationView />}
          />
        </Routes>
      </Router>
    </div>
  )
}


export default App;
