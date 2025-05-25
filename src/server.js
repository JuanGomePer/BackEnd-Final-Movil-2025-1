// src/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createServer } = require('http');
const { Server } = require('socket.io');
const apiRoutes = require('./routes/api');
const { socketHandler } = require('./sockets/gameSocket');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Montamos las rutas REST bajo /api
app.use('/api', apiRoutes);

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

// Guardamos io en app para poder emitir desde controladores si hace falta
app.set('io', io);

socketHandler(io);

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
