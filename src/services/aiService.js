const { generateChallenge } = require("../config/gemini");

async function getChallenge(category = "general") {
  const prompt = `Genera un reto divertido y visual para una fiesta, categoría: ${category}.`;
  const challenge = await generateChallenge(prompt);
  return challenge;
}

module.exports = { getChallenge };
