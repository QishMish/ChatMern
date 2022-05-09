const { Server } = require("socket.io");

const socket = (server) => {
  const io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log("user");
    socket.on("message", (msg) => {
      console.log(msg);
    });
    socket.on("disconect", () => {
      console.log("user disconected");
    });
  });

  return io;
};

module.exports = socket;
