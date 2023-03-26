import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Stations from './pages/Stations';


//App component--> should move to the file App.js
const App = () => {

  return (
    <div>
      <h1>hello world</h1>
      <Router>
        <Routes>
          <Route path="/stations" element={<Stations />} />
        </Routes>
      </Router>

    </div>
  )
}


export default App;
