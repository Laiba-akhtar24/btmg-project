// frontend/admin-frontend/src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

// Components
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import ManageCourses from "./components/ManageCourses";
import AddCourse from "./components/AddCourse";
import EditCourse from "./components/EditCourse";
import Topics from "./components/Topics";
import Subscribers from "./components/Subscribers";
import CategoriesPage from "./components/CategoriesPage";
import LaunchDates from "./components/LaunchDates";
import AddLaunchDate from "./components/AddLaunchDate";
import EditLaunchDate from "./components/EditLaunchDate";
import CourseInquiries from "./components/CourseInquiries";
import CourseEnrollments from "./components/CourseEnrollments";
import ContactLeads from "./components/ContactLeads";
import Sidebar from "./components/Sidebar";


import "./App.css";


// Layout with sidebar & mobile toggle
const Layout = ({ children }) => {
  const [sidebarActive, setSidebarActive] = useState(false);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>

      {/* Overlay */}
      <div
        className={`sidebar-overlay ${sidebarActive ? "active" : ""}`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar */}
      <Sidebar active={sidebarActive} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <div className="main-content">{children}</div>
    </>
  );
};

// Protect admin routes
const ProtectedRoute = ({ children }) => {
  const admin = sessionStorage.getItem("admin");

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AppWrapper = () => {
  const location = useLocation();

  // Login page standalone
  if (location.pathname === "/login") {
    return <Login />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/courses" element={<ProtectedRoute><ManageCourses /></ProtectedRoute>} />
        <Route path="/add-course" element={<ProtectedRoute><AddCourse /></ProtectedRoute>} />
        <Route path="/edit-course/:id" element={<ProtectedRoute><EditCourse /></ProtectedRoute>} />
        <Route path="/topics/:courseId" element={<ProtectedRoute><Topics /></ProtectedRoute>} />
        <Route path="/subscribers" element={<ProtectedRoute><Subscribers /></ProtectedRoute>} />
        <Route path="/categories" element={<ProtectedRoute><CategoriesPage /></ProtectedRoute>} />
        <Route path="/launch-dates" element={<ProtectedRoute><LaunchDates /></ProtectedRoute>} />
        <Route path="/add-launch-date" element={<ProtectedRoute><AddLaunchDate /></ProtectedRoute>} />
        <Route path="/edit-launch/:id" element={<EditLaunchDate />} />
        {/* Enrollments & Inquiries */}
        <Route path="/course-enrollments" element={<ProtectedRoute><CourseEnrollments /></ProtectedRoute>} />
        <Route path="/course-inquiries" element={<ProtectedRoute><CourseInquiries /></ProtectedRoute>} />

        {/* Contact */}
        <Route path="/contact-leads" element={<ProtectedRoute><ContactLeads /></ProtectedRoute>} />
      </Routes>
    </Layout>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<AppWrapper />} />
      </Routes>
    </Router>
  );
};

export default App;