import React from 'react';
import Hero from '../components/Hero';
import './home.css';
import trainingImg from '../assets/training.jpg';

function HomePage() {
  return (
    <div>

      <Hero />

      <section className="offer-section">
        <div className="container offer-container">

          <div className="offer-image">
            <img src={trainingImg} alt="IT Training" />
          </div>

          <div className="offer-content">
            <h2>What We Offer</h2>

            <p>
              BTMG Trainings helps beginners step into the world of IT with
              structured, easy-to-understand courses. Our programs focus on
              practical knowledge, real-world projects, and step-by-step
              learning so students can confidently start their professional
              careers in technology.
            </p>

            <a href="/courses" className="browse-btn">
              Browse Courses
            </a>

          </div>

        </div>
      </section>

    </div>
  );
}

export default HomePage;