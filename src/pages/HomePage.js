import React from 'react';
import MemeTile from '../components/MemeTile';
import QuoteTile from '../components/QuoteTile';
import PosterTile from '../components/PosterTile';

const HomePage = () => (
    <>
        {/* The PosterTile is moved outside to allow it to be full-width */}
        <PosterTile />
        {/* The main grid remains inside the padded container */}
        <div className="container">
            <div className="home-grid">
                <MemeTile />
                <QuoteTile />
            </div>
        </div>
    </>
);

export default HomePage;
