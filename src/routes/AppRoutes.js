import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AboutUsPage from '../pages/AboutUsPage';
import AuthPage from '../pages/AuthPage';

// Accept currentUser as a prop
const AppRoutes = ({ onLoginSuccess, currentUser }) => {
  return (
    <Routes>
      {/* Pass currentUser down to HomePage */}
      <Route path="/" element={<HomePage currentUser={currentUser} />} />
      <Route path="/about" element={<AboutUsPage />} />
      <Route path="/login" element={<AuthPage onLoginSuccess={onLoginSuccess} />} />
    </Routes>
  );
};

export default AppRoutes;
