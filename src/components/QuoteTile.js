import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuoteTile = () => {
    const [quote, setQuote] = useState({ text: '', author: '' });
    const [loading, setLoading] = useState(true);

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

    return (
        <div className="tile">
            <h2>Quote of the Day
                <button 
                    className="refresh-button" 
                    onClick={fetchQuote} 
                    title="Refresh to get another quote"
                    aria-label="Refresh quote"
                >
                    &#x21bb;
                </button>
            </h2>
            {loading ? <p>Loading quote...</p> : (
                <div className="quote-content">
                    <p className="quote-text">"{quote.text}"</p>
                    <p className="quote-author">- {quote.author}</p>
                </div>
            )}
        </div>
    );
};

export default QuoteTile;

