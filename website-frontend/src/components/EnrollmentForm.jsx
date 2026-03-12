import React, { useState } from "react";
import axios from "axios";
import "./EnrollmentForm.css"; // Add styling separately

function EnrollmentForm({ course }) {
  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [registrationType, setRegistrationType] = useState("Individual");
  const [message, setMessage] = useState("");
  const API = "http://localhost:5000/api";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!studentName || !email || !registrationType) {
      return alert("Please fill required fields!");
    }

    const payload = {
      course_name: course.title,
      student_name: studentName,
      email,
      phone,
      registration_type: registrationType,
      message,
    };

    try {
      const res = await axios.post(`${API}/enrollments`, payload);
      alert(res.data.message);
      // Reset form
      setStudentName("");
      setEmail("");
      setPhone("");
      setRegistrationType("Individual");
      setMessage("");
    } catch (err) {
      console.error("Error submitting enrollment:", err);
      alert("Failed to submit enrollment");
    }
  };

  return (
    <div className="enrollment-form-wrapper">
      <h2>Enroll in {course.title}</h2>
      <p>{course.duration} | {course.level} | Starts: {course.startDate}</p>

      <form onSubmit={handleSubmit} className="enrollment-form">
        <label>
          Full Name *
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Your full name"
            required
          />
        </label>

        <label>
          Email *
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@email.com"
            required
          />
        </label>

        <label>
          Phone
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 (_) _-__"
          />
        </label>

        <label>
          Registration Type *
          <select
            value={registrationType}
            onChange={(e) => setRegistrationType(e.target.value)}
            required
          >
            <option value="Individual">Individual</option>
            <option value="Corporate">Corporate</option>
          </select>
        </label>

        <label>
          Message
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Any questions, goals, or corporate training request details..."
          />
        </label>

        <label className="consent">
          <input type="checkbox" required /> I confirm that all information provided is accurate and I agree to be contacted for scheduling and payment coordination.
        </label>

        <button type="submit" className="submit-btn">
          Submit Registration
        </button>
      </form>
    </div>
  );
}

export default EnrollmentForm;