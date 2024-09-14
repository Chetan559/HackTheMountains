const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

dotenv.config();
// Initialize the GoogleGenerativeAI instance with your API key
const genAI = new GoogleGenerativeAI(process.env.OPENAI_API_KEY);
const MODEL_NAME = "gemini-1.0-pro";

// Define route handlers
router.post("/chat", async (req, res) => {
  const { prompt } = req.body;
  console.log("Received prompt:", prompt);
  const variable =
    "You are a doctor and have the knowledge of all fields. Here you are getting the data from a patient in which age 2, gender male, allergies none, medical history none, vital signs none, or may be the lab results none are mentioned.As a professional doctor, give suggestions to the patient based on the above symptoms which include the possible acute disease in which these symptoms are shown, mention the precautions and suggest the lab tests to check the possible disease for confirmation.and suggest a specialist to be consulted.Provide the suggestions in step by step and in ordered numeric list with highlighting the main topic and in a readable format where each point begins in new line.Use a simple language that a patient can easily understand.";

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt + variable }] }],
      generationConfig,
      safetySettings,
    });

    const response = result.response;
    res.send(response.candidates[0].content.parts[0].text);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Export the router instance
module.exports = router;
