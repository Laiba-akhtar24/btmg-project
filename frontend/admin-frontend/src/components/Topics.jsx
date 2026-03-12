// Topics.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Topics.css';

const Topics = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState({});
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: '',
    description: '',
    sort: 1,
    status: 'Inactive'
  });

  const API_URL = 'http://localhost:5000/api';

  // Fetch course info and topics
  const fetchTopics = async () => {
    try {
      setLoading(true);
      const courseRes = await axios.get(`${API_URL}/courses/${courseId}`);
      setCourse(courseRes.data);

      const topicsRes = await axios.get(`${API_URL}/topics/${courseId}`);
      setTopics(topicsRes.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, [courseId]);

  // Reset form
  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      sort: 1,
      status: 'Inactive'
    });
    setEditingId(null);
  };

  // Handle edit click
  const handleEdit = (topic) => {
    setEditingId(topic._id);
    setForm({
      title: topic.title,
      description: topic.description,
      sort: topic.sort,
      status: topic.status
    });
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle submit (add or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update existing topic
        const res = await axios.put(`${API_URL}/topics/${editingId}`, form);
        setTopics(topics.map(t => t._id === editingId ? res.data : t));
        alert('Topic updated successfully');
      } else {
        // Add new topic
        const res = await axios.post(`${API_URL}/topics/${courseId}`, form);
        setTopics([...topics, res.data]);
        alert('Topic added successfully');
      }
      resetForm();
    } catch (err) {
      console.error(err);
      alert(editingId ? 'Failed to update topic' : 'Failed to add topic');
    }
  };

  // Delete topic
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this topic?')) return;
    try {
      await axios.delete(`${API_URL}/topics/${id}`);
      setTopics(topics.filter(t => t._id !== id));
      if (editingId === id) {
        resetForm();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle status
  const toggleStatus = async (id) => {
    const topic = topics.find(t => t._id === id);
    if (!topic) return;
    
    const newStatus = topic.status === 'Active' ? 'Inactive' : 'Active';
    try {
      const res = await axios.put(`${API_URL}/topics/${id}`, { status: newStatus });
      setTopics(topics.map(t => t._id === id ? res.data : t));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="main-content">
        {/* Header */}
        <div className="topics-header">
          <div className="header-row">
            <h1 className="page-title">Manage Topics</h1>
            <button
              className="back-btn"
              onClick={() => navigate('/courses')}
            >
              ← Back to Courses
            </button>
          </div>
          <div className="course-row">
            <span className="course-name">{course.title}</span>
          </div>
        </div>

        {/* Add/Edit Topic Form */}
        <div className="card topic-form-card">
          <div className="card-body">
            <h5 className="form-title">{editingId ? 'Edit Topic' : 'Add New Topic'}</h5>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Topic Title</label>
                <input type="text" required
                  className="form-control"
                  placeholder="e.g. Introduction to Basics"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  className="form-control"
                  placeholder="Topic description..."
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="form-row">
                <div className="form-group sort-group">
                  <label>Sort Order</label>
                  <input type="number"
                    className="form-control sort-input"
                    value={form.sort}
                    onChange={e => setForm({ ...form, sort: parseInt(e.target.value) || 1 })}
                  />
                </div>

                <div className="form-check">
                  <input type="checkbox"
                    className="form-check-input"
                    checked={form.status === 'Active'}
                    onChange={e => setForm({ ...form, status: e.target.checked ? 'Active' : 'Inactive' })}
                  />
                  <label className="form-check-label">Active</label>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingId ? 'Update Topic' : 'Add Topic'}
                </button>
                {editingId && (
                  <button type="button" className="btn btn-secondary" onClick={resetForm}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Topics Table */}
        <div className="card topics-table-card">
          <div className="card-body">
            <h5>Topics List</h5>
            {loading ? <p>Loading...</p> :
              topics.length === 0 ? <p>No topics available</p> :
                <div className="table-responsive">
                  <table className="table topics-table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Sort</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topics.map(topic => (
                        <tr key={topic._id} className={editingId === topic._id ? 'editing-row' : ''}>
                          <td>{topic.title}</td>
                          <td>{topic.description}</td>
                          <td>{topic.sort}</td>
                          <td>
                            <span className={`status-badge ${topic.status === 'Active' ? 'active' : 'inactive'}`}
                                  onClick={() => toggleStatus(topic._id)}>
                              {topic.status}
                            </span>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button 
                                className="btn btn-warning btn-sm" 
                                onClick={() => handleEdit(topic)}
                              >
                                Edit
                              </button>
                              <button 
                                className="btn btn-delete btn-sm" 
                                onClick={() => handleDelete(topic._id)}
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
            }
          </div>
        </div>

      </div>
    </div>
  );
};

export default Topics;