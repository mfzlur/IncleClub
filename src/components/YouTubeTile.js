import React, { useState, useEffect } from 'react';
import axios from 'axios';

const YouTubeTile = () => {
    const [videoId, setVideoId] = useState('');

    useEffect(() => {
        // Fetch the video ID from our Flask backend
        axios.get('/api/youtube-short')
            .then(response => {
                setVideoId(response.data.videoId);
            })
            .catch(error => {
                console.error("There was an error fetching the YouTube video ID!", error);
            });
    }, []);

    return (
        <div className="tile">
            <h2>Featured Short</h2>
            {videoId ? (
                <div className="youtube-container">
                    <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen>
                    </iframe>
                </div>
            ) : <p>Loading video...</p>}
        </div>
    );
};

export default YouTubeTile;
