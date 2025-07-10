import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Import the decoding function

const AuthPage = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const url = isLogin ? 'https://rango.pythonanywhere.com/api/login' : 'https://rango.pythonanywhere.com/api/register';
    
    try {
      const response = await axios.post(url, { username, password });
      if (isLogin) {
        const token = response.data.access_token;
        const decodedToken = jwtDecode(token);

        // The only change is here: from .identity to .sub
        const loggedInUsername = decodedToken.sub.username; 

        // Store both the token and the username
        localStorage.setItem('token', token);
        localStorage.setItem('username', loggedInUsername);

        onLoginSuccess(loggedInUsername);
        navigate('/');
      } else {
        setIsLogin(true);
        alert('Registration successful! Please log in.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    }

  };

  

  // ... (rest of the component's JSX remains the same)
  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        {error && <p className="error">{error}</p>}
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          {isLogin ? 'Login' : 'Create Account'}
        </button>
        <p className="switch-mode" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
        </p>
      </form>
    </div>
  );
};

export default AuthPage;

