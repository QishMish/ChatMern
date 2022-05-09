const chatRoutes = require("express").Router();
const chatController = require("../controllers/chatController");

chatRoutes.get("/conversations", chatController.fetchConversations);
chatRoutes.get(
  "/conversations/:conversationId",
  chatController.fetchConversationMessages
);
chatRoutes.post("/messages", chatController.sendMessage);
chatRoutes.post("/room", chatController.createRoom);
chatRoutes.post("/room/:roomId", chatController.sendRoomMessage);
chatRoutes.post("/room/add/:roomId", chatController.addChatRoomMembers);
chatRoutes.post("/room/remove/:roomId", chatController.removeChatRoomMembers);

module.exports = chatRoutes;
