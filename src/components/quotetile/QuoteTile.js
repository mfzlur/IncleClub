import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../modal/Modal';
import SubmissionForm from '../submissionform/SubmissionForm';
import './QuoteTile.css'; // <-- Import form styles
// ... rest of your component


const QuoteTile = ({ currentUser }) => {
    const [quote, setQuote] = useState({ text: '', author: '' });
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const fetchQuote = () => {
        setLoading(true);
        axios.get('https://rango.pythonanywhere.com/api/quote')
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

    // NEW: Function to handle a successful submission from the form
    const handleSubmissionSuccess = (newQuote) => {
        setQuote(newQuote); // Update the tile to show the new quote
        setShowModal(false); // Close the modal
    };

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
                {/* UPDATED: Pass the success handler to the form */}
                <SubmissionForm 
                    type="quote" 
                    onClose={() => setShowModal(false)}
                    onSubmissionSuccess={handleSubmissionSuccess}
                />
            </Modal>

            <div className="tile">
                <div className="tile-header">
                    <h2>Pearls of Wisdom from the Wrong Crowd</h2>
                    <div className="tile-actions">
                        <button 
                            onClick={fetchQuote} 
                            className="refresh-button" 
                            title="Refresh quote"
                        >
                            &#x21bb;
                        </button>
                    </div>
                </div>

                <div className="tile-body">
                    {renderQuote()}
                </div>

                {/* MOVED: The "Add" button is now in the footer */}
                <div className="tile-footer">
                    {currentUser && (
                        <button 
                            onClick={() => setShowModal(true)} 
                            className="add-button" 
                            title="Add your own quote"
                        >
                            +
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default QuoteTile;
