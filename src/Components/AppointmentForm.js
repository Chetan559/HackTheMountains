// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "../Styles/AppointmentForm.css";
// import { ToastContainer, toast } from "react-toastify";
// import axios from "axios";

// function AppointmentForm() {
//   const [patientName, setPatientName] = useState("");
//   const [patientNumber, setPatientNumber] = useState("");
//   const [patientAge, setPatientAge] = useState("");
//   const [patientGender, setPatientGender] = useState("default");
//   const [medicalHistory, setMedicalHistory] = useState("");
//   const [currentSymptoms, setCurrentSymptoms] = useState("");
//   const [medications, setMedications] = useState("");
//   const [allergies, setAllergies] = useState("");
//   const [vitalSigns, setVitalSigns] = useState("");
//   const [labResults, setLabResults] = useState("");
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [response, setResponse] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const character = `You are a doctor and have the knowledge of all fields. Here you are getting the data from a patient in which age ${
//       patientAge || "none"
//     }, gender ${patientGender}, allergies ${
//       allergies || "none"
//     }, medical history ${medicalHistory || "none"}, vital signs ${
//       vitalSigns || "none"
//     }, or may be the lab results ${labResults || "none"} are mentioned.`;

//     const task = `As a professional doctor, give suggestions to the patient based on the above symptoms which include the possible acute disease in which these symptoms are shown, mention the precautions and suggest the lab tests to check the possible disease for confirmation and suggest a specialist to be consulted.`;

//     const format = `Provide the suggestions in step by step and in ordered numeric list with highlighting the main topic and in a readable format where each point begins in a new line.`;

//     const tone = `Use simple language that a patient can easily understand.`;

//     const prompt = `${character}\n\n${task}\n\n${format}\n\n${tone}`;

//     try {
//       const res = await axios.post(
//         "https://5ef3-34-86-228-130.ngrok-free.app/chat",
//         { prompt }
//       );
//       console.log(res);
//       // Ensure you're accessing the `response` key properly
//       setResponse(res.data.response); // Assuming `response` key is part of the response object
//       toast.success("Appointment Scheduled!", {
//         position: toast.POSITION.TOP_CENTER,
//         onOpen: () => setIsSubmitted(true),
//         onClose: () => setIsSubmitted(false),
//       });
//     } catch (error) {
//       console.error("Error:", error);
//       toast.error("An error occurred. Please try again.", {
//         position: toast.POSITION.TOP_CENTER,
//       });
//     }

//     // Clear form fields after submission
//     // setPatientName("");
//     // setPatientNumber("");
//     // setPatientAge("");
//     // setPatientGender("default");
//     // setMedicalHistory("");
//     // setCurrentSymptoms("");
//     // setMedications("");
//     // setAllergies("");
//     // setVitalSigns("");
//     // setLabResults("");
//   };

//   return (
//     <div className="appointment-form-section">
//       <h1 className="legal-siteTitle">
//         <Link to="/">
//           Health-<span className="legal-siteSign">App</span>
//         </Link>
//       </h1>

//       <div className="form-container">
//         <h2 className="form-title">
//           <span>Self Diagnose Here</span>
//         </h2>

//         <form className="form-content" onSubmit={handleSubmit}>
//           <label>
//             <span className="redAsterisk">*</span>
//             Patient Full Name:
//             <input
//               type="text"
//               value={patientName}
//               onChange={(e) => setPatientName(e.target.value)}
//               required
//             />
//           </label>

//           <label>
//             <span className="redAsterisk">*</span>
//             Patient Phone Number:
//             <input
//               type="text"
//               value={patientNumber}
//               onChange={(e) => setPatientNumber(e.target.value)}
//               required
//             />
//           </label>

//           <label>
//             <span className="redAsterisk">*</span>
//             Patient Age:
//             <input
//               type="text"
//               value={patientAge}
//               onChange={(e) => setPatientAge(e.target.value)}
//               required
//             />
//           </label>

//           <label>
//             <span className="redAsterisk">*</span>
//             Patient Gender:
//             <select
//               value={patientGender}
//               onChange={(e) => setPatientGender(e.target.value)}
//               required
//             >
//               <option value="default">Select</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="private">I will inform Doctor only</option>
//             </select>
//           </label>

//           {/* Patient Health Data */}
//           <label>
//             Current Symptoms:
//             <textarea
//               value={currentSymptoms}
//               onChange={(e) => setCurrentSymptoms(e.target.value)}
//             />
//           </label>

//           <label>
//             Medical History:
//             <textarea
//               value={medicalHistory}
//               onChange={(e) => setMedicalHistory(e.target.value)}
//             />
//           </label>

//           <label>
//             Medications:
//             <textarea
//               value={medications}
//               onChange={(e) => setMedications(e.target.value)}
//             />
//           </label>

//           <label>
//             Allergies:
//             <textarea
//               value={allergies}
//               onChange={(e) => setAllergies(e.target.value)}
//             />
//           </label>

//           <label>
//             Vital Signs:
//             <textarea
//               value={vitalSigns}
//               onChange={(e) => setVitalSigns(e.target.value)}
//             />
//           </label>

//           <label>
//             Laboratory Test Results:
//             <textarea
//               value={labResults}
//               onChange={(e) => setLabResults(e.target.value)}
//             />
//           </label>

//           <button type="submit" className="text-appointment-btn">
//             Submit and Assist
//           </button>

//           <p
//             className="success-message"
//             style={{ display: isSubmitted ? "block" : "none" }}
//           >
//             Data submitted successfully.
//           </p>

//           {/* Display response from server */}
//           {response && (
//             <div className="response alert alert-primary" role="alert">
//               <p>{response}</p> {/* Renders response correctly */}
//             </div>
//           )}
//         </form>
//       </div>

//       <div className="legal-footer">
//         <p>© 2024 Health-App. All rights reserved.</p>
//       </div>
//     </div>
//   );
// }

// export default AppointmentForm;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/AppointmentForm.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import jsPDF from "jspdf";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const character = `You are a doctor and have the knowledge of all fields. Here you are getting the data from a patient in which age ${
      patientAge || "none"
    }, gender ${patientGender}, allergies ${
      allergies || "none"
    }, medical history ${medicalHistory || "none"}, vital signs ${
      vitalSigns || "none"
    }, or may be the lab results ${labResults || "none"} are mentioned.`;

    const task = `As a professional doctor, give suggestions to the patient based on the above symptoms which include the possible acute disease in which these symptoms are shown, mention the precautions and suggest the lab tests to check the possible disease for confirmation and suggest a specialist to be consulted.`;

    const format = `Provide the suggestions in step by step and in ordered numeric list with highlighting the main topic and in a readable format where each point begins in a new line.`;

    const tone = `Use simple language that a patient can easily understand.`;

    const prompt = `${character}\n\n${task}\n\n${format}\n\n${tone}`;

    try {
      const res = await axios.post(
        "https://9010-35-224-134-96.ngrok-free.app/chat",
        { prompt }
      );
      setResponse(res.data.response); // Assuming `response` key is part of the response object
      toast.success("Appointment Scheduled!", {
        position: toast.POSITION.TOP_CENTER,
        onOpen: () => setIsSubmitted(true),
        onClose: () => setIsSubmitted(false),
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.", {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
      setIsSubmitting(false); // Ensure the button is enabled again
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add "Health-App" text to the center
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");

    const pageWidth = doc.internal.pageSize.width;
    const textWidth = doc.getTextWidth("Health-App");

    doc.setTextColor(0, 0, 255); // Blue color for "Health"
    doc.text("Health", (pageWidth - textWidth) / 2, 20);

    doc.setTextColor(0, 0, 0); // Black color for "App"
    doc.text(
      "App",
      (pageWidth - textWidth) / 2 + doc.getTextWidth("Health"),
      20
    );

    // Move down after the title
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Patient Details", 10, 40); // Adjust position as needed

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold"); // Bold main points
    doc.text("Name:", 10, 50);
    doc.setFont("helvetica", "normal");
    doc.text(patientName || "None", 50, 50);

    doc.setFont("helvetica", "bold");
    doc.text("Phone Number:", 10, 60);
    doc.setFont("helvetica", "normal");
    doc.text(patientNumber || "None", 50, 60);

    doc.setFont("helvetica", "bold");
    doc.text("Age:", 10, 70);
    doc.setFont("helvetica", "normal");
    doc.text(patientAge || "None", 50, 70);

    doc.setFont("helvetica", "bold");
    doc.text("Gender:", 10, 80);
    doc.setFont("helvetica", "normal");
    doc.text(patientGender || "None", 50, 80);

    doc.setFont("helvetica", "bold");
    doc.text("Medical History:", 10, 90);
    doc.setFont("helvetica", "normal");
    doc.text(medicalHistory || "None", 50, 90);

    doc.setFont("helvetica", "bold");
    doc.text("Current Symptoms:", 10, 100);
    doc.setFont("helvetica", "normal");
    doc.text(currentSymptoms || "None", 50, 100);

    doc.setFont("helvetica", "bold");
    doc.text("Medications:", 10, 110);
    doc.setFont("helvetica", "normal");
    doc.text(medications || "None", 50, 110);

    doc.setFont("helvetica", "bold");
    doc.text("Allergies:", 10, 120);
    doc.setFont("helvetica", "normal");
    doc.text(allergies || "None", 50, 120);

    doc.setFont("helvetica", "bold");
    doc.text("Vital Signs:", 10, 130);
    doc.setFont("helvetica", "normal");
    doc.text(vitalSigns || "None", 50, 130);

    doc.setFont("helvetica", "bold");
    doc.text("Laboratory Test Results:", 10, 140);
    doc.setFont("helvetica", "normal");
    doc.text(labResults || "None", 50, 150); // Ensure proper spacing between "Laboratory Test Results" and content

    // Add doctor's response on a new page
    doc.addPage();
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Doctor's Response", 10, 10);

    // Ensure response text fits within page margins
    const responseLines = doc.splitTextToSize(response, 190); // 190 is the width of the text area
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");

    let y = 20;
    responseLines.forEach((line) => {
      doc.text(line, 10, y);
      y += 10; // Line height adjustment
    });

    // Save the PDF
    doc.save("AnalysisReport.pdf");
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
            Submit and Assist
          </button>

          <p
            className="success-message"
            style={{ display: isSubmitted ? "block" : "none" }}
          >
            Data submitted successfully.
          </p>

          {/* Display response from server */}
          {response && (
            <>
              <div className="response alert alert-primary" role="alert">
                <p>{response}</p> {/* Renders response correctly */}
              </div>
              <button
                type="button"
                className="text-appointment-btn"
                onClick={generatePDF}
              >
                Download PDF
              </button>
            </>
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
