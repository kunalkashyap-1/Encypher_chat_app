import { ChatState } from "../context/chatProvider";
import { useState,useEffect } from "react";
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

const styleText = {
  // color: "#fff",
  background: "rgb(211,211,211,0.5)",
};

const SingleChat = ({ fetchAgain, setFetchAgain,snack }) => {
  const { user, currChat, setCurrChat } = ChatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();

  const fetchMessages = async()=>{
    if(!currChat) return;
    try{
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);
      const {data} = await axios.get(`http://localhost:8383/api/message/${currChat._id}`,config);
      setMessages(data);
      setLoading(false);
    }catch(error){
      const open = {
        vis: true,
        message: "Failed to load the messages",
      };
      snack(open);
    }
  }

  useEffect(()=>{
    fetchMessages();
  },[currChat])

  const sendMessage = async (e)=>{
    if(newMessage){
      try{
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        const {data} = await axios.post(`http://localhost:8383/api/message`,{
          content:newMessage,
          chatId:currChat._id,
        },config);
        setNewMessage("");
        setMessages([...messages,data]);
      }catch(error){
        const open = {
          vis: true,
          message: "failed to send the message",
        };
        snack(open);
      };
    }
  };

  const typingHandler = (e)=>{
    setNewMessage(e.target.value);
  };

  return (
    <>
      {currChat ? (
        <>
          {!currChat.isGroupChat ? (
            <div id="chatBoxHeader">
              <div id="profileDetails">
                <Avatar
                  alt={getSender(user, currChat.users).name}
                  src={getSender(user, currChat.users).image}
                />
                <Typography>{getSender(user, currChat.users).name}</Typography>
              </div>
              <div>
                <Profile user={getSender(user, currChat.users)}></Profile>
              </div>
            </div>
          ) : (
            <div id="chatBoxHeader">
              <div id="profileDetails">
                <Avatar
                  alt={getGroupData(user, currChat).name}
                  src={getGroupData(user, currChat).image}
                />
                <Typography>{getGroupData(user, currChat).name}</Typography>
              </div>
              <div>
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
                <ScrollableChat messages={messages}/>
              </div>
            )}
          </div>
          <div id="inputSection" 
          onKeyDown={(e)=>{
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}>
            <TextField
              fullWidth
              placeholder="Type a message"
              variant="outlined"
              InputProps={{ style: styleText, disableUnderline: true }}
              onChange={typingHandler}
              value={newMessage}
            />
            <Button
              variant="contained"
              color="success"
                onClick={sendMessage}
            >
              Send
            </Button>
          </div>
        </>
      ) : (
        <div id="chatBoxInside">
          <h1>Click on a user to start chatting</h1>
        </div>
      )}
    </>
  );
};

export default SingleChat;
