import React from 'react';
import { Link, NavLink } from 'react-router-dom';


const Navbar = ({ isLoggedIn, onLogout }) => {
  return (
    // If using modules, use className={styles.navbar}, etc.
    <nav className="navbar"> 
      <Link to="/" className="navbar-brand">IncleClub</Link>
      <ul className="navbar-links">
        <li><NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>About Us</NavLink></li>
        
        {isLoggedIn ? (
          <li><button onClick={onLogout} className="nav-link auth-button">Logout</button></li>
        ) : (
          // This is now a Link to the login page
          <li><Link to="/login" className="nav-link auth-button">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

