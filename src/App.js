
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Footer from "./components/Footer";
import Main from "./components/Main";
import MarsRover from "./components/MarsRover"; 
import './index.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  // const date = '2024-04-24'

  useEffect(() => {
    async function fetchAPIData() {
      
      const NASA_KEY = process.env.REACT_APP_NASA_API_KEY;
      const url = 'https://api.nasa.gov/planetary/apod' + `?api_key=${NASA_KEY}`;
      // const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}&date=${date}`
      try {
        const res = await fetch(url);
        const apiData = await res.json();
        setData(apiData);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchAPIData();
  }, []);

  return (
    <Router>
      <div className="App">
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={data ? <Main data={data} /> : <div className="loadingState"></div>} />
          <Route path="/marsrover" element={<MarsRover />} />
        </Routes>
        <Footer data={data} />
      </div>
    </Router>
  );
}

export default App;