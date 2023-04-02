import { ChatState } from "../context/chatProvider";
import { useState, useEffect } from "react";
import axios from "axios";
import { getSender } from "../config/chatLogics.js";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupChatModal from "./Modals/groupChatModal.jsx";
import { Button } from "@mui/material";

function MyChats(props) {
  const { chats, setChats, user, currChat, setCurrChat, isTyping } =
    ChatState();
  const [loggedUser, setLoggedUser] = useState();

  const fetchChat = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        "http://localhost:8383/api/chat",
        config
      );
      setChats(data);
    } catch (error) {
      const open = {
        vis: true,
        message: "Failed to load the Search Results",
      };
      props.isOpen(open);
    }
  };

  useEffect(
    () => {
      setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
      fetchChat();
    },
    // eslint-disable-next-line
    [props.fetchAgain]
  );

  //make use effect for dynamic change in latest message

  return (
    <div id="chat">
      <div id="chatData" >
        <p>
        My Chats
        </p>
        <GroupChatModal
          isOpen={(e) => {
            props.isOpen(e);
          }}
        >
          <Button variant="contained">
            New Group Chat
            <GroupAddIcon />
          </Button>
        </GroupChatModal>
      </div>
      {chats ? (
        <div id="chatList">
          {chats.map((chat) => (
            <div
              className="chatBox"
              onClick={() => {
                setCurrChat(chat);
              }}
              key={chat._id}
            >
              <img
                alt={getSender(loggedUser, chat.users).name}
                src={getSender(loggedUser, chat.users).image}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users).name
                    : chat.chatName}
                </p>
                <p>
                  {chat.latestMessage ? (
                    <span>
                      {chat.latestMessage.sender.name}
                      {": "}
                      {chat.latestMessage.content}
                    </span>
                  ) : (
                    <></>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default MyChats;
