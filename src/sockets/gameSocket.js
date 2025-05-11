const { createRoom, getRoom } = require('../services/roomService.js');
const { getChallenge } = require('../services/aiService.js');
const { calculateWinner } = require('../services/voteService');


 const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log(`Usuario conectado: ${socket.id}`);

    socket.on('create-room', async (callback) => {
      const roomId = await createRoom();
      socket.join(roomId);
      callback(roomId);
    });

    socket.on('join-room', (roomId, userId) => {
      socket.join(roomId);
      io.to(roomId).emit('user-joined', userId);
    });

    socket.on('start-round', async ({ roomId, category }) => {
      const challenge = await getChallenge(category);
      io.to(roomId).emit('new-challenge', challenge);
    });

    socket.on('photo-uploaded', ({ roomId, userId }) => {
      io.to(roomId).emit('photo-ready', userId);
    });

    socket.on('voting-complete', async (roomId) => {
      const result = await calculateWinner(roomId);
      io.to(roomId).emit('round-winner', result);
    });
  });
};

module.exports = { socketHandler };