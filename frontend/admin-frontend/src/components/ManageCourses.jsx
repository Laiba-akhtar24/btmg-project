// src/components/ManageCourses.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ManageCourses.css';

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_URL = 'http://localhost:5000/api/courses';

  // Fetch courses
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);

      const sorted = res.data.sort((a, b) => a.sort - b.sort);
      setCourses(sorted);

      setLoading(false);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Delete course
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      setCourses(courses.filter(c => c._id !== id));
      alert('Course deleted successfully!');
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete course!');
    }
  };

  // Toggle course status locally
  const toggleStatus = (id) => {
    const updated = courses.map(c => {
      if (c._id === id) {
        const newStatus = c.status === 'Active' ? 'Inactive' : 'Active';
        return { ...c, status: newStatus };
      }
      return c;
    });
    setCourses(updated);
  };

  return (
    <div className="dashboard-container">
      <div className="main-content">

        <div className="manage-header">
          <h2>Manage Courses</h2>
          <button
            className="add-course-btn"
            onClick={() => navigate('/add-course')}
          >
            + Add New Course
          </button>
        </div>

        {loading ? (
          <p>Loading courses...</p>
        ) : courses.length === 0 ? (
          <p>No courses available.</p>
        ) : (
          <div className="table-responsive">

            <table className="courses-table">

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Level</th>
                  <th>Category</th>
                  <th>Duration</th>
                  <th>Price</th>
                  <th>Sort</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {courses.map(course => (

                  <tr key={course._id}>

                    {/* Name + Skills */}
                    <td style={{ textAlign: 'left' }}>
                      <div className="fw-semibold">
                        {course.title}
                      </div>

                      {course.skills && course.skills.length > 0 && (
                        <div
                          style={{
                            fontSize: '0.8rem',
                            color: '#6c757d',
                            marginTop: '3px'
                          }}
                        >
                          {course.skills.join(', ')}
                        </div>
                      )}
                    </td>

                    <td>{course.level || '-'}</td>
                    <td>{course.category || '-'}</td>
                    <td>{course.duration || '-'}</td>
                    <td>{course.price ? `Rs ${course.price}` : 'Rs 0'}</td>
                    <td>{course.sort || '-'}</td>

                    {/* Status */}
                    <td>
                      <span
                        className={`status-badge ${course.status === 'Active' ? 'active' : 'inactive'}`}
                        onClick={() => toggleStatus(course._id)}
                        style={{
                          cursor: 'pointer',
                          padding: '2px 6px',
                          borderRadius: '5px',
                          color: 'white',
                          backgroundColor: course.status === 'Active' ? '#28a745' : '#6c757d',
                          fontSize: '0.75rem',
                        }}
                      >
                        {course.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td>
                      <div
                        className="action-buttons"
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '4px'
                        }}
                      >

                        <button
                          className="edit-btn"
                          onClick={() => navigate(`/edit-course/${course._id}`)}
                          style={{ fontSize: '0.75rem' }}
                        >
                          Edit
                        </button>

                        <button
                          className="topics-btn"
                          onClick={() => navigate(`/topics/${course._id}`)}
                          style={{ fontSize: '0.75rem' }}
                        >
                          Topics
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(course._id)}
                          style={{ fontSize: '0.75rem' }}
                        >
                          Delete
                        </button>

                      </div>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>
    </div>
  );
};

export default ManageCourses;