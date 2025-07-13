import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../components/tile/Tile.css'; // <-- Import shared tile styles
import './MemeTile.css'; // <-- Import quote-specific styles


// The currentUser prop is no longer needed as we've removed the submission feature
const MemeTile = () => {
    // State still holds an object with an 'imageUrl' key for consistency
    const [meme, setMeme] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchMeme = () => {
        setLoading(true);
        // UPDATED: Fetch from the public meme API endpoint
        axios.get('https://meme-api.com/gimme')
            .then(response => {
                // Adapt to the new API's response structure
                setMeme({ imageUrl: response.data.url });
                setLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the meme!", error);
                setMeme(null); // Clear previous meme on error
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchMeme();
    }, []);

    const renderMeme = () => {
        if (loading) {
            return <p>Loading meme...</p>;
        }

        if (!meme || !meme.imageUrl) {
            return <p>Could not load meme. Please try again.</p>;
        }

        // The image rendering logic remains the same
        return <img src={meme.imageUrl} alt="Daily Meme" className="media-content" />;
    };

    return (
        <div className="tile">
            <div className="tile-header">
                <h2>Fresh Garbage from the Meme Mines</h2>
                <div className="tile-actions">
                    {/* The "Add" button has been removed */}
                    <button 
                        onClick={fetchMeme} 
                        className="refresh-button" 
                        title="Refresh meme"
                    >
                        &#x21bb;
                    </button>
                </div>
            </div>
            <div className="tile-body">
                {renderMeme()}
            </div>
        </div>
    );
};

export default MemeTile;
