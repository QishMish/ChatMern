const chatService = require("../services/chatService");
const catchAsync = require("../utils/catchAsync");

const fetchConversations = catchAsync(async (req, res) => {
  const { id: userId } = req.user;
  const { status, response } = await chatService.fetchConversations(userId);
  res.status(status).json(response);
});
const fetchConversationMessages = catchAsync(async (req, res) => {
  const { conversationId } = req.params;
  const { status, response } = await chatService.fetchConversationMessages(
    conversationId
  );
  res.status(status).json(response);
});
const createConversation = catchAsync(async (req, res) => {
  const { authorId, addresserId } = req.body;
  const { status, response } = await chatService.createConversation(
    Number(authorId),
    Number(addresserId)
  );
  res.status(status).json(response);
});
const deleteConversation = catchAsync(async (req, res) => {
  const { conversationId } = req.params;
  const { status, response } = await chatService.deleteConversation(
    conversationId
  );
  res.status(status).json(response);
});
const sendMessage = catchAsync(async (req, res) => {
  const { authorId, addresserId, content } = req.body;
  const { status, response } = await chatService.sendMessage(
    Number(authorId),
    Number(addresserId),
    content
  );
  res.status(status).json(response);
});
const createRoom = catchAsync(async (req, res) => {
  const { creatorId } = req.body;
  const { status, response } = await chatService.createRoom(Number(creatorId));
  res.status(status).json(response);
});
const sendRoomMessage = catchAsync(async (req, res) => {
  const { roomId } = req.params;
  const { authorId, content } = req.body;
  const { status, response } = await chatService.sendRoomMessage(
    roomId,
    authorId,
    content
  );
  res.status(status).json(response);
});
const addChatRoomMembers = catchAsync(async (req, res) => {
  const { roomId } = req.params;
  const { members } = req.body;
  const { status, response } = await chatService.addChatRoomMembers(
    roomId,
    members
  );
  res.status(status).json(response);
});
const removeChatRoomMembers = catchAsync(async (req, res) => {
  const { roomId } = req.params;
  const { members } = req.body;
  const { status, response } = await chatService.removeChatRoomMembers(
    roomId,
    members
  );
  res.status(status).json(response);
});
const fetchRooms = catchAsync(async (req, res) => {
  const { status, response } = await chatService.fetchRooms();
  res.status(status).json(response);
});

module.exports = {
  fetchConversationMessages,
  fetchConversations,
  createConversation,
  sendMessage,
  createRoom,
  sendRoomMessage,
  addChatRoomMembers,
  removeChatRoomMembers,
  fetchRooms,
  deleteConversation,
};
