import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import EnrollmentForm from "./EnrollmentForm"; // ✅ EnrollmentForm component

function EnrollmentFormWrapper() {
  const { id } = useParams(); // course id from route
  const [course, setCourse] = useState(null);
  const API = "http://localhost:5000/api";

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`${API}/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        console.error("Error fetching course:", err);
      }
    };
    fetchCourse();
  }, [id]);

  if (!course) return <p>Loading course...</p>;

  return <EnrollmentForm course={course} />;
}

export default EnrollmentFormWrapper;