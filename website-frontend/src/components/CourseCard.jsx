import React from "react";
import { useNavigate } from "react-router-dom";
import "./CourseCard.css";

function CourseCard({ course }) {

  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/course/${course._id}`);
  };

  return (

    <div className="course-card">

      <p className="course-duration">
        Duration: {course.duration}
      </p>

      <h3 className="course-title">
        {course.title}
      </h3>

      <p className="course-charges">
        Charges: {course.price}
      </p>

      <span className="course-level">
        {course.level}
      </span>

      <button
        className="course-btn"
        onClick={handleViewDetails}
      >
        View Details
      </button>

    </div>

  );

}

export default CourseCard;