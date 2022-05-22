const Conversation = require("./../mongodb/Conversation");
const Message = require("./../mongodb/Message");
const { User } = require("../models");
const { Op } = require("sequelize");

const fetchConversations = async (userId) => {
  const conversations = await Conversation.find({
    participants: {
      $in: [userId],
    },
  });

  let users = await Promise.all(
    conversations.map(async (convo) => {
      const users = await User.findAll({
        attributes: ["id", "username", "location", "imageURL"],
        where: {
          id: {
            [Op.in]: convo.participants,
          },
        },
      });
      return users;
    })
  );
  const conversationsWithUsers = conversations.map((item, key) => {
    return { ...item._doc, participantsFull: users[key] };
  });

  const conversationsWithLastMessages = await Promise.all(
    conversationsWithUsers.map(async (c) => {
      const lastMessage = await Message.findOne({
        conversationId: c._id,
      })
        .limit(1)
        .sort({ $natural: -1 });

      const lastMessageInfo = {
        message: lastMessage?.message,
        time: lastMessage?.createdAt,
      };
      return { ...c, lastMessageInfo };
    })
  );

  return {
    status: 200,
    response: conversationsWithLastMessages,
  };
};
const fetchConversationMessages = async (conversationId) => {
  const { participants } = await Conversation.findOne({ _id: conversationId });

  const users = await Promise.all(
    participants.map(async (particpant) => {
      const { username, id } = await User.findOne({
        attributes: ["username", "id"],
        where: {
          id: particpant,
        },
      });
      return { id, username };
    })
  );
  const messages = await Message.find({
    conversationId: conversationId,
  });

  const messagesWithAuthor = messages.map((msg) => {
    const author = users.find((a) => {
      return a.id === msg.authorId;
    });
    return { ...msg._doc, username: author.username };
  });

  return {
    status: 200,
    response: messagesWithAuthor,
  };
};
const createConversation = async (
  authorId,
  addresserId,
  chatRoomType = "ONE_TO_ONE"
) => {
  const conversationExist = await Conversation.findOne({
    participants: { $all: [authorId, addresserId] },
    chatRoomType: chatRoomType,
  });

  if (conversationExist) {
    return {
      status: 200,
      response: conversationExist,
    };
  }

  const { username } = await User.findOne({
    where: {
      id: addresserId,
    },
  });
  const conversation = await new Conversation({
    chatRoomName: username,
    chatRoomType: chatRoomType,
    chatRoomCreator: authorId,
    participants: [authorId, addresserId],
  });

  await conversation.save();

  console.log(conversation);
  return {
    status: 200,
    // response: {
    //   status: "success",
    //   info: "new chat room created and sent message to it",
    // },
    response: conversation,
  };
};
const deleteConversation = async (conversationId) => {
  console.log(conversationId);
  await Conversation.deleteOne({
    _id: conversationId,
  });

  return {
    status: 200,
    response: `deleted conversation with id ${conversationId}`,
  };
};
const sendMessage = async (
  authorId,
  addresserId,
  content,
  chatRoomType = "ONE_TO_ONE",
  conversationId
) => {
  const conversations = await Conversation.findOne({
    participants: { $all: [authorId, addresserId] },
    chatRoomType: chatRoomType,
  });

  if (conversations) {
    const message = await new Message({
      conversationId: conversations._id,
      message: content,
      authorId: authorId,
    });
    await message.save();
    console.log(message);

    return {
      status: 200,
      // response: {
      //   status: "success",
      //   info: "sent to existing chat room",
      // },
      response: message,
    };
  }

  console.log(addresserId);
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

  await conversation.save();

  const message = await new Message({
    conversationId: conversation._id,
    message: content,
    authorId: authorId,
  });
  await message.save();
  return {
    status: 200,
    // response: {
    //   status: "success",
    //   info: "new chat room created and sent message to it",
    // },
    response: message,
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
const fetchRooms = async () => {
  const rooms = ["general", "web-development", "sport", "music"];

  return {
    status: 200,
    response: { rooms },
  };
};

module.exports = {
  fetchConversationMessages,
  fetchConversations,
  sendMessage,
  createConversation,
  createRoom,
  sendRoomMessage,
  addChatRoomMembers,
  fetchRooms,
  removeChatRoomMembers,
  deleteConversation,
};
