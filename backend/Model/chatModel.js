const mongoose = require("mongoose");

//define chat schema in mongoose
const chatSchema = mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    //refrence to the user schema
    users: [
      {
        type: mongoose.Schema.Types.objectId,
        ref: "User",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.objectId,
      ref: "Message",
    },
    groupAdmin: {
      type: mongoose.Schema.Type.objectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
