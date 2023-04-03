import { ChatState } from "../context/chatProvider";
import { useState, useEffect } from "react";
import {
  Button,
  Avatar,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import Profile from "./Modals/profile";
import UpdateGroupModal from "./Modals/updateGroupModal";
import ScrollableChat from "./scrollableChat";
import { getSender, getGroupData } from "../config/chatLogics.js";
import axios from "axios";
import io from "socket.io-client";
import { Player } from "@lottiefiles/react-lottie-player";
import typingAnimation from "../animations/3759-typing.json";

const styleText = {
  // color: "#fff",
  background: "rgb(211,211,211,0.5)",
};

const ENDPOINT = "http://localhost:8383";
let socket, currChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain, snack }) => {
  const {
    user,
    currChat,
    typing,
    setTyping,
    isTyping,
    setIsTyping,
    notif,
    setNotif,
    typeData, 
    setTypeData
  } = ChatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const [socketConnected, setsocketConnected] = useState(false);

  const fetchMessages = async () => {
    if (!currChat) return;
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8383/api/message/${currChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", currChat._id);
    } catch (error) {
      const open = {
        vis: true,
        message: "Failed to load the messages",
      };
      snack(open);
    }
  };

  const sendMessage = async (e) => {
    if (newMessage) {
      socket.emit("stop typing", currChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await axios.post(
          `http://localhost:8383/api/message`,
          {
            content: newMessage,
            chatId: currChat._id,
          },
          config
        );
        setNewMessage("");

        socket.emit("newMessage", data);
        setMessages([...messages, data]);
      } catch (error) {
        const open = {
          vis: true,
          message: "failed to send the message",
        };
        snack(open);
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => {
      setsocketConnected(true);
    });
    socket.on("typing", (TypeData) => {
      setIsTyping(true);
      setTypeData(TypeData);
    });
    socket.on("stopTyping", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchMessages();

    currChatCompare = currChat;
    // eslint-disable-next-line
  }, [currChat]);

  useEffect(() => {
    socket.on("messageRecieved", (newMessage) => {
      if (!currChatCompare || currChatCompare._id !== newMessage.chat._id) {
        if (!notif.includes(newMessage)) {
          setNotif([newMessage, ...notif]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessage]);
        setFetchAgain(!fetchAgain);
      }
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", { room: currChat._id, typist: user.name });
    }

    let lastTypeTime = new Date().getTime();
    let timerLength = 3000;

    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypeTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stopTyping", currChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {currChat ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {!currChat.isGroupChat ? (
            <div id="chatBoxHeader">
              <div id="profileDetails">
                <Avatar
                  alt={getSender(user, currChat.users).name}
                  src={getSender(user, currChat.users).image}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Profile user={getSender(user, currChat.users)}>
                    <Typography>
                      {getSender(user, currChat.users).name}
                    </Typography>
                  </Profile>
                  <p
                    style={
                      isTyping && typeData.room === currChat._id
                        ? {
                            width: "35px",
                            height: "20px",
                          }
                        : { width: "auto" }
                    }
                  >
                    {isTyping && typeData.room === currChat._id ? (
                      <>
                        <Player autoplay loop src={typingAnimation} />
                      </>
                    ) : (
                      "Click here for details"
                    )}
                  </p>
                </div>
              </div>
              <div></div>
            </div>
          ) : (
            <div id="chatBoxHeader">
              <div id="profileDetails">
                <Avatar
                  alt={getGroupData(user, currChat).name}
                  src={getGroupData(user, currChat).image}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {/* <Profile user={getSender(user, currChat.users)}> */}
                  <Typography>{getGroupData(user, currChat).name}</Typography>
                  {/* </Profile> */}
                  <div
                    style={{
                      display: "flex",
                      color:
                        isTyping && typeData.room === currChat._id
                          ? "Green"
                          : "",
                    }}
                  >
                    {isTyping && typeData.room === currChat._id ? (
                      <>
                        <span>{typeData.typist }</span>
                        <Player
                          autoplay
                          loop
                          style={{
                            width: "35px",
                            height: "20px",
                          }}
                          src={typingAnimation}
                        />
                      </>
                    ) : (
                      "Click here for details"
                    )}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <UpdateGroupModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </div>
            </div>
          )}
          <div id="messageSection">
            {loading ? (
              <CircularProgress
                style={{
                  position: "absolute",
                  top: "40%",
                  left: "60%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}
          </div>

          <div
            id="inputSection"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          >
            <TextField
              fullWidth
              placeholder="Type a message"
              variant="outlined"
              InputProps={{ style: styleText, disableUnderline: true }}
              onChange={typingHandler}
              value={newMessage}
            />
            <Button variant="contained" color="success" onClick={sendMessage}>
              Send
            </Button>
          </div>
        </div>
      ) : (
        <div id="chatBoxInside">
          <h1>Click on a user to start chatting</h1>
        </div>
      )}
    </>
  );
};

export default SingleChat;
