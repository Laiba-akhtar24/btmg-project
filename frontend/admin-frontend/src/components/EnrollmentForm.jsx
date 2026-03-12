import React, { useState } from "react";
import axios from "axios";
import "./EnrollmentForm.css"; // styling separate file

function EnrollmentForm({ course }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    registrationType: "Individual",
    message: "",
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/enrollments", {
      
        course_name: course.title || course.name,
        ...formData,
      });
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        registrationType: "Individual",
        message: "",
      });
    } catch (err) {
      console.error("Enrollment submission error:", err);
      alert("Failed to submit enrollment. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="enrollment-form-container">
      <h2>Enroll in {course.title || course.name}</h2>
      <p>
        <strong>Duration:</strong> {course.duration || "Flexible"} |{" "}
        <strong>Level:</strong> {course.level || "Beginner"} |{" "}
        <strong>Start:</strong> {course.startDate || "Flexible"}
      </p>

      {success && <p className="alert-success">Enrollment submitted successfully!</p>}

      <form className="enrollment-form" onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your full name"
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="name@email.com"
          required
        />

        <label>Phone (Optional)</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+1 (_) _-__"
        />

        <label>Registration Type</label>
        <select
          name="registrationType"
          value={formData.registrationType}
          onChange={handleChange}
        >
          <option value="Individual">Individual</option>
          <option value="Corporate">Corporate</option>
        </select>

        <label>Message (Optional)</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Any questions, goals, or corporate training request details..."
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

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Registration"}
        </button>
        <p className="consent-note">
          By submitting, you agree to be contacted by BTMG USA for scheduling
          and payment coordination.
        </p>
      </form>
    </div>
  );
}

export default EnrollmentForm;