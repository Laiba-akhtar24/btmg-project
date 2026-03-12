import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./AddCourse.css";

const EditCourse = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const API_URL = "http://localhost:5000/api/courses";

  const [course, setCourse] = useState({
    title: "",
    category: "",
    description: "",
    durationValue: "",
    durationUnit: "",
    level: "",
    price: 0,
    status: "Active",
    skills: [],
    sort: 0
  });

  const [categories, setCategories] = useState([]);
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");

  // ================= FETCH COURSE =================
  const fetchCourse = async () => {
    try {

      const res = await axios.get(`${API_URL}/${id}`);
      const data = res.data;

      let durationValue = "";
      let durationUnit = "";

      if (data.duration) {
        const parts = data.duration.split(" ");
        durationValue = parts[0];
        durationUnit = parts[1];
      }

      setCourse({
        title: data.title || "",
        category: data.category || "",
        description: data.description || "",
        durationValue,
        durationUnit,
        level: data.level || "",
        price: data.price || 0,
        status: data.status || "Active",
        skills: data.skills || [],
        sort: data.sort || 0
      });

      setSkills(data.skills || []);

    } catch (err) {
      console.error("Error fetching course:", err);
    }
  };

  // ================= FETCH CATEGORIES =================
  const fetchCategories = async () => {
    try {

      const res = await axios.get("http://localhost:5000/api/categories");

      setCategories(res.data);

    } catch (err) {
      console.error("Category fetch error:", err);
    }
  };

  useEffect(() => {

    fetchCourse();
    fetchCategories();

  }, [id]);

  // ================= INPUT CHANGE =================
  const handleChange = (e) => {

    setCourse({
      ...course,
      [e.target.name]: e.target.value
    });

  };

  // ================= ADD SKILL =================
  const handleAddSkill = () => {

    const skill = skillInput.trim();

    if (skill && !skills.includes(skill)) {

      const updatedSkills = [...skills, skill];

      setSkills(updatedSkills);

      setCourse({
        ...course,
        skills: updatedSkills
      });

      setSkillInput("");

    }

  };

  // ================= REMOVE SKILL =================
  const handleRemoveSkill = (index) => {

    const updatedSkills = skills.filter((_, i) => i !== index);

    setSkills(updatedSkills);

    setCourse({
      ...course,
      skills: updatedSkills
    });

  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {

    e.preventDefault();

    const duration = `${course.durationValue} ${course.durationUnit}`;

    try {

      await axios.put(`${API_URL}/${id}`, {
        ...course,
        duration
      });

      alert("Course updated successfully!");

      navigate("/courses");

    } catch (err) {

      console.error("Update error:", err);

      alert("Update failed");

    }

  };

  return (

    <div className="dashboard-container">

      <div className="main-content">

        <h1>Edit Course</h1>

        <form className="add-course-form" onSubmit={handleSubmit}>

          {/* TITLE */}
          <label>Course Title</label>

          <input
            type="text"
            name="title"
            value={course.title}
            onChange={handleChange}
            required
          />

          {/* CATEGORY DROPDOWN */}
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

          {/* DESCRIPTION */}
          <label>Description</label>

          <textarea
            name="description"
            value={course.description}
            onChange={handleChange}
            rows="4"
            required
          />

          {/* LEVEL */}
          <label>Level</label>

          <select
            name="level"
            value={course.level}
            onChange={handleChange}
            required
          >

            <option value="">Select Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>

          </select>

          {/* DURATION */}
          <label>Duration</label>

          <div className="duration-wrapper">

            <input
              type="number"
              name="durationValue"
              value={course.durationValue}
              onChange={handleChange}
              required
            />

            <select
              name="durationUnit"
              value={course.durationUnit}
              onChange={handleChange}
              required
            >

              <option value="">Unit</option>
              <option value="Days">Days</option>
              <option value="Weeks">Weeks</option>
              <option value="Months">Months</option>
              <option value="Hours">Hours</option>

            </select>

          </div>

          {/* PRICE */}
          <label>Price</label>

          <input
            type="number"
            name="price"
            value={course.price}
            onChange={handleChange}
            min="0"
          />

          {/* SKILLS */}
          <label>Skills</label>

          <div className="skills-input">

            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder="Add skill"
            />

            <button
              type="button"
              onClick={handleAddSkill}
            >
              Add
            </button>

          </div>

          <div className="skills-list">

            {skills.map((skill, i) => (

              <span key={i} className="skill-tag">

                {skill}

                <button
                  type="button"
                  onClick={() => handleRemoveSkill(i)}
                >
                  ×
                </button>

              </span>

            ))}

          </div>

          {/* SORT */}
          <label>Sort Order</label>

          <input
            type="number"
            name="sort"
            value={course.sort}
            onChange={handleChange}
          />

          {/* STATUS */}
          <div className="status-checkbox">

            <input
              type="checkbox"
              checked={course.status === "Active"}
              onChange={(e) =>
                setCourse({
                  ...course,
                  status: e.target.checked ? "Active" : "Inactive"
                })
              }
            />

            <label>Active</label>

          </div>

          {/* BUTTONS */}
          <div className="form-buttons">

            <button type="submit">
              Update Course
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/courses")}
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>

  );

};

export default EditCourse;