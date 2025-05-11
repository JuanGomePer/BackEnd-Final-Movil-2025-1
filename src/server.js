const { createServer } = require('http');
const { Server } = require('socket.io');
const app = require('./app.js');
const { socketHandler } = require('./sockets/gameSocket.js');

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: '*' }
});

app.use('/api', require('./routes/api.js'))

socketHandler(io);

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
