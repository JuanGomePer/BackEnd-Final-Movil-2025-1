const { db } = require('../config/firebase');
const { v4: uuidv4 } = require('uuid');

/**
 * Crea una sala con UUID completo.
 */
async function createRoom({ name, totalRounds, timeLimit, category }) {
  const roomId = uuidv4();
  await db.ref(`rooms/${roomId}`).set({
    id: roomId,
    name,
    players: [],
    challenge: null,
    round: 1,
    votes: {},
    status: 'waiting',
    totalRounds,
    timeLimit,
    category
  });
  return roomId;
}

/**
 * Obtiene la sala por ID completo (UUID).
 */
async function getRoomById(id) {
  const snap = await db.ref(`rooms/${id}`).get();
  return snap.exists() ? snap.val() : null;
}

/**
 * Nuevo: busca la sala cuyo ID empieza con los primeros 6 caracteres
 */
async function getRoomByCode(code6) {
  const snap = await db.ref('rooms').get();
  if (!snap.exists()) return null;
  const rooms = snap.val(); // { fullId: roomData, ... }
  const prefix = code6.toUpperCase();
  for (const [id, room] of Object.entries(rooms)) {
    if (id.slice(0, 6).toUpperCase() === prefix) {
      return room;
    }
  }
  return null;
}

/**
 * Lista todas las salas.
 */
async function getAllRooms() {
  const snap = await db.ref('rooms').get();
  return snap.exists() ? snap.val() : null;
}

module.exports = {
  createRoom,
  getRoomById,
  getRoomByCode,
  getAllRooms
};