import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import TotalQuotation from './components/TotalQuotation';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quotation" element={<TotalQuotation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
