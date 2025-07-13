import React from 'react';
// 1. Import your static image from the assets folder
import posterImage from '../../assets/incleclub-poster.jpeg';
import './PosterTile.css'

const PosterTile = () => {
    return (
        // 2. Use a different class for styling the full-width container
        <div className="full-width-poster">
            <img src={posterImage} alt="Promotional Poster" />
        </div>
    );
};

export default PosterTile;