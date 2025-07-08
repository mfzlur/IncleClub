import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AboutUsPage from '../pages/AboutUsPage';
import AuthPage from '../pages/AuthPage'; // Import the new page

const AppRoutes = ({ onLoginSuccess }) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutUsPage />} />
      {/* Add the new route and pass the prop down */}
      <Route path="/login" element={<AuthPage onLoginSuccess={onLoginSuccess} />} />
    </Routes>
  );
};

export default AppRoutes;

