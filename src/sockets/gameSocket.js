// src/sockets/gameSocket.js
const { getChallenge } = require('../services/aiService.js');
const { db } = require('../config/firebase.js');

function socketHandler(io) {
  io.on('connection', (socket) => {
    console.log(`Usuario conectado: ${socket.id}`);

    socket.on('join-room', async (roomId, userId) => {
      socket.join(roomId);
      const snap = await db.ref(`rooms/${roomId}/players`).get();
      const players = snap.exists() ? Object.values(snap.val()) : [];
      io.to(roomId).emit('player-list-updated', players);
    });

    socket.on('start-round', async ({ roomId, category }) => {
      // Genera reto localmente con Ollama
      const challenge = await getChallenge(category);
      io.to(roomId).emit('new-challenge', challenge);
    });

    socket.on('photo-uploaded', async ({ roomId }) => {
      const snap = await db.ref(`rooms/${roomId}/photos`).get();
      const photos = snap.exists() ? Object.values(snap.val()) : [];
      io.to(roomId).emit('photo-list-updated', photos);
    });

    socket.on('voting-complete', async (roomId) => {
      const votesSnap = await db.ref(`rooms/${roomId}/votes`).get();
      const votes = votesSnap.exists() ? votesSnap.val() : {};
      const tally = {};
      Object.values(votes).forEach(v => {
        tally[v.votedFor] = (tally[v.votedFor] || 0) + 1;
      });
      const playersSnap = await db.ref(`rooms/${roomId}/players`).get();
      const players = playersSnap.exists() ? playersSnap.val() : {};
      const scores = Object.entries(tally).map(([uid, pts]) => ({
        userId: uid,
        votes: pts,
        username: players[uid]?.username || "",
        userPhoto: players[uid]?.userPhoto || ""
      }));
      io.to(roomId).emit('scores-updated', scores);
    });
  });
}

module.exports = { socketHandler };
