const sendToServer = async (data) => {
  try {
    const response = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to send data to server");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
};

export default sendToServer;
