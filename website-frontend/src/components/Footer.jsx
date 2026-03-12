import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <h2 className="footer-logo">BTMG Trainings</h2>

        <ul className="footer-links">
          <li><a href="/">Home</a></li>
          <li><a href="/courses">Courses</a></li>
          <li><a href="/about">About Platform</a></li>
          <li><a href="/contact">Inquiry</a></li>
        </ul>

        <hr className="footer-divider"/>

        <p className="footer-copy">
          Copyright © btmgtrainings.com
        </p>

      </div>

    </footer>
  );
}

export default Footer;