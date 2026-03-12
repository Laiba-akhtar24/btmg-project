
import "bootstrap-icons/font/bootstrap-icons.css";

import React, { useState } from "react";
import axios from "axios";
import learningImg from "../assets/learning-illustration.png";
import "./About.css";

const About = () => {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/subscribe", {
        email: email,
      });

      setMessage(res.data.message);
      setEmail("");

    } catch (error) {

      if (error.response && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Something went wrong.");
      }

    }
  };

  return (
    <div className="about-page">

      {/* ABOUT INTRO */}
      <div className="container about-intro">

        <div className="about-text">

          <h1>
            Start Learning With Confidence
          </h1>

          <p>
            BTMG Training is designed for beginners, students, and learners
            who want a clear starting point in their learning journey.
          </p>

          <p>
            Our courses break down complex topics into simple steps so
            you can build knowledge gradually and confidently.
          </p>

        </div>

        <div className="about-image">
          <img src={learningImg} alt="Learning Illustration"/>
        </div>

      </div>

      {/* FEATURES */}
      <div className="container features-section">

        <h2>Built for Beginners</h2>

        <p className="section-sub">
          Everything is designed to make learning clear and comfortable.
        </p>

        <div className="features-grid">

  <div className="feature-card">

    <div className="feature-icon">
      <i className="bi bi-book"></i>
    </div>

    <h4>Beginner Friendly</h4>

    <p>
      Courses start from the basics so anyone can begin learning
      without prior knowledge.
    </p>

  </div>

  <div className="feature-card">

    <div className="feature-icon">
      <i className="bi bi-pencil-square"></i>
    </div>

    <h4>Learn by Practice</h4>

    <p>
      Concepts are explained through practical examples that
      help you understand faster.
    </p>

  </div>

  <div className="feature-card">

    <div className="feature-icon">
      <i className="bi bi-graph-up-arrow"></i>
    </div>

    <h4>Step-by-Step Progress</h4>

    <p>
      Structured lessons help you move from beginner to confident
      learner smoothly.
    </p>

  </div>

</div>

      </div>

      {/* SUBSCRIBE */}
      <div className="subscribe-section">

        <form onSubmit={handleSubscribe}>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <button>
            Subscribe
          </button>

        </form>

        {message && <p className="subscribe-message">{message}</p>}

      </div>

    </div>
  );
};

export default About;