import React from "react";
import Doctor from "../Assets/doctor-group.png";
import SolutionStep from "./SolutionStep";
import "../Styles/About.css";

function About() {
  return (
    <div className="about-section" id="about">
      <div className="about-image-content">
        <img src={Doctor} alt="Doctor Group" className="about-image1" />
      </div>
      <div className="about-text-content">
        <h3 className="about-title">
          <span>About Us</span>
        </h3>
        <p className="about-description">
          Welcome to Health App, your trusted partner for accessible and
          personalized healthcare. Our platform allows users to input their
          health details for review by expert doctors. The doctors, aided by GPT
          analysis, provide thorough insights into the patient's condition. Join
          us on this journey towards a healthier you.
        </p>

        <h4 className="about-text-title">Your Solutions</h4>

        <SolutionStep
          title="Submit Your Details"
          description="Enter your health details and submit them for review by our expert doctors at Health App. Your information is securely handled, ensuring confidentiality and privacy."
        />

        <SolutionStep
          title="Doctor's Analysis with GPT"
          description="Our doctors utilize advanced GPT analysis to thoroughly review your submitted details. This innovative technology assists in providing accurate insights into your health condition."
        />

        <SolutionStep
          title="Get Your Personalized Solution"
          description="Receive personalized advice and treatment plans from our experienced doctors. Health App is committed to helping you achieve the best possible health outcomes through expert care and innovative solutions."
        />
      </div>
    </div>
  );
}

export default About;
