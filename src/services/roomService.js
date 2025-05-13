const { db } = require('../config/firebase'); // usa la instancia ya configurada
const { v4: uuidv4 } = require('uuid');

const createRoom = async (req) => {
  const roomId = uuidv4();
  const name = req.body.name; 
  await db.ref(`rooms/${roomId}`).set({
    id: roomId,
    name: name,
    players: [],
    challenge: null,
    round: 1,
    votes: {},
    status: 'waiting'
  });
  return roomId;
};

const getRoom = async (roomId) => {
  const snapshot = await db.ref(`rooms/${roomId}`).get();
  return snapshot.exists() ? snapshot.val() : null;
};

const getAllRooms = async () => {
  const snapshot = await db.ref('rooms').get();
  return snapshot.exists() ? snapshot.val() : null;
};

module.exports = { createRoom, getRoom, getAllRooms };
