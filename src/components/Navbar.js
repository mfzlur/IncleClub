import React from 'react';
import { Link, NavLink } from 'react-router-dom';

// const Navbar = ({ isLoggedIn, onLogin, onLogout }) => {
//   return (
//     <nav className="navbar">
//       <Link to="/" className="navbar-brand">IncleClub</Link>
//       <ul className="navbar-links">
//         <li>
//           <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
//             Home
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/about" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
//             About Us
//           </NavLink>
//         </li>
        
//         {/* Conditionally render Login or Logout button */}
//         <li>
//           {isLoggedIn ? (
//             <button onClick={onLogout} className="nav-link auth-button">
//               Logout
//             </button>
//           ) : (
//             <button onClick={onLogin} className="nav-link auth-button">
//               Login
//             </button>
//           )}
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;




const Navbar = ({ isLoggedIn, onLogout }) => {
  return (
    // If using modules, use className={styles.navbar}, etc.
    <nav className="navbar"> 
      <Link to="/" className="navbar-brand">IncleClub</Link>
      <ul className="navbar-links">
        <li><NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink></li>
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

