import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes'; // Assuming you have this from previous steps
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Mock login/logout handlers that update the state
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <Router>
      <div className="App">
        {/* Pass the state and handlers down to the Navbar as props */}
        <Navbar 
          isLoggedIn={isLoggedIn} 
          onLogin={handleLogin} 
          onLogout={handleLogout} 
        />
        <main>
          {/* In a real app, the login page would call onLogin */}
          <AppRoutes />
        </main>
      </div>
    </Router>
  );
}

export default App;
