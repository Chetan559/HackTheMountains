import React from "react";
import InformationCard from "./InformationCard";
import {
  faHeartPulse,
  faHospitalUser,
  faComments,
  faRobot,
} from "@fortawesome/free-solid-svg-icons";
import "../Styles/Info.css";

function Info() {
  return (
    <div className="info-section" id="services">
      <div className="info-title-content">
        <h3 className="info-title">
          <span>Services</span>
        </h3>
        <p className="info-description">
          We bring healthcare to your convenience, offering a comprehensive
          range of on-demand medical services tailored to your needs. Our
          platform allows you to connect with experienced online doctors who
          provide expert medical advice, issue online prescriptions, and offer
          quick refills whenever you require them.
        </p>
      </div>

      <div className="info-cards-content">
        <InformationCard
          title="Health Data Input and Management"
          description="Securely input and manage patient health data, including medical history, symptoms, medications, and contextual information."
          icon={faHeartPulse}
        />

        <InformationCard
          title="Doctor Verification and Analysis"
          description="Enable doctors to securely access, verify, and analyze patient data using GPT-powered analysis for insights, diagnoses, and treatment suggestions."
          icon={faHospitalUser}
        />

        <InformationCard
          title="Communication and Collaboration"
          description="Facilitate secure communication and collaboration between patients and doctors, including encrypted messaging, telemedicine integration, and appointment scheduling."
          icon={faComments}
        />

        <InformationCard
          title="GPT-Powered Analysis and Insights"
          description="Utilize GPT technology for advanced analysis of patient data, providing automated insights, potential diagnoses, and personalized recommendations based on evidence-based guidelines and medical literature."
          icon={faRobot}
        />
      </div>
    </div>
  );
}

export default Info;
