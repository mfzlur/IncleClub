import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';
import SubmissionForm from './SubmissionForm';

const MemeTile = ({ currentUser }) => {
    const [meme, setMeme] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    // ... (keep the fetchMeme and renderMeme functions)
    const fetchMeme = () => {
    setLoading(true);
    // Fetch from the new /api/meme endpoint
    axios.get('/api/meme')
        .then(response => {
            setMeme(response.data);
            setLoading(false);
        })
        .catch(error => {
            console.error("There was an error fetching the meme!", error);
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
            return <p>No meme available.</p>;
        }

        return <img src={meme.imageUrl} alt="Daily Meme" className="media-content" />;
    };

    return (
        <>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <SubmissionForm type="meme" onClose={() => setShowModal(false)} />
            </Modal>

            <div className="tile">
                <div className="tile-header">
                    <h2>Today's Meme</h2>
                    <div className="tile-actions">
                        {currentUser && (
                            <button onClick={() => setShowModal(true)} className="add-button" title="Add your own meme">+</button>
                        )}
                        <button onClick={fetchMeme} className="refresh-button" title="Refresh meme">&#x21bb;</button>
                    </div>
                </div>

                {/* 
                  NEW: Wrap your rendered content in a "tile-body" div.
                  This is the critical change for fixing the layout. 
                */}
                <div className="tile-body">
                    {renderMeme()}
                </div>

            </div>
        </>
    );
};

export default MemeTile;

