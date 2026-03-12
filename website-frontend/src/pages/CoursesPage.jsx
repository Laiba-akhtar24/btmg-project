// src/pages/CoursesPage.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import CourseCard from "../components/CourseCard";
import "./CoursesPage.css";

const CoursesPage = () => {

  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Courses
  const fetchCourses = async () => {
  try {

    const res = await axios.get("http://localhost:5000/api/courses");

    const launchRes = await axios.get("http://localhost:5000/api/launch-dates");

    // Get launch course names
    const today = new Date().toISOString().split("T")[0];

const launchCourses = launchRes.data
  .filter(ld => ld.launch_date >= today)
  .map(ld => ld.course);

    // Filter courses
    const filtered = res.data.filter(course =>
      course.status === "Active" && launchCourses.includes(course.title)
    );

    setCourses(filtered);

    setLoading(false);

  } catch (err) {
    console.error(err);
    setError("Failed to fetch courses");
    setLoading(false);
  }
};
  // Fetch Categories
  const fetchCategories = async () => {
    try {

      const res = await axios.get("http://localhost:5000/api/categories");

      const catNames = res.data.map((cat) => cat.name);

      setCategories(catNames);

    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchCategories();
  }, []);

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        Loading courses...
      </p>
    );

  if (error)
    return (
      <p style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
        {error}
      </p>
    );

  // Filter Logic
  const filteredCourses = courses.filter((course) => {

    const categoryMatch =
      selectedCategory === "All Categories" ||
      course.category.toLowerCase() === selectedCategory.toLowerCase();

    const levelMatch =
      selectedLevel === "All Levels" ||
      course.level.toLowerCase() === selectedLevel.toLowerCase();

    return categoryMatch && levelMatch;

  });

  return (

    <div className="courses-page">

      <h1>Our Courses</h1>

      <div className="courses-layout">

        {/* FILTER SIDEBAR */}

        <div className="filters">

          {/* Categories */}

          <div className="filter-section">

            <h3>Categories</h3>

            <label>
              <input
                type="radio"
                name="category"
                value="All Categories"
                checked={selectedCategory === "All Categories"}
                onChange={(e) => setSelectedCategory(e.target.value)}
              />
              All Categories
            </label>

            {categories.map((cat, index) => (

              <label key={index}>

                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={selectedCategory === cat}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                />

                {cat}

              </label>

            ))}

          </div>


          {/* Levels */}

          <div className="filter-section">

            <h3>Levels</h3>

            <label>
              <input
                type="radio"
                name="level"
                value="All Levels"
                checked={selectedLevel === "All Levels"}
                onChange={(e) => setSelectedLevel(e.target.value)}
              />
              All Levels
            </label>

            <label>
              <input
                type="radio"
                name="level"
                value="Beginner"
                checked={selectedLevel === "Beginner"}
                onChange={(e) => setSelectedLevel(e.target.value)}
              />
              Beginner
            </label>

            <label>
              <input
                type="radio"
                name="level"
                value="Intermediate"
                checked={selectedLevel === "Intermediate"}
                onChange={(e) => setSelectedLevel(e.target.value)}
              />
              Intermediate
            </label>

            <label>
              <input
                type="radio"
                name="level"
                value="Advanced"
                checked={selectedLevel === "Advanced"}
                onChange={(e) => setSelectedLevel(e.target.value)}
              />
              Advanced
            </label>

          </div>

        </div>


        {/* COURSES GRID */}

        <div className="courses-content">

          {filteredCourses.length === 0 ? (

            <p style={{ textAlign: "center", marginTop: "20px" }}>
              No courses available.
            </p>

          ) : (

            <div className="courses-grid">

              {filteredCourses.map((course) => (

                <CourseCard key={course._id} course={course} />

              ))}

            </div>

          )}

        </div>

      </div>

    </div>

  );

};

export default CoursesPage;