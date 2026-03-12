import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="nav-container">

        {/* Logo */}
        <div className="logo">
          BTMG Trainings
        </div>

        {/* Center Links */}
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/courses">Courses</a></li>
          <li><a href="/about">About Platform</a></li>
          <li><a href="/contact">Contact Us</a></li>
        </ul>

        {/* Right Button */}
        <div className="nav-btn">
          <a href="/courses">Join Us</a>
        </div>

      </div>

    </nav>
  );
}

export default Navbar;