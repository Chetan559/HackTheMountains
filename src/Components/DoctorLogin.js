// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "../Styles/AppointmentForm.css";

// function DoctorLoginForm() {
//   const [doctorEmail, setDoctorEmail] = useState("");
//   const [doctorPassword, setDoctorPassword] = useState("");
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Send doctor login credentials to the server
//       const response = await axios.post("http://localhost:5000/loginDoctor", {
//         email: doctorEmail,
//         password: doctorPassword,
//       });

//       // Handle success
//       console.log(response.data);
//       toast.success("Doctor login successful!", {
//         position: toast.POSITION.TOP_CENTER,
//         onClose: () => setIsSubmitted(true),
//       });
//     } catch (error) {
//       // Handle error
//       console.error("Error:", error);
//       toast.error("Invalid email or password. Please try again.", {
//         position: toast.POSITION.TOP_CENTER,
//       });
//     }

//     // Clear form fields
//     setDoctorEmail("");
//     setDoctorPassword("");
//   };

//   return (
//     <div className="login-form-section">
//       <h1 className="legal-siteTitle">
//         <Link to="/">
//           Health-<span className="legal-siteSign">App</span>
//         </Link>
//       </h1>

//       <div className="form-container">
//         <h2 className="form-title">
//           <span>Doctor Login</span>
//         </h2>

//         <form className="form-content" onSubmit={handleSubmit}>
//           <label>
//             Email Address:
//             <input
//               type="email"
//               value={doctorEmail}
//               onChange={(e) => setDoctorEmail(e.target.value)}
//               required
//             />
//           </label>

//           <label>
//             Password:
//             <input
//               type="password"
//               value={doctorPassword}
//               onChange={(e) => setDoctorPassword(e.target.value)}
//               required
//             />
//           </label>

//           <button type="submit" className="text-login-btn">
//             Login
//           </button>

//           <p
//             className="success-message"
//             style={{ display: isSubmitted ? "block" : "none" }}
//           >
//             Doctor login successful.
//           </p>
//         </form>
//       </div>

//       <div className="legal-footer">
//         <p>© 2024 Health-App. All rights reserved.</p>
//       </div>
//     </div>
//   );
// }

// export default DoctorLoginForm;


import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "../Styles/AppointmentForm.css"; // This should be AppointmentForm.css if it's used in this component

function DoctorLoginForm() {
  const [doctorEmail, setDoctorEmail] = useState("");
  const [doctorPassword, setDoctorPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send doctor login credentials to the server
      const response = await axios.post("http://localhost:5000/loginDoctor", {
        email: doctorEmail,
        password: doctorPassword,
      });

      // Handle success
      console.log(response.data);
      toast.success("Doctor login successful!", {
        position: toast.POSITION.TOP_CENTER,
        onClose: () => setIsSubmitted(true),
      });
    } catch (error) {
      // Handle error
      console.error("Error:", error);
      toast.error("Invalid email or password. Please try again.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    // Clear form fields
    setDoctorEmail("");
    setDoctorPassword("");
  };

  return (
    <div className="login-form-section">
      <h1 className="legal-siteTitle">
        <Link to="/">
          Health-<span className="legal-siteSign">App</span>
        </Link>
      </h1>

      <div className="form-container">
        <h2 className="form-title">
          <span>Doctor Login</span>
        </h2>

        <form className="form-content" onSubmit={handleSubmit}>
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

          <button type="submit" className="text-login-btn">
            Login
          </button>

          <p
            className="success-message"
            style={{ display: isSubmitted ? "block" : "none" }}
          >
            Doctor login successful.
          </p>
        </form>
      </div>

      <div className="legal-footer">
        <p>© 2024 Health-App. All rights reserved.</p>
      </div>
    </div>
  );
}

export default DoctorLoginForm;
