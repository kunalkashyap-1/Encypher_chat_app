require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors({
  origin: ["http://localhost:3000","https://encypher.vercel.app","*",null],
}));
app.use(
  express.urlencoded({
    extended: true,
  })
);

const passport = require("passport");
const session = require("express-session");
const MemoryStore = require('memorystore')(session);


app.use(session({
  cookie: { maxAge: 86400000 },
  secret:process.env.SECRETSTRING,
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
  resave:false,
  saveUninitialized:false,
  // cookies:{secure:true}
}));
app.use(passport.initialize());
app.use(passport.session());


const connectDB = require("./configs/DB");
connectDB();

const userRoutes = require("./Routes/userRoutes");
const chatRoutes = require("./Routes/chatRoutes");
const messageRoutes = require("./Routes/messageRoutes");
const notificationRoutes = require("./Routes/notificationRoutes");
const OAuthRoutes = require("./Routes/OAuthRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

app.use(express.json()); //to accept JSON data
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/notif", notificationRoutes);
app.use("/auth", OAuthRoutes);

app.get("/", (req, res) => {
  res.json({message:"API is running"});
});

app.use(notFound);
app.use(errorHandler);



const server = app.listen(process.env.PORT, () => {
  console.log("Server running on port");
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
});

const activeUsers = {};

io.on("connection", (socket) => {
  // console.log("connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    activeUsers[userData._id] = true;
    socket.emit("connected");
  });

  socket.on("userUpdate", (userId) => {
    socket.emit("userUpdate", userId in activeUsers);
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    // console.log("user joined room: " + room);
  });

  socket.on("typing", async (args) => {
    socket.in(args.room).emit("typing", args);
  });

  socket.on("stopTyping", (room) => {
    socket.in(room).emit("stopTyping");
  });

  socket.on("newMessage", (newMessage) => {
    let chat = newMessage.chat;

    if (!chat.users) return console.log("chat.users is not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessage.sender._id) return;
      socket.in(user._id).emit("messageRecieved", newMessage);
      socket.in(user._id).emit("notifRecieved", newMessage);
    });
  });

  socket.on("logOut", (user) => {
    // console.log("User Disconnected");
    delete activeUsers[user._id];
    // socket.emit("logOut",user._id);
    socket.leave(user._id);
  });
});
