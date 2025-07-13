import React, { useState } from 'react';
// 1. Import the specific image directly from your assets folder
import monaLisaImage from '../../assets/paintings/mona-lisa.png';
import './PosterTile.css';

const PosterTile = () => {
    const [selectedColor, setSelectedColor] = useState('#89909e');
    // 2. Add state to manage the title's color, initialized to a default
    const [titleColor, setTitleColor] = useState('#1b5e13');

    const swatchColors = [
        '#C70039', '#E59700', '#2A7D2A',
        '#22577A', '#57376D', '#94005E'
    ];

    const handleColorChange = (color) => {
        setSelectedColor(color);
    };

    // 3. New function to handle the random color change on title click
    const handleTitleClick = () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        setTitleColor(`rgb(${r}, ${g}, ${b})`);
    };

    return (
        <div className="poster-container">
            <div className="poster-template">
                <header className="poster-header">
                    <span>IncleClub</span>
                </header>
                {/* 4. Add the onClick handler to the title's container */}
                <div className="poster-main-title" onClick={handleTitleClick}>
                    {/* 5. Apply the dynamic color to the h1 element */}
                    <h1 style={{ color: titleColor }}>FUN ZONE!</h1>
                </div>
                <div className="poster-body">
                    <aside className="poster-sidebar">
                        <div className="color-swatches">
                            {swatchColors.map((color) => (
                                <div
                                    key={color}
                                    className="swatch"
                                    style={{ backgroundColor: color }}
                                    onClick={() => handleColorChange(color)}
                                />
                            ))}
                        </div>
                    </aside>
                    <main className="poster-main-content">
                        <div
                            className="feature-box"
                            style={{ backgroundColor: selectedColor }}
                        >
                            <span className="welcome-message">Welcome</span>
                            {/* 6. Use the imported static image */}
                            <img
                                src={monaLisaImage}
                                alt="Mona Lisa"
                                className="painting-image"
                            />
                            <span className="signature"> -mcbc</span>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default PosterTile;
