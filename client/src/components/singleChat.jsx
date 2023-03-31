import { ChatState } from "../context/chatProvider";
import { Button, Avatar, TextField, Typography } from "@mui/material";
import Profile from "./Modals/profile";
import UpdateGroupModal from "./Modals/updateGroupModal";
import { getSender, getGroupData } from "../config/chatLogics.js";

const styleText = {
  // color: "#fff",
  background: "rgb(211,211,211,0.5)",
};

const SingleChat = ({ fetchAgain, setFetchAgain }, props) => {
  const { user, currChat, setCurrChat } = ChatState();

  return (
    <>
      {currChat ? (
        <div id="activeChatBox">
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
                  isOpen={(e) => {
                    props.isOpen(e);
                  }}
                />
              </div>
            </div>
          )}
          <div id="messageSection">
            <div id="inputSection">
              <TextField
                fullWidth
                label="Type a message"
                variant="filled"
                InputProps={{ style: styleText, disableUnderline: true }}
              />
              <Button
                variant="contained"
                color="success"
                //   onClick={handleSubmit}
              >
                Send
              </Button>
            </div>
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
