import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../Styles/LegalDocs.css";

function LegalDocs() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  return (
    <div className="legal-section-title">
      <h1 className="legal-siteTitle">
        <Link to="/">
          Health-<span className="legal-siteSign">App</span>
        </Link>
      </h1>

      <div className="legal-text-content">
        <p className="legal-title">General Info</p>
        <p className="legal-description">
          Welcome to Health App, your trusted online healthcare platform. Our
          commitment is to provide accessible and personalized healthcare
          services, ensuring individuals receive expert medical advice and
          treatment. By using our platform, you agree to the terms outlined in
          our Privacy Policy and Terms of Service.
        </p>

        <p className="legal-title">Privacy Policy</p>
        <p className="legal-description">
          Your privacy is of utmost importance to us. Our Privacy Policy
          outlines how we collect, use, and safeguard your personal and medical
          information. Rest assured, we handle data securely, and your
          information is treated with the utmost confidentiality.
        </p>

        <p className="legal-title">Terms of Service</p>
        <p className="legal-description">
          By utilizing Health App, you are bound by our Terms of Service,
          including guidelines for platform use, doctor interactions, and user
          responsibilities. Understanding these terms is essential for a
          seamless experience for all users.
        </p>

        <p className="legal-title">Consultations</p>
        <p className="legal-description">
          Health App connects you with expert doctors for online consultations.
          While these consultations offer convenient medical advice,
          prescriptions, and guidance, they do not replace in-person visits.
          Providing accurate and complete information is crucial for optimal
          care.
        </p>

        <p className="legal-title">How it Works</p>
        <p className="legal-description">
          Health App simplifies healthcare access. Choose a specialist, schedule
          an appointment, and engage in a virtual consultation. Our specialists
          provide personalized advice and treatment plans. Remember, emergencies
          require immediate attention at your local medical facility.
        </p>
      </div>

      <div className="legal-footer">
        <p>© 2024 Health-App. All rights reserved</p>
      </div>
    </div>
  );
}

export default LegalDocs;
