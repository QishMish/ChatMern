const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");
const redis = require("./src/config/redis");
const chatService = require("./src/services/chatService");

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
      io.emit("rooms", ["general", "web-development", "sport", "music"]);
      addUser(socket.id.toString(), userId.toString());
      io.emit("active-users", users);
    });
    socket.on("new-message", async (messageData) => {
      const {
        authorId,
        conversationId,
        addresserId,
        message,
        username,
        chatRoomType,
      } = messageData;
      const newMessage = await chatService.sendMessage(
        authorId,
        addresserId,
        message,
        chatRoomType
      );
      console.log(newMessage.response._doc);
      io.to(conversationId).emit("get-new-message", {
        ...newMessage.response._doc,
        username,
      });
    });
    socket.on(
      "join-conversation",
      async (prevConversationId, newConversationId) => {
        console.log("leaving old room with id:", prevConversationId);
        socket.leave(prevConversationId);
        console.log("joining new room with id:", newConversationId);
        socket.join(newConversationId);
      }
    );
    // socket.on(
    //   "join-conversation",
    //   async (prevConversationId, newConversationId) => {
    //     console.log("leaving old room with id:", prevConversationId);
    //     socket.leave(prevConversationId);
    //     await setTimeout(() => {
    //       console.log("waiting");
    //     }, 3000);
    //     console.log("joining new room with id:", newConversationId);
    //     socket.join(newConversationId);
    //     socket.on(
    //       "new-message",
    //       async ({
    //         authorId,
    //         conversationId,
    //         addresserId,
    //         message,
    //         username,
    //       }) => {
    //         // const user = getUser(addresserId);'
    //         const newMessage = await chatService.sendMessage(
    //           authorId,
    //           addresserId,
    //           message
    //         );
    //         console.log(newConversationId, conversationId, message);
    //         console.log("new", io.sockets.clients(newConversationId));
    //         io.to(newConversationId).emit(
    //           "get-new-message",
    //           newMessage.response
    //         );
    //       }
    //     );
    //   }
    // );
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
