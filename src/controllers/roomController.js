const roomService = require("../services/roomService");

const createRoom = async (req, res) => {
  try {
    const roomId = await roomService.createRoom(req); 
    res.status(201).json({ roomId }); 
  } catch (error) {
    res.status(500).json({ error: "Error creating room" });
  }
};

const getRoomById = async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const room = await roomService.getRoomById(roomId);
    if (!room) return res.status(404).json({ error: "Room not found" });
    res.json(room);
  } catch (error) {
    res.status(500).json({ error: "Error getting room" });
  }
};

const getAllRooms = async (req, res) => {
  try {
    const rooms = await roomService.getAllRooms();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: "Error getting rooms" });
  }
};

module.exports = { createRoom, getRoomById, getAllRooms };
