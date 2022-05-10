const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");
const redis = require("./src/config/redis");

const users = [];

const addUser = (userId, socketId) => {
  const exist = users.some((u) => (u.userId = userId));

  if (!exist) users.push({ userId, socketId });
};
const removeUser = (socketId) => {
  const users = users.filter((u) => u.socketId !== socketId);
};

const socket = (server) => {
  const io = new Server(server, { cors: { origin: "http://localhost:3000" } });

  io.on("connection", (socket) => {
    console.log(`user joined with socketId ${socket.id}`);

    socket.on("user-joined", (userId) => {
      addUser(userId, socket.id);
      console.log(users);
    });

    socket.on("new-message", (msg) => {
      console.log(msg);
    });

    socket.on("disconect", () => {
      console.log("user disconected");
      removeUser(socketId.id);
    });
  });

  instrument(io, {
    auth: false,
  });
  return io;
};

module.exports = socket;
