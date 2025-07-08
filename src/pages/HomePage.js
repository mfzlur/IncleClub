import React from 'react';
import MediaTile from '../components/MediaTile';
import QuoteTile from '../components/QuoteTile';
import PosterTile from '../components/PosterTile';

const HomePage = () => (
    <>
        {/* The PosterTile is moved outside to allow it to be full-width */}
        <PosterTile />
        {/* The main grid remains inside the padded container */}
        <div className="container">
            <div className="home-grid">
                <MediaTile />
                <QuoteTile />
            </div>
        </div>
    </>
);

export default HomePage;
