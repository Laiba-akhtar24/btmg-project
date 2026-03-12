// frontend/admin-frontend/src/components/Sidebar.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarActive, setSidebarActive] = useState(false);

  // Check if screen is mobile
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
    if (window.innerWidth > 768) setSidebarActive(false); // reset on desktop
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle sidebar on mobile
  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  return (
    <>
      {isMobile && (
        <>
          <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
            ☰
          </button>
          <div
            className={`sidebar-overlay ${sidebarActive ? "active" : ""}`}
            onClick={toggleSidebar}
          />
        </>
      )}

      <div className={`sidebar ${isMobile && sidebarActive ? "active" : ""}`}>
        <h2>BTMG Trainings</h2>
        <ul>
          <li><Link to="/">Dashboard</Link></li>

          <li className="sidebar-section">Courses</li>
          <li><Link to="/courses">Manage Courses</Link></li>
          <li><Link to="/launch-dates">Course Launch Dates</Link></li>
          <li><Link to="/categories">Categories</Link></li>

          <li className="sidebar-section">Enrollments & Inquiries</li>
          <li><Link to="/course-enrollments">Course Enrollments</Link></li>
          <li><Link to="/course-inquiries">Course Inquiries</Link></li>

          <li className="sidebar-section">Contact Us</li>
          <li><Link to="/contact-leads">Contact Leads</Link></li>

          <li className="sidebar-section">Newsletter</li>
          <li><Link to="/subscribers">Subscribers</Link></li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;