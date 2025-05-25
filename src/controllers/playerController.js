// src/controllers/playerController.js
const { db } = require('../config/firebase.js');

const addPlayer = async (req, res) => {
  const { roomId } = req.params;
  const { userId, username, userPhoto } = req.body;

  if (!userId || !username) {
    return res.status(400).json({ error: 'Faltan userId o username' });
  }
  const player = { userId, username, userPhoto: userPhoto || "" };
  await db.ref(`rooms/${roomId}/players/${userId}`).set(player);

  // Emitir lista actualizada
  if (req.app && req.app.get('io')) {
    req.app.get('io').to(roomId).emit('player-list-updated', [player]);
  }

  res.json({ success: true, player });
};

const getPlayers = async (req, res) => {
  const { roomId } = req.params;
  const snap = await db.ref(`rooms/${roomId}/players`).get();
  if (!snap.exists()) return res.json([]);
  const raw = Object.values(snap.val());
  const players = raw.map(p => ({
    userId: p.userId || '',
    username: p.username || '',
    userPhoto: p.userPhoto || ''
  }));
  res.json(players);
};

module.exports = { addPlayer, getPlayers };
