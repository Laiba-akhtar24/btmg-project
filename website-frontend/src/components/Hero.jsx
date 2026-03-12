import React from "react";
import "./hero.css";
import heroImg from "../assets/hero-illustration.png";

function Hero() {
  return (
    <section className="hero">

      <div className="container hero-grid">

        <div className="hero-text">
          <h1>
            Build Your Future <br/>
            in IT with <br/>
            Practical Skills
          </h1>

          <p>
            BTMG Trainings helps beginners enter the world of technology
            through simple, practical courses designed to build real
            industry skills step by step.
          </p>
        </div>

        <div className="hero-image">
          <img src={heroImg} alt="IT Training Illustration" />
        </div>

      </div>

    </section>
  );
}

export default Hero;