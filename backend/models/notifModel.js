const mongoose = require("mongoose");

const notifSchema = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat"},
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notifSchema);
module.exports = Notification;
