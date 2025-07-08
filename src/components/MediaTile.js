import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MediaTile = () => {
    // State to hold the entire media object from the API
    const [media, setMedia] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchMedia = () => {
        setLoading(true);
        axios.get('/api/media')
            .then(response => {
                setMedia(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the media!", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchMedia();
    }, []);

    // Helper function to extract video ID from a full YouTube URL
    const getYouTubeId = (url) => {
        // This regex handles various YouTube URL formats (shorts, watch, embed)
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    // Main logic to render the correct HTML element based on media type
    const renderMediaContent = () => {
        if (loading) {
            return <p>Loading media...</p>;
        }

        if (!media) {
            return <p>No media available.</p>;
        }

        switch (media.type) {
            case 'image':
            case 'gif':
                return <img src={media.url} alt="Featured Content" className="media-content" />;

            case 'video':
                return (
                    <video controls className="media-content">
                        <source src={media.url} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                );

            case 'youtube':
                // Use the videoId if present, otherwise extract it from the URL
                const videoId = media.videoId || getYouTubeId(media.url);
                
                if (!videoId) return <p>Invalid YouTube link.</p>;

                return (
                    <div className="youtube-container">
                        <iframe
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                        </iframe>
                    </div>
                );

            default:
                return <p>Unsupported media type.</p>;
        }
    };

    return (
        <div className="tile">
            <h2>Featured Media
                <button 
                    className="refresh-button" 
                    onClick={fetchMedia} 
                    title="Refresh to get another media"
                    aria-label="Refresh media"
                >
                    &#x21bb;
                </button>
            </h2>
            {renderMediaContent()}
        </div>
    );
};

export default MediaTile;
