const axios = require('axios');

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

async function generateChallenge(prompt) {
  const res = await axios.post(
    `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [{ parts: [{ text: prompt }] }]
    }
  );
  return res.data.candidates[0].content.parts[0].text;
}

module.exports = { generateChallenge };
