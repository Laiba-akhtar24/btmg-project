// src/components/AddCourse.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddCourse.css';

const AddCourse = () => {
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    title: '',
    category: '',
    description: '',
    durationValue: '',
    durationUnit: '',
    level: '',
    price: 0,
    status: 'Active',
    skills: [],
    sort: 0
  });

  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]); // For dropdown

  // ================= FETCH CATEGORIES =================
  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  // Add skill
  const handleAddSkill = () => {
    const skill = skillInput.trim();
    if (skill && !skills.includes(skill)) {
      const updatedSkills = [...skills, skill];
      setSkills(updatedSkills);
      setCourse({ ...course, skills: updatedSkills });
      setSkillInput('');
    }
  };

  // Remove skill
  const handleRemoveSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
    setCourse({ ...course, skills: updatedSkills });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!course.durationValue || !course.durationUnit) {
      alert('Please enter duration value and unit.');
      return;
    }

    const payload = {
      ...course,
      duration: `${course.durationValue} ${course.durationUnit}`
    };

    try {
      const res = await axios.post('http://localhost:5000/api/courses', payload);
      alert('Course added successfully!');

      // Clear form
      setCourse({
        title: '',
        category: '',
        description: '',
        durationValue: '',
        durationUnit: '',
        level: '',
        price: 0,
        status: 'Active',
        skills: [],
        sort: 0
      });
      setSkills([]);
      navigate('/courses');
    } catch (err) {
      console.error('Error adding course:', err.response || err);
      alert('Error adding course! Check console.');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="main-content">
        <h1>Add New Course</h1>
        <form className="add-course-form" onSubmit={handleSubmit}>
          <label>Course Title</label>
          <input
            type="text"
            name="title"
            value={course.title}
            onChange={handleChange}
            placeholder="Enter course title"
            required
          />

          <label>Category</label>
          <select
            name="category"
            value={course.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          <label>Description</label>
          <textarea
            name="description"
            value={course.description}
            onChange={handleChange}
            placeholder="Write course description..."
            rows={4}
            required
          />

          <label>Level</label>
          <select name="level" value={course.level} onChange={handleChange} required>
            <option value="">Select Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <label>Duration</label>
          <div className="duration-wrapper">
            <input
              type="number"
              name="durationValue"
              value={course.durationValue}
              onChange={handleChange}
              placeholder="e.g. 6"
              required
            />
            <select
              name="durationUnit"
              value={course.durationUnit}
              onChange={handleChange}
              required
            >
              <option value="">Select Unit</option>
              <option value="Days">Days</option>
              <option value="Weeks">Weeks</option>
              <option value="Months">Months</option>
              <option value="Hours">Hours</option>
            </select>
          </div>

          <label>Price ($)</label>
          <input
            type="number"
            name="price"
            value={course.price}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
          />
          <small>Set 0 if free course</small>

          <label>Skills / Prerequisites</label>
          <div className="skills-input">
            <input
              type="text"
              value={skillInput}
              placeholder="Type a skill and press Add"
              onChange={(e) => setSkillInput(e.target.value)}
            />
            <button type="button" onClick={handleAddSkill}>Add</button>
          </div>
          <div className="skills-list">
            {skills.map((skill, i) => (
              <span key={i} className="skill-tag">
                {skill} <button type="button" onClick={() => handleRemoveSkill(i)}>×</button>
              </span>
            ))}
          </div>

          <label>Sort Order</label>
          <input
            type="number"
            name="sort"
            value={course.sort}
            onChange={handleChange}
          />

          <div className="status-checkbox">
            <input
              type="checkbox"
              name="status"
              checked={course.status === 'Active'}
              onChange={(e) =>
                setCourse({ ...course, status: e.target.checked ? 'Active' : 'Inactive' })
              }
            />
            <label>Active</label>
          </div>

          <div className="form-buttons">
            <button type="submit">Save Course</button>
            <button
  type="button"
  className="cancel-btn"
  onClick={() => navigate('/courses')}
>
  Cancel
</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;