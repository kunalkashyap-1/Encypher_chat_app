require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({
    extended: true
  }));

const connectDB = require("./configs/DB");
connectDB();

const userRoutes = require("./Routes/userRoutes");
const chatRoutes = require("./Routes/chatRoutes");
const messageRoutes = require("./Routes/messageRoutes");
const {notFound,errorHandler} = require("./middleware/errorMiddleware");

app.use(express.json());//to accept JSON data
app.use("/api/user",userRoutes);
app.use("/api/chat",chatRoutes);
app.use("/api/message",messageRoutes);

app.use(notFound);
app.use(errorHandler);

app.get("/",(req,res)=>{
    res.send("API is running");
});


app.listen(process.env.PORT,()=>{
    console.log("Server running on port");
})
