const express = require("express");
const router = express.Router();

// Controladores (asegúrate de crearlos en src/controllers/)
const { createRoom, getRoomById, getAllRooms } = require("../controllers/roomController");
const { uploadPhoto, getPhotos } = require("../controllers/photoController");
const { votePhoto, getWinner } = require("../controllers/voteController");

// Rutas de SALAS
router.post("/rooms", createRoom);
router.get("/rooms/:roomId", getRoomById);
router.get("/rooms", getAllRooms); 

// Rutas de FOTOS
router.post("/rooms/:roomId/photos", uploadPhoto);
router.get("/rooms/:roomId/photos", getPhotos);

// Rutas de VOTOS
router.post("/rooms/:roomId/votes", votePhoto);
router.get("/rooms/:roomId/winner", getWinner);

module.exports = router;
