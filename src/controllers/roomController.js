const { db } = require("../config/firebase");
const { v4: uuidv4 } = require("uuid");

async function createRoom(req, res) {
  const roomId = uuidv4();
  const roomRef = db.ref(`rooms/${roomId}`);

  await roomRef.set({
    id: roomId,
    createdAt: Date.now(),
    players: [],
    status: "waiting"
  });

  res.json({ roomId });
}

module.exports = { createRoom };
