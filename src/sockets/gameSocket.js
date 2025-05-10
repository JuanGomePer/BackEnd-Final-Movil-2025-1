module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado");

    socket.on("join-room", ({ roomId, playerName }) => {
      socket.join(roomId);
      io.to(roomId).emit("player-joined", playerName);
    });

    socket.on("start-challenge", async ({ roomId, category }) => {
      const { getChallenge } = require("../services/aiService");
      const challenge = await getChallenge(category);
      io.to(roomId).emit("new-challenge", challenge);
    });

    socket.on("submit-vote", ({ roomId, voteData }) => {
      // Aquí se puede guardar en Firebase y emitir el resultado
      io.to(roomId).emit("vote-received", voteData);
    });

    socket.on("disconnect", () => {
      console.log("Cliente desconectado");
    });
  });
};
