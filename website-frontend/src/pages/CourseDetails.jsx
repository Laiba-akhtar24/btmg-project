// website-frontend\src\pages\CourseDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import "./CourseDetails.css";
import "./CourseSnapshot.css"; // optional snapshot styling

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [topics, setTopics] = useState([]);

  const API = "http://localhost:5000/api";

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseRes = await axios.get(`${API}/courses/${id}`);
        console.log("Course data:", courseRes.data); // DEBUG
        setCourse(courseRes.data);

        const topicsRes = await axios.get(`${API}/topics/${id}`);
        setTopics(topicsRes.data);
      } catch (err) {
        console.error("Error fetching course:", err);
      }
    };
    fetchCourse();
  }, [id]);

  if (!course)
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        Loading course...
      </p>
    );

  const courseName = course.title || course.name || "Course";

  return (
    <div className="course-details-page">
      <div className="course-header">
        <h1 className="course-name">{courseName}</h1>
        <button
          className="back-to-courses-btn"
          onClick={() => navigate("/courses")}
        >
          Back to Courses
        </button>
      </div>

      <div className="course-main-grid">
        {/* LEFT SIDE */}
        <div className="course-left">
          <p className="course-description">{course.description}</p>

          <div className="topics-section">
            <h2>What You Will Learn?</h2>
            <ul>
              {topics.length > 0 ? (
                topics.map((topic) => (
                  <li key={topic._id}>
                    <strong>{topic.title}</strong> – {topic.description}
                  </li>
                ))
              ) : (
                <li>No topics added yet.</li>
              )}
            </ul>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="course-right">
          <div className="snapshot-card">
            <h3>Course Snapshot</h3>
            <p>
              <strong>Category:</strong> {course.category || "N/A"}
            </p>
            <p>
              <strong>Level:</strong> {course.level || "Beginner"} Level
            </p>
            <p>
              <strong>Price:</strong> {course.price || "0"}£ per hour
            </p>
            <p>
              <strong>Duration:</strong> {course.duration || "Flexible"}
            </p>
            <p>
              <strong>Schedule:</strong> Flexible
            </p>

            <div className="snapshot-buttons">
                   <button
  className="btn enroll-btn"
  onClick={() => navigate(`/course/${course._id}/enroll`)}
>
  Enroll
</button>

              {/* Navigate to Inquiry page */}
              <button
                className="btn inquiry-btn"
                onClick={() => navigate(`/course/${id}/inquiry`)}
              >
                Inquiry
              </button>

              <button className="btn pdf-btn" onClick={() => window.print()}>
                PDF
              </button>
              <button className="btn print-btn" onClick={() => window.print()}>
                Print
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;