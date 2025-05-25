// src/services/aiService.js
const axios = require("axios");

const OLLAMA_BASE = process.env.OLLAMA_BASE_URL || "http://127.0.0.1:11434";

async function getChallenge(category = "general") {
  // Le pedimos explícitamente SOLO el reto
  const prompt = `
Genera un reto fotográfico divertido y original para una fiesta en la categoría "${category}".
*Devuélveme únicamente el texto del reto* (por ejemplo: "Tomate una foto con tu comida favorita"), sin ningún saludo, encabezado ni explicación adicional.
`.trim();

  try {
    const res = await axios.post(
      `${OLLAMA_BASE}/v1/completions`,
      {
        model: "llama2",   // ← ajústalo al nombre de tu modelo
        prompt,
        max_tokens: 80,
        temperature: 0.7,
      },
      { timeout: 60000 }
    );

    let text = res.data.choices?.[0]?.text || "";
    text = text.trim();

    // Si vino entre comillas, extraemos solo lo que está dentro
    const m = text.match(/^"(.+)"$/s);
    if (m) {
      return m[1].trim();
    }
    return text;
  } catch (err) {
    console.error("Error en getChallenge:", err.response?.status, err.message);
    // Fallback
    return "Toma una foto haciendo la pose más ridícula que se te ocurra.";
  }
}

module.exports = { getChallenge };
