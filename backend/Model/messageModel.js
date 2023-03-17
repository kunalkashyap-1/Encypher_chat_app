const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Type.objectId, ref: "User" },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.objectId, ref: "Chat" },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.Model("Message", messageSchema);

module.exports = Message;
