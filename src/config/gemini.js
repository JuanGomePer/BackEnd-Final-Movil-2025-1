const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const generateChallenge = async (category = "absurdo") => {
  const prompt = `Genera un reto fotográfico divertido y original para una fiesta en la categoría "${category}"`;

  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [{ parts: [{ text: prompt }] }]
    }
  );

  return response.data.candidates[0].content.parts[0].text;
};

module.exports = { generateChallenge };
