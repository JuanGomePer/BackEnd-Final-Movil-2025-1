// src/routes/api.js
const express = require('express');
const router = express.Router();

const {
  createRoom,
  getRoomById,
  getAllRooms
} = require('../controllers/roomController');
const {
  uploadPhoto,
  getPhotos
} = require('../controllers/photoController');
const {
  addPlayer,
  getPlayers
} = require('../controllers/playerController');
const {
  votePhoto,
  getPodium
} = require('../controllers/voteController');

// SALAS
router.post('/rooms', createRoom);
router.get('/rooms/:roomId', getRoomById);
router.get('/rooms', getAllRooms);

// FOTOS
router.post('/rooms/:roomId/photos', uploadPhoto);
router.get('/rooms/:roomId/photos', getPhotos);

// VOTOS
router.post('/rooms/:roomId/votes', votePhoto);
router.get('/rooms/:roomId/winner', getPodium);

// JUGADORES
router.post('/rooms/:roomId/players', addPlayer);
router.get('/rooms/:roomId/players', getPlayers);

module.exports = router;
