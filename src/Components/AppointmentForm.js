import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Styles/AppointmentForm.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function AppointmentForm() {
  const [patientName, setPatientName] = useState("");
  const [patientNumber, setPatientNumber] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientGender, setPatientGender] = useState("default");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [currentSymptoms, setCurrentSymptoms] = useState("");
  const [medications, setMedications] = useState("");
  const [allergies, setAllergies] = useState("");
  const [vitalSigns, setVitalSigns] = useState("");
  const [labResults, setLabResults] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const character = `You are a doctor and have the knowledge of all fields. Here you are getting the data from a patient in which age ${
      patientAge || "none"
    }, gender ${patientGender}, allergies ${
      allergies || "none"
    }, medical history ${medicalHistory || "none"}, vital signs ${
      vitalSigns || "none"
    }, or may be the lab results ${labResults || "none"} are mentioned.`;

    const task = `As a professional doctor, give suggestions to the patient based on the above symptoms which include the possible acute disease in which these symptoms are shown, mention the precautions and suggest the lab tests to check the possible disease for confirmation.and suggest a specialist to be consulted`;

    const format = `Provide the suggestions in step by step and in ordered numeric list with highlighting the main topic and in a readable format where each point begins in new line.`;

    const tone = `Use a simple language that a patient can easily understand.`;

    const prompt = `${character}\n\n${task}\n\n${format}\n\n${tone}`;

    try {
      const res = await axios.post("http://localhost:5000/chat", { prompt });
      console.log(res);
      setResponse(res.data);
      toast.success("Appointment Scheduled!", {
        position: toast.POSITION.TOP_CENTER,
        onOpen: () => setIsSubmitted(true),
        onClose: () => setIsSubmitted(false),
      });
    } catch (error) {
      console.error("Error:", error);
    }

    setPatientName("");
    setPatientNumber("");
    setPatientAge("");
    setPatientGender("default");
    setMedicalHistory("");
    setCurrentSymptoms("");
    setMedications("");
    setAllergies("");
    setVitalSigns("");
    setLabResults("");
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
          <span>Self Diagnose Here</span>
        </h2>

        <form className="form-content" onSubmit={handleSubmit}>
          <label>
            <span className="redAsterisk">*</span>
            Patient Full Name:
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
            />
          </label>

          <label>
            <span className="redAsterisk">*</span>
            Patient Phone Number:
            <input
              type="text"
              value={patientNumber}
              onChange={(e) => setPatientNumber(e.target.value)}
              required
            />
          </label>

          <label>
            <span className="redAsterisk">*</span>
            Patient Age:
            <input
              type="text"
              value={patientAge}
              onChange={(e) => setPatientAge(e.target.value)}
              required
            />
          </label>

          <label>
            <span className="redAsterisk">*</span>
            Patient Gender:
            <select
              value={patientGender}
              onChange={(e) => setPatientGender(e.target.value)}
              required
            >
              <option value="default">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="private">I will inform Doctor only</option>
            </select>
          </label>

          {/* Patient Health Data */}
          <label>
            Current Symptoms:
            <textarea
              value={currentSymptoms}
              onChange={(e) => setCurrentSymptoms(e.target.value)}
            />
          </label>

          <label>
            Medical History:
            <textarea
              value={medicalHistory}
              onChange={(e) => setMedicalHistory(e.target.value)}
            />
          </label>

          <label>
            Medications:
            <textarea
              value={medications}
              onChange={(e) => setMedications(e.target.value)}
            />
          </label>

          <label>
            Allergies:
            <textarea
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
            />
          </label>

          <label>
            Vital Signs:
            <textarea
              value={vitalSigns}
              onChange={(e) => setVitalSigns(e.target.value)}
            />
          </label>

          <label>
            Laboratory Test Results:
            <textarea
              value={labResults}
              onChange={(e) => setLabResults(e.target.value)}
            />
          </label>

          <button type="submit" className="text-appointment-btn">
            Submit and Analyse
          </button>

          <p
            className="success-message"
            style={{ display: isSubmitted ? "block" : "none" }}
          >
            Data submitted sucessfully.
          </p>

          {/* Display response from server */}
          {response && (
            <div className="response alert alert-primary" role="alert">
              <p>{response}</p>
            </div>
          )}
        </form>
      </div>

      <div className="legal-footer">
        <p>© 2024 Health-App. All rights reserved.</p>
      </div>
    </div>
  );
}

export default AppointmentForm;
