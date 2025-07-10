import React, { useState } from 'react';
import axios from 'axios';

const SubmissionForm = ({ type, onClose, onSubmissionSuccess }) => {
    const [text, setText] = useState('');
    const [author, setAuthor] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const token = localStorage.getItem('token'); // 1. Get the token from storage
        if (!token) {
            setError('You must be logged in to submit.');
            return;
        }

        const url = `https://rango.pythonanywhere.com/api/${type}/add`;
        const data = type === 'quote' ? { text, author } : { imageUrl };
        
        // 2. Create the authorization header
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        try {
            // 3. Send the request with data and headers
            await axios.post(url, data, { headers });            
            // Call the success handler passed from QuoteTile
            if (onSubmissionSuccess) {
                onSubmissionSuccess(data); 
            }
            onClose(); // Close the modal
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="submission-form">
            <h2>Add a New {type === 'quote' ? 'Quote' : 'Meme'}</h2>
            {error && <p className="error">{error}</p>}
            
            {type === 'quote' ? (
                <>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="The quote itself..."
                        required
                        rows="4"
                    />
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Author"
                        required
                    />
                </>
            ) : (
                <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Image URL"
                    required
                />
            )}
            
            <button type="submit" className="submit-button">Submit</button>
        </form>
    );
};

export default SubmissionForm;
