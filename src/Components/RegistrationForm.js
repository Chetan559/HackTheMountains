import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/AppointmentForm.css";

function DoctorRegistration() {
  const [doctorName, setDoctorName] = useState("");
  const [doctorSpecialization, setDoctorSpecialization] = useState("");
  const [doctorEmail, setDoctorEmail] = useState("");
  const [doctorPassword, setDoctorPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send doctor registration data to the server
      const response = await axios.post("http://localhost:5000/registerDoctor", {
        name: doctorName,
        specialization: doctorSpecialization,
        email: doctorEmail,
        password: doctorPassword,
      });
      
      // Handle success
      console.log(response.data);
      toast.success("Doctor registration successful!", {
        position: toast.POSITION.TOP_CENTER,
        onClose: () => setIsSubmitted(true),
      });
    } catch (error) {
      // Handle error
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    // Clear form fields
    setDoctorName("");
    setDoctorSpecialization("");
    setDoctorEmail("");
    setDoctorPassword("");
  };

  return (
    <div className="appointment-form-section">
      <h1 className="legal-siteTitle">
        <Link to="/">
          Health-<span className="legal-siteSign">App</span>
        </Link>
      </h1>

      <div className="form-container">
        <h2 className="form-title">
          <span>Doctor Registration</span>
        </h2>

        <form className="form-content" onSubmit={handleSubmit}>
          <label>
            Doctor Full Name:
            <input
              type="text"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              required
            />
          </label>

          <label>
            Specialization:
            <input
              type="text"
              value={doctorSpecialization}
              onChange={(e) => setDoctorSpecialization(e.target.value)}
              required
            />
          </label>

          <label>
            Email Address:
            <input
              type="email"
              value={doctorEmail}
              onChange={(e) => setDoctorEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Password:
            <input
              type="password"
              value={doctorPassword}
              onChange={(e) => setDoctorPassword(e.target.value)}
              required
            />
          </label>

          <button type="submit" className="text-appointment-btn">
            Register
          </button>

          <p
            className="success-message"
            style={{ display: isSubmitted ? "block" : "none" }}
          >
            Doctor registration submitted successfully.
          </p>
        </form>
      </div>

      <div className="legal-footer">
        <p>© 2024 Health-App. All rights reserved.</p>
      </div>
    </div>
  );
}

export default DoctorRegistration;
