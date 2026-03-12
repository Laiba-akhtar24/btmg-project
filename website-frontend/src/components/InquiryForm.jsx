// website-frontend\src\pages\InquiryFormPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./InquiryForm.css";

export default function InquiryFormPage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const API = "http://localhost:5000/api";

  // Fetch course details by ID
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

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!course) return alert("Course data not loaded yet.");
    setLoading(true);
    try {
      const payload = {
        course_name: course.title || course.name || "Course",
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      };

      console.log("Submitting inquiry:", payload); // DEBUG

      // Fixed syntax: use backticks for template literal
      await axios.post(`${API}/course-inquiries`, payload);

      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("Inquiry submission error:", err);
      alert(
        err.response?.data?.message ||
          "Failed to submit inquiry. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!course)
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        Loading course...
      </p>
    );

  return (
    <div className="inquiry-page-wrapper">
      <button
        className="inquiry-close-btn"
        onClick={() => window.history.back()} // Go back to previous page
      >
        &times;
      </button>

      <h1>Course Inquiry</h1>
      <h2>{course.title || course.name}</h2>
      <p>
        Share your questions and our BTMG USA team will get back to you within
        24 hours.
      </p>

      <form onSubmit={handleSubmit} className="inquiry-page-form">
        {success && (
          <p className="alert-success">
            Your inquiry has been submitted successfully!
          </p>
        )}

        <label>Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />

        <label>Phone (Optional)</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
        />

        <label>Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your inquiry message..."
          required
        />

        <div className="consent-box">
          <p>
            <input type="checkbox" required /> I confirm that all information
            provided is accurate.
          </p>
          <p>
            I agree that my information will be used by BTMG solely for
            educational and enrollment purposes.
          </p>
          <p>
            I understand that my data will not be shared with any third-party
            organizations.
          </p>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Submitting..." : "Submit Inquiry"}
        </button>
      </form>
    </div>
  );
}