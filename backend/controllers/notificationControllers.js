const asyncHandler = require("express-async-handler");
const Notification = require("../models/notifModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

//@description     Create a new notification
//@route           POST /api/Message/notif
//@access          Protected

const allNotif = asyncHandler(async (req, res) => {
  try {
    //come back to the find val
    const user = req.user;
    const notifs = await Notification.find({
      "chat.users": { $in: [user._id] },
    }).populate("sender", "name image ");
    res.json(notifs);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Create a new notification
//@route           POST /api/Message/notif
//@access          Protected

const sendNotif = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }
  const chat = await Chat.findById(chatId);

  let newNotification = {
    sender: req.user._id,
    content: content,
    chat: chat,
  };

  try {
    let notif = await Notification.create(newNotification);

    notif = await notif.populate("sender", "name image");
    notif = await User.populate(notif, {
      path: "chat.users",
      select: "name image ",
    });

//   console.log(notif);
    res.json(notif);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const deleteNotif = asyncHandler(async (req, res) => {
  try {
    const notification = await Notification.findOneAndRemove({_id: req.params.notifId});
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = { allNotif, sendNotif, deleteNotif };
