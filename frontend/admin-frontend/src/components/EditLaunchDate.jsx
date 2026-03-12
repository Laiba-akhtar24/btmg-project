import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./LaunchDates.css";

function EditLaunchDate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    course_id: "",
    launch_date: ""
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch courses
        const resCourses = await axios.get("http://localhost:5000/api/courses");
        setCourses(resCourses.data);

        // Fetch all launch dates
        const resLaunch = await axios.get("http://localhost:5000/api/launch-dates");
        const launch = resLaunch.data.find(l => l._id === id);

        if (!launch) return;

        // Find course ID by matching title
        const courseMatch = resCourses.data.find(c => c.title === launch.course);

        setFormData({
          course_id: courseMatch ? courseMatch._id : "",
          launch_date: launch.launch_date
        });
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedCourse = courses.find(
      c => String(c._id) === String(formData.course_id)
    );

    if (!selectedCourse) {
      alert("Please select a course");
      return;
    }

    const payload = {
      course: selectedCourse.title,
      level: selectedCourse.level,
      launch_date: formData.launch_date
    };

    try {
      await axios.put(
        `http://localhost:5000/api/launch-dates/${id}`,
        payload
      );
      navigate("/launch-dates");
    } catch (error) {
      console.error("Error updating launch date:", error);
      alert("Failed to update launch date");
    }
  };

  return (
    <div className="launch-container">
      <div className="launch-header">
        <h2>Edit Launch Date</h2>
        <button className="back-btn" onClick={() => navigate("/launch-dates")}>
          Back to List
        </button>
      </div>

      <div className="launch-form">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Course</label>
            <select
              name="course_id"
              value={formData.course_id}
              onChange={handleChange}
              required
            >
              {courses.map(course => (
                <option key={course._id} value={course._id}>
                  {course.title} - {course.level}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Launch Date</label>
            <input
              type="date"
              name="launch_date"
              value={formData.launch_date}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="save-btn">
            Update Launch Date
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditLaunchDate;