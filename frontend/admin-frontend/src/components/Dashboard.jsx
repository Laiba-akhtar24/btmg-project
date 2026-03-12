// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalEnrollments, setTotalEnrollments] = useState(0);
  const [totalInquiries, setTotalInquiries] = useState(0);

  useEffect(() => {
    // Total Courses
    axios.get('http://localhost:5000/api/courses')
      .then(res => setTotalCourses(res.data.length))
      .catch(err => console.log(err));

    // Total Enrollments
    axios.get('http://localhost:5000/api/enrollments')
      .then(res => setTotalEnrollments(res.data.length))
      .catch(err => console.log(err));

    // Total Inquiries
    axios.get('http://localhost:5000/api/course-inquiries')
      .then(res => setTotalInquiries(res.data.length))
      .catch(err => console.log(err));

  }, []);

  return (
    <div className="dashboard-container">
      <div className="main-content">
        <h1>Dashboard</h1>
        <p>Welcome to BTMG Trainings Admin Panel</p>

        <div className="summary-cards">
          <div className="summary-card courses">
            <h3>Total Courses</h3>
            <p>{totalCourses}</p>
          </div>

          <div className="summary-card enrollments">
            <h3>Total Enrollments</h3>
            <p>{totalEnrollments}</p>
          </div>

          <div className="summary-card inquiries">
            <h3>Total Inquiries</h3>
            <p>{totalInquiries}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;