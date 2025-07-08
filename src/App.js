import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import MediaTile from './components/MediaTile';
import QuoteTile from './components/QuoteTile';
import PosterTile from './components/PosterTile'; // 1. Import the new component
import './App.css';

// Home Page Component// Home Page Component
const HomePage = () => (
    <>
     {/* The PosterTile is moved outside to allow it to be full-width */}
        <PosterTile />
        {/* The main grid remains inside the padded container */}
        <main className="container">
            <div className="home-grid">
                <MediaTile />
                <QuoteTile />
            </div>
        </main>
       
    </>
);

// About Us Page Component
const AboutUsPage = () => (
  <div className="about-us-container">
    <h1>About Us</h1>
    <p>Welcome to Dynamic Duo, a creative space brought to life with React and Flask.</p>
    <p>Our mission is to deliver small bites of inspiration and entertainment. The "Featured Short" brings you trending clips, while the "Quote of the Day" offers a moment of reflection. This project demonstrates the power of combining a fast, interactive frontend with a robust Python backend.</p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;