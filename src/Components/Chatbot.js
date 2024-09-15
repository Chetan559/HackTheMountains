// import React, { useState } from "react";
// import "../Styles/Chatbot.css";

// const Chatbot = () => {
//   const [messages, setMessages] = useState([]);
//   const [userInput, setUserInput] = useState("");
//   const [image, setImage] = useState(null);

//   const handleUserInput = (event) => {
//     setUserInput(event.target.value);
//   };

//   const handleImageChange = (event) => {
//     setImage(event.target.files[0]);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const newMessage = {
//       text: userInput,
//       isUser: true,
//     };
//     setMessages([...messages, newMessage]);
//     setUserInput("");
//     setImage(null);

//     // Call API or generate response here
//     const response = "This is a response from the chatbot.";
//     const newResponse = {
//       text: response,
//       isUser: false,
//     };
//     setMessages([...messages, newResponse]);
//   };

//   const handleImageUpload = () => {
//     const formData = new FormData();
//     formData.append("image", image);
//     // Call API to upload image here
//     console.log("Image uploaded!");
//   };

//   return (
//     <div className="full-page-chatbot">
//       <h2>Chatbot</h2>
//       <ul className="message-list">
//         {messages.map((message, index) => (
//           <li
//             key={index}
//             className={message.isUser ? "user-message" : "bot-message"}
//           >
//             {message.text}
//             {message.image && (
//               <img
//                 src={URL.createObjectURL(message.image)}
//                 alt="Uploaded image"
//               />
//             )}
//           </li>
//         ))}
//       </ul>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={userInput}
//           onChange={handleUserInput}
//           placeholder="Type a message..."
//         />
//         <input type="file" onChange={handleImageChange} />
//         <button type="submit">Send</button>
//         {image && (
//           <button type="button" onClick={handleImageUpload}>
//             Upload Image
//           </button>
//         )}
//       </form>
//     </div>
//   );
// };

// export default Chatbot;
import React, { useState } from "react";
import "../Styles/Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [image, setImage] = useState(null);

  // Handle user text input
  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  // Handle image selection
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  // Handle form submission for text input
  const handleSubmit = (event) => {
    event.preventDefault();

    // If user submits text, add the text to the messages list
    const newMessage = {
      text: userInput,
      isUser: true,
    };
    setMessages([...messages, newMessage]);

    // Clear the input field
    setUserInput("");

    // Generate a response from the chatbot (or call an API for a response)
    const response = "This is a response from the chatbot.";
    const newResponse = {
      text: response,
      isUser: false,
    };

    // Add the chatbot response to the messages list
    setMessages((prevMessages) => [...prevMessages, newResponse]);
  };

  // Handle image upload and fetch response from Flask API
  const handleImageUpload = () => {
    const formData = new FormData();
    formData.append("image", image);

    // Add the user's message saying they uploaded an image
    const newMessage = {
      text: "User uploaded an image",
      isUser: true,
      image: image, // Store the image file for previewing in the chat
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // API call to send the image to the Flask server
    fetch("https://b1d3-34-106-70-188.ngrok-free.app/analyze-image", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Display the response from the Flask API
        const newResponse = {
          text: data.description || "No description available",
          isUser: false,
        };
        setMessages((prevMessages) => [...prevMessages, newResponse]);
      })
      .catch((error) => {
        // Handle errors (e.g., server issues)
        console.error("Error:", error);
        const errorResponse = {
          text: "Failed to analyze the image.",
          isUser: false,
        };
        setMessages((prevMessages) => [...prevMessages, errorResponse]);
      });

    // Clear the image after upload
    setImage(null);
  };

  return (
    <div className="full-page-chatbot">
      <h2>Chatbot</h2>
      <ul className="message-list">
        {messages.map((message, index) => (
          <li
            key={index}
            className={message.isUser ? "user-message" : "bot-message"}
          >
            {message.text}
            {message.image && (
              <img
                src={URL.createObjectURL(message.image)}
                alt="Uploaded image"
                style={{ width: "200px", height: "auto" }}
              />
            )}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        {/* <input
          type="text"
          value={userInput}
          onChange={handleUserInput}
          placeholder="Type a message..."
        /> */}
        <input type="file" onChange={handleImageChange} />
        <button type="submit">Send</button>
        {image && (
          <button type="button" onClick={handleImageUpload}>
            Upload Image
          </button>
        )}
      </form>
    </div>
  );
};

export default Chatbot;
