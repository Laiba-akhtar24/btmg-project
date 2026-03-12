import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LaunchDates.css";
import { useNavigate } from "react-router-dom";

function LaunchDates() {

  const [launchDates, setLaunchDates] = useState([]);
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    course: "",
    launch_date: ""
  });

  useEffect(() => {

    fetchLaunchDates();
    fetchCourses();

  }, []);

  const fetchLaunchDates = async () => {

    try {

      const res = await axios.get("http://localhost:5000/api/launch-dates");

      setLaunchDates(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  const fetchCourses = async () => {

    try {

      const res = await axios.get("http://localhost:5000/api/courses");

      setCourses(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const selectedCourse = courses.find(
        (c) => c._id === formData.course
      );

      const payload = {

        course: selectedCourse.title,
        level: selectedCourse.level,
        launch_date: formData.launch_date

      };

      const res = await axios.post(
        "http://localhost:5000/api/launch-dates",
        payload
      );

      setLaunchDates([...launchDates, res.data]);

      setFormData({
        course: "",
        launch_date: ""
      });

      setShowForm(false);

    } catch (err) {

      console.log(err);

    }

  };


  const handleDelete = async (id) => {

    if (!window.confirm("Delete this launch date?")) return;

    try {

      await axios.delete(`http://localhost:5000/api/launch-dates/${id}`);

      setLaunchDates(launchDates.filter(ld => ld._id !== id));

    } catch (err) {

      console.log(err);

    }

  };


  return (

    <div className="launch-container">

      <div className="launch-header">

        <h1 className="launch-title">
          Course Launch Dates
        </h1>

        <button
          className="add-launch-btn"
          onClick={() => setShowForm(!showForm)}
        >
          Add Launch Date
        </button>

      </div>

      


      {showForm && (

  <form
    className="launch-form"
    onSubmit={handleSubmit}
  >

    {/* Form Header */}

    <div className="launch-form-header">

      <h3 className="form-title">
        Add Launch Date
      </h3>

      <button
        type="button"
        className="back-btn"
        onClick={() => setShowForm(false)}
      >
        Back
      </button>

    </div>


    {/* Course */}

    <div>

      <label>Course</label>

      <select
        name="course"
        value={formData.course}
        onChange={handleChange}
        required
      >

        <option value="">Select Course</option>

        {courses.map((c) => (

          <option
            key={c._id}
            value={c._id}
          >
            {c.title}
          </option>

        ))}

      </select>

    </div>


    {/* Launch Date */}

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


    <button
      type="submit"
      className="save-btn"
    >
      Save
    </button>

  </form>

)}


      <div className="launch-table-card">

        <table className="launch-table">

          <thead>

            <tr>

              <th>Course</th>
              <th>Level</th>
              <th>Launch Date</th>
              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {launchDates.length === 0 ? (

              <tr>

                <td
                  colSpan="4"
                  className="empty-row"
                >

                  No launch dates yet.

                </td>

              </tr>

            ) : (

              launchDates.map((ld) => (

                <tr key={ld._id}>

                  <td>{ld.course}</td>

                  <td>{ld.level}</td>

                  <td>{ld.launch_date}</td>

                  <td>

                    <div className="action-row">

                      <span className="counter">
                        Enrollments
                        <span className="count-badge">
                          {ld.enrollments || 0}
                        </span>
                      </span>

                      <span className="counter">
                        Inquiries
                        <span className="count-badge">
                          {ld.inquiries || 0}
                        </span>
                      </span>

                      <button
className="edit-btn"
onClick={() => navigate(`/edit-launch/${ld._id}`)}
>
Edit
</button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(ld._id)}
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default LaunchDates;