// src/components/Dashboard.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import { BookOpen, GraduationCap, MessageSquare } from "lucide-react";

const Dashboard = () => {
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalEnrollments, setTotalEnrollments] = useState(0);
  const [totalInquiries, setTotalInquiries] = useState(0);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {

      const coursesRes = await axios.get("http://localhost:5000/api/courses");
      const enrollmentsRes = await axios.get("http://localhost:5000/api/enrollments");
      const inquiriesRes = await axios.get("http://localhost:5000/api/course-inquiries");

      const courses = coursesRes.data;
      const enrollments = enrollmentsRes.data;
      const inquiries = inquiriesRes.data;

      setTotalCourses(courses.length);
      setTotalEnrollments(enrollments.length);
      setTotalInquiries(inquiries.length);

      // Build activity feed
      const courseActivities = courses.map(course => ({
        type: "course",
        message: `New course added: ${course.title || course.name}`,
        date: new Date(course.createdAt || course.created_at)
      }));

      const enrollmentActivities = enrollments.map(enroll => ({
        type: "enrollment",
        message: `New enrollment for ${enroll.course_name || "course"}`,
        date: new Date(enroll.createdAt || enroll.created_at)
      }));

      const inquiryActivities = inquiries.map(inquiry => ({
        type: "inquiry",
        message: `New inquiry received for ${inquiry.course_name || "course"}`,
        date: new Date(inquiry.createdAt || inquiry.created_at)
      }));

      const combined = [
        ...courseActivities,
        ...enrollmentActivities,
        ...inquiryActivities
      ];

      // Sort latest first
      combined.sort((a, b) => b.date - a.date);

      setActivities(combined.slice(0, 10)); // show latest 10

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="main-content">

        <h1>Dashboard</h1>
        <p>Welcome to BTMG Trainings Admin Panel</p>

        {/* Summary Cards */}

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


        {/* Recent Activities */}

        <div className="recent-activities">

          <h2>Recent Activities</h2>

          {activities.length === 0 ? (
            <p className="no-activity">No recent activities</p>
          ) : (
            <ul className="activity-list">

              {activities.map((activity, index) => (
                <li key={index} className={`activity-item ${activity.type}`}>

                  <div className="activity-icon">

                    {activity.type === "course" && "📚"}
                    {activity.type === "enrollment" && "🎓"}
                    {activity.type === "inquiry" && "💬"}

                  </div>

                  <div className="activity-content">

                    <p>{activity.message}</p>

                    <span>
                      {activity.date.toLocaleString()}
                    </span>

                  </div>

                </li>
              ))}

            </ul>
          )}

        </div>

      </div>
    </div>
  );
};

export default Dashboard;