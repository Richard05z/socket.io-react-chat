import express from "express";
import cors from "cors";
import http from "http";
import { Server as SocketServer } from "socket.io";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url)); // Es la ruta hasta el interior de esta carpeta
// console.log(__dirname);
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "http://localhost:3000",
  },
}); // Se le pasa como parámetro al servidor de WebSocket y un objeto de configuración (Este último es opcional)

app.use(cors());

io.on("connection", (socket) => {
  // connection - Cuando un usuario se conecta
  // Recibe como parámetro los datos de ese usuario conectado
  // console.log(socket.id);

  socket.on("message", (message) => {
    // Se mantiene atento al evento "message" que podría llegar desde el cliente

    // console.log(message);
    socket.broadcast.emit("message", {
      body: message,
      from: socket.id,
    }); // broadcast - Se le envía a todos los usuarios excepto al que envío el mensaje
  });
});

app.use(express.static(join(__dirname, "../../client/dist")));
console.log();

export default server;
