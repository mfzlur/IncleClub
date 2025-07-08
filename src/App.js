import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setCurrentUser(storedUsername);
    }
  }, []);

  const handleLogin = (username) => {
    setCurrentUser(username);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setCurrentUser(null);
  };

  const isLoggedIn = !!currentUser;

  return (
    <Router>
      {/* The className="App" has been removed for a cleaner structure */}
      <div>
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <main>
          <AppRoutes 
            onLoginSuccess={handleLogin} 
            currentUser={currentUser} 
          />
        </main>
      </div>
    </Router>
  );
}

export default App;
