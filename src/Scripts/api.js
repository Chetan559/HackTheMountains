function appendMessage(sender, message) {
  const chatBox = document.getElementById("chat-box");
  const newMessage = document.createElement("div");
  newMessage.innerHTML = `<p><b>${sender}:</b>  ${message}</p>`;
  newMessage.className = "chat-message chat-message--Bot";
  chatBox.appendChild(newMessage);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
  const userMessage = document.getElementById("user-input").value;
  appendMessage("You", userMessage);

  // Send the user message to the backend
  fetch("http://localhost:5000/chat", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: userMessage }),
  })
    .then((r) => r.json())
    .then((r) => {
      appendMessage("Rule_Mitra", r.answer);
    })
    .catch((error) => {
      console.error("Error:", error);
      appendMessage(
        "Rule_Mitra",
        "Apologies, something went wrong. Please try again."
      );
    });
  document.getElementById("user-input").value = ""; //clear input
}
