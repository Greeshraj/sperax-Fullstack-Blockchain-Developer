// src/Navbar.js
import React from 'react';
import './NavBar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Sperax</div>
      <div className="nav-buttons">
        <button className="nav-button">Login</button>
        <button className="nav-button signup">SignUp</button>
      </div>
    </nav>
  );
};

export default Navbar;
