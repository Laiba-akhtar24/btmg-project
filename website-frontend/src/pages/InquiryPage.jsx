// src/pages/InquiryPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import InquiryForm from "../components/InquiryForm";

function InquiryPage() {
  const { id } = useParams();
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

  if (!course)
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;

  return (
    <div className="inquiry-page">
      <h1>Course Inquiry</h1>
      <p>Share your questions and our BTMG team will get back to you.</p>
      <InquiryForm course={course} />
    </div>
  );
}

export default InquiryPage;