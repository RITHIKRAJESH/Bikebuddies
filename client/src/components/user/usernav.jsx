import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./bookride.css";

export default function Userhome() {
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="navbar">
        <div className="navbar-container">
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <li><Link to="/user/bookride">Book Ride</Link></li>
            <li><Link to="/user/history">MyBookings</Link></li>
            <li><Link to="/user/profile">Profile</Link></li>
            <li><Link to="/" onClick={logout}>Logout</Link></li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
