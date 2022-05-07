const mongoose = require("mongoose");

const messagesSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    message: {
      type: String,
    },
    authorId: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Messages", messagesSchema);
