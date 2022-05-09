const Conversation = require("./../mongodb/Conversation");
const Message = require("./../mongodb/Message");
const { User } = require("../models");

const fetchConversations = async () => {
  const conversations = await Conversation.find({});
  return {
    status: 200,
    response: conversations,
  };
};
const fetchConversationMessages = async (conversationId) => {
  const Messages = await Message.find({
    _id: conversationId,
  });
  return {
    status: 200,
    response: Messages,
  };
};
const sendMessage = async (authorId, addresserId, content) => {
  const conversations = await Conversation.findOne({
    participants: { $all: [authorId, addresserId] },
    chatRoomType: "ONE_TO_ONE",
  });

  if (conversations) {
    const message = await new Message({
      conversationId: conversations._id,
      message: content,
      authorId: authorId,
    });
    message.save();
    return {
      status: 200,
      response: {
        status: "success",
        info: "sent to existing chat room",
      },
    };
  }

  const { username } = await User.findOne({
    where: {
      id: addresserId,
    },
  });
  const conversation = await new Conversation({
    chatRoomName: username,
    chatRoomType: "ONE_TO_ONE",
    chatRoomCreator: authorId,
    participants: [authorId, addresserId],
  });

  conversation.save();

  const message = await new Message({
    conversationId: conversation._id,
    message: content,
    authorId: authorId,
  });
  message.save();

  return {
    status: 200,
    response: {
      status: "success",
      info: "new chat room created and sent message to it",
    },
  };
};
const createRoom = async (creatorId) => {
  const { username } = await User.findOne({
    where: {
      id: creatorId,
    },
  });
  const roomName = `Room:${username}`;

  const conversation = await new Conversation({
    chatRoomName: roomName,
    chatRoomType: "MANY_TO_MANY",
    chatRoomCreator: creatorId,
    participants: [],
  });
  conversation.save();
  return {
    status: 200,
    response: {
      status: "success",
      info: "New chatRoom created",
    },
  };
};
const sendRoomMessage = async (roomId, authorId, content) => {
  const message = await new Message({
    conversationId: roomId,
    message: content,
    authorId: authorId,
  });
  message.save();
  return {
    status: 200,
    response: {
      status: "success",
      info: "New chatRoom message sent",
    },
  };
};
const addChatRoomMembers = async (roomId, members) => {
  const addedMembers = await Promise.all(
    members.map(async (member) => {
      const alreadyExist = await Conversation.findOne({
        _id: roomId,
        participants: member,
      });
      if (alreadyExist) {
        return;
      } else {
        return member;
      }
    })
  );
  const newMembers = addedMembers.filter((element) => element !== undefined);

  await Conversation.updateOne(
    { _id: roomId },
    { $push: { participants: { $each: newMembers } } }
  );

  return {
    status: 200,
    response: {
      status: "success",
      info: "Members added to chatroom",
    },
  };
};

const removeChatRoomMembers = async (roomId, members) => {
  await Conversation.updateOne(
    { _id: roomId },
    { $pull: { participants: { $in: members } } }
  );
  return {
    status: 200,
    response: {
      status: "success",
      info: "Members removed from chatroom",
    },
  };
};

module.exports = {
  fetchConversationMessages,
  fetchConversations,
  sendMessage,
  createRoom,
  sendRoomMessage,
  addChatRoomMembers,
  removeChatRoomMembers,
};
