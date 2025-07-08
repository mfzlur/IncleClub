import React, { useState } from 'react';
import axios from 'axios';

const SubmissionForm = ({ type, onClose }) => {
  const [field1, setField1] = useState(''); // For Quote Text or Meme Image URL
  const [field2, setField2] = useState(''); // For Quote Author
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to submit.');
      return;
    }

    const url = type === 'quote' ? '/api/quote/add' : '/api/meme/add';
    const data = type === 'quote' ? { text: field1, author: field2 } : { imageUrl: field1 };

    try {
      await axios.post(url, data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} submitted successfully!`);
      onClose(); // Close the modal on success
    } catch (err) {
      setError('Submission failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="submission-form">
      <h2>Add a New {type === 'quote' ? 'Quote' : 'Meme'}</h2>
      {error && <p className="error">{error}</p>}
      <div className="input-group">
        <label>{type === 'quote' ? 'Quote Text' : 'Meme Image URL'}</label>
        <input type="text" value={field1} onChange={(e) => setField1(e.target.value)} required />
      </div>
      {type === 'quote' && (
        <div className="input-group">
          <label>Author</label>
          <input type="text" value={field2} onChange={(e) => setField2(e.target.value)} required />
        </div>
      )}
      <button type="submit" className="submit-button">Submit</button>
    </form>
  );
};

export default SubmissionForm;
