import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';
import SubmissionForm from './SubmissionForm';

const QuoteTile = ({ currentUser }) => {
    const [quote, setQuote] = useState({ text: '', author: '' });
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const fetchQuote = () => {
        setLoading(true);
        axios.get('/api/quote')
            .then(response => {
                setQuote(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the quote!", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchQuote();
    }, []);

    const renderQuote = () => {
        if (loading) {
            return <p>Loading quote...</p>;
        }

        if (!quote || !quote.text) {
            return <p>No quote available.</p>;
        }

        return (
            <div className="quote-content">
                <p className="quote-text">"{quote.text}"</p>
                <p className="quote-author">- {quote.author}</p>
            </div>
        );
    };

    return (
        <>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <SubmissionForm type="quote" onClose={() => setShowModal(false)} />
            </Modal>

            <div className="tile">
                <div className="tile-header">
                    <h2>Quote of the Day</h2>
                    <div className="tile-actions">
                        {/* Conditionally render the "Add" button if a user is logged in */}
                        {currentUser && (
                            <button 
                                onClick={() => setShowModal(true)} 
                                className="add-button" 
                                title="Add your own quote"
                            >
                                +
                            </button>
                        )}
                        <button 
                            onClick={fetchQuote} 
                            className="refresh-button" 
                            title="Refresh quote"
                        >
                            &#x21bb;
                        </button>
                    </div>
                </div>

                {/* The main content is wrapped in "tile-body" to fix centering */}
                <div className="tile-body">
                    {renderQuote()}
                </div>
            </div>
        </>
    );
};

export default QuoteTile;
