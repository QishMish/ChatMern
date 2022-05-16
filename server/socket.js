const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");
const redis = require("./src/config/redis");

let users = [];

const addUser = (socketId, userId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });

  console.log(socketId);
  // redis.set(socketId, userId);
};

const removeUser = (socketId) => {
  users = users.filter((u) => u.socketId !== socketId);
  // redis.del(socketId);
};
const getUser = (userId) => {
  return users.find((user) => Number(user.userId) === Number(userId));
};

const socket = (server) => {
  const io = new Server(server, { cors: { origin: "http://localhost:3000" } });

  io.on("connection", (socket) => {
    console.log(`user joined with socketId ${socket.id}`, users);

    socket.on("user-joined", (userId) => {
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!", userId);
      addUser(socket.id.toString(), userId.toString());
      io.emit("active-users", users);
    });

    socket.on(
      "new-message",
      ({
        authorId,
        conversationId,
        createdAt,
        addresserId,
        message,
        username,
      }) => {
        const user = getUser(addresserId);
        io.to(user?.socketId).emit("get-new-message", {
          authorId,
          conversationId,
          createdAt,
          addresserId,
          message,
          username,
        });
      }
    );

    socket.on("disconnect", () => {
      console.log("user disconected");
      removeUser(socket.id.toString());
      io.emit("active-users", users);
    });
  });

  instrument(io, {
    auth: false,
  });
  return io;
};

module.exports = socket;
