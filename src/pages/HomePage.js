import React from 'react';
import MemeTile from '../components/MemeTile';
import QuoteTile from '../components/QuoteTile';
import PosterTile from '../components/PosterTile';

// 1. Accept `currentUser` as a prop here
const HomePage = ({ currentUser }) => (
    <>
        <PosterTile />
        <div className="container">
            <div className="home-grid">
                {/* 2. Pass the `currentUser` prop down to each tile */}
                <MemeTile currentUser={currentUser} />
                <QuoteTile currentUser={currentUser} />
            </div>
        </div>
    </>
);

export default HomePage;
