// src/controllers/voteController.js
const { db } = require('../config/firebase.js');

const votePhoto = async (req, res) => {
  const { roomId } = req.params;
  const { voterId, targetUserId } = req.body;
  if (!voterId || !targetUserId) {
    return res.status(400).json({ error: 'Missing voterId or targetUserId' });
  }
  await db.ref(`rooms/${roomId}/votes/${voterId}`).set({ votedFor: targetUserId });
  res.status(200).json({ message: 'Vote recorded' });
};

const getPodium = async (req, res) => {
  const { roomId } = req.params;
  const votesSnap = await db.ref(`rooms/${roomId}/votes`).get();
  const votes = votesSnap.exists() ? votesSnap.val() : {};
  const tally = {};
  Object.values(votes).forEach(v => {
    tally[v.votedFor] = (tally[v.votedFor] || 0) + 1;
  });
  const playersSnap = await db.ref(`rooms/${roomId}/players`).get();
  const players = playersSnap.exists() ? playersSnap.val() : {};
  const podium = Object.entries(tally)
    .map(([userId, score]) => ({
      userId,
      score,
      username: players[userId]?.username || '',
      userPhoto: players[userId]?.userPhoto || ''
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  res.json(podium);
};

module.exports = { votePhoto, getPodium };
