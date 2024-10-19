import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../../Styles/HOME/Navbar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>ShipSmart</h1>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li>
          <Link to="/driver-signup" className="signup-driver">Sign Up for Driver</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
