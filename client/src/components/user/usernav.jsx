import React from 'react';
import { Link } from 'react-router-dom';
import "./BookRide.css";


export default function Userhome() {
  const logout=()=>{
    localStorage.clear()
  }
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="navbar">
        <ul>
          <li><Link to="/user/bookride">Book Ride</Link></li>
          <li><Link to="/user/history">MyBookings</Link></li>
          {/* <li><Link to="/user/payment">Payment</Link></li> */}
          <li><Link to="/user/profile">Profile</Link></li>
          <li><Link to="/" onClick={logout}>Logout</Link></li>
        </ul>
      </nav>
    </div>
  );
}

