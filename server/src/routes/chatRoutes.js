const chatRoutes = require("express").Router();
const chatController = require("../controllers/chatController");
const authorization = require("../middlewares/authorization");

chatRoutes.get(
  "/conversations",
  authorization,
  chatController.fetchConversations
);
chatRoutes.get(
  "/conversations/:conversationId",
  authorization,
  chatController.fetchConversationMessages
);
chatRoutes.post("/messages", chatController.sendMessage);
chatRoutes.post("/room", chatController.createRoom);
chatRoutes.post("/room/:roomId", chatController.sendRoomMessage);
chatRoutes.post("/room/add/:roomId", chatController.addChatRoomMembers);
chatRoutes.post("/room/remove/:roomId", chatController.removeChatRoomMembers);

module.exports = chatRoutes;
