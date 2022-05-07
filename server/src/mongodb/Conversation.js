const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    chatRoomName: {
      type: String,
    },
    chatRoomType: {
      type: String,
      enum: ["ONE_TO_ONE", "MANY_TO_MANY"],
      default: "ONE_TO_ONE",
    },
    chatRoomCreator: {
      type: Number,
    },
    participants: {
      type: [Number],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversations", ConversationSchema);
