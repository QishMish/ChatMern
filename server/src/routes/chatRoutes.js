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
chatRoutes.post("/messages", authorization, chatController.sendMessage);
chatRoutes.post("/room", authorization, chatController.createRoom);
chatRoutes.post("/room/:roomId", authorization, chatController.sendRoomMessage);
chatRoutes.post(
  "/room/add/:roomId",
  authorization,
  chatController.addChatRoomMembers
);
chatRoutes.post(
  "/room/remove/:roomId",
  authorization,
  chatController.removeChatRoomMembers
);

module.exports = chatRoutes;
