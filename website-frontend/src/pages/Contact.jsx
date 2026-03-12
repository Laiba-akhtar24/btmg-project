import React, { useState } from "react";
import axios from "axios";
import "./Contact.css";

export default function Contact() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    consent: false
  });

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });

  };

  const submitForm = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/contact",
        form,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      alert(res.data.message || "Message sent successfully");

      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
        consent: false
      });

    } catch (error) {

      console.error("CONTACT FORM ERROR:", error);

      if (error.response) {
        alert(error.response.data.message || "Server error while sending message");
      } else {
        alert("Cannot connect to server. Check backend.");
      }

    }

  };

  return (

    <div className="contact-page">

      <div className="contact-hero">
        <h1>Contact Us</h1>

        <p className="contact-subtitle">
          Have questions or need help? Leave us a message and our team will get back to you within one business day.
        </p>
      </div>

      <div className="contact-form-wrapper">

        <form className="contact-form" onSubmit={submitForm}>

          <div className="form-group">
            <label>Full Name *</label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email *</label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone (Optional)</label>

            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Message *</label>

            <textarea
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group consent">

            <input
              type="checkbox"
              name="consent"
              checked={form.consent}
              onChange={handleChange}
              required
            />

            <label>
              I confirm that all information provided is accurate and may be used by BTMG solely for educational and enrollment purposes.
            </label>

          </div>

          <button type="submit" className="btn-submit">
            Send Message
          </button>

        </form>

      </div>

      <p className="response-time">
        We usually respond within one business day.
      </p>

    </div>
  );

}