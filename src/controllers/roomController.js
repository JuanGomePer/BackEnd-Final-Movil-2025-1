const {
  createRoom,
  getRoomById,
  getRoomByCode,
  getAllRooms
} = require('../services/roomService');

const createRoomCtrl = async (req, res) => {
  try {
    const { name, totalRounds, timeLimit, category } = req.body;
    if (!name || !totalRounds || !timeLimit || !category) {
      return res.status(400).json({ error: 'Faltan parámetros en el body' });
    }
    const roomId = await createRoom({ name, totalRounds, timeLimit, category });
    res.status(201).json({ roomId });
  } catch (error) {
    console.error('CreateRoom error:', error);
    res.status(500).json({ error: 'Error creando sala' });
  }
};

const getRoomByIdCtrl = async (req, res) => {
  try {
    const param = req.params.roomId;
    let room;
    // si el parámetro tiene 6 caracteres, lo tratamos como código
    if (param.length === 6) {
      room = await getRoomByCode(param);
    } else {
      room = await getRoomById(param);
    }
    if (!room) return res.status(404).json({ error: 'Sala no encontrada' });
    res.json(room);
  } catch (error) {
    console.error('GetRoomById error:', error);
    res.status(500).json({ error: 'Error obteniendo sala' });
  }
};

const getAllRoomsCtrl = async (req, res) => {
  try {
    const rooms = await getAllRooms();
    res.json(rooms);
  } catch (error) {
    console.error('GetAllRooms error:', error);
    res.status(500).json({ error: 'Error obteniendo salas' });
  }
};

module.exports = {
  createRoom: createRoomCtrl,
  getRoomById: getRoomByIdCtrl,
  getAllRooms: getAllRoomsCtrl
};