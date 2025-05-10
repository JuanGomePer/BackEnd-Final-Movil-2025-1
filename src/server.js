const http = require("http");
const app = require("./app");
const { Server } = require("socket.io");
const gameSocket = require("./sockets/gameSocket");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

gameSocket(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
