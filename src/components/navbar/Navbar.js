import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const closeMenu = () => {
    setIsOpen(false);
  };

  // NEW: Placeholder functions for the new buttons
  const handleAddMeme = () => {
    console.log("Open 'Add Meme' modal...");
    closeMenu();
  };
  const handleAddQuote = () => {
    console.log("Open 'Add Quote' modal...");
    closeMenu();
  };
  const handleSuggest = () => {
    console.log("Open 'Suggest Ideas' modal...");
    closeMenu();
  };

  return (
    <nav className="navbar"> 
      <Link to="/" className="navbar-brand" onClick={closeMenu}>IncleClub</Link>
      
      <button className={`hamburger-menu ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
        <li>
          <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
            About Us
          </NavLink>
        </li>
      
        {isLoggedIn ? (
          // NEW: Use a React Fragment (<>) to group the logged-in links
          <>
            <li><button onClick={handleAddMeme} className="nav-link">Add Meme</button></li>
            <li><button onClick={handleAddQuote} className="nav-link">Add Quote</button></li>
            <li><button onClick={handleSuggest} className="nav-link">Suggest Ideas</button></li>
            <li>
              <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
                Profile
              </NavLink>
            </li>
            <li>
              <button onClick={() => { onLogout(); closeMenu(); }} className="nav-link auth-button">
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login" className="nav-link auth-button" onClick={closeMenu}>
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
