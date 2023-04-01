import { Modal, Button, Box, Typography, TextField,Snackbar, Alert } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react";
import { ChatState } from "../../context/chatProvider";
import { getGroupData } from "../../config/chatLogics.js";
import UserBadge from "../userBadge";
import UserListItem from "../userListItem";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderBox: "hidden",
  p: 4,
  borderRadius: 5,
};

const styleText = {
  // color: "#fff",
  background: "rgb(211,211,211,0.5)",
  "border-radius": 20,
};

const UpdateGroupModal = ({ fetchAgain, setFetchAgain, fetchMessages }) => {
  const [open, setOpen] = useState(false);
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState();
  const [openSnack, setOpenSnack] = useState({
    vis: false,
    message: null,
  });
  const handleCloseSnack = () => {
    setOpenSnack(false);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { user, currChat, setCurrChat } = ChatState();

  const handleRename = async () => {
    if (!groupChatName) {
      const open = {
        vis: true,
        message: "Please fill the required field ",
      };
      setOpenSnack(open);
      return;
    }

    try{
        const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
          const { data } = await axios.put(
            `http://localhost:8383/api/chat/rename`,
            {
              chatId: currChat._id,
              chatName: groupChatName,
            },
            config
          );
    
          setCurrChat(data);
          setFetchAgain(!fetchAgain);
          handleClose();
    }catch(error){
        const open = {
            vis: true,
            message: error.message,
          };
          setOpenSnack(open);
    }
    setGroupChatName("");
  };
  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:8383/api/user?search=${search}`,
        config
      );
      setSearchResult(data);
    } catch (error) {
      const open = {
        vis: true,
        message: "Failed to load the Search Results",
      };
      setOpenSnack(open);
    }
  };

  const handleRemove = async (user1) => {
    if(currChat.groupAdmin._id !== user._id && user1._id !== user._id){
      const open = {
        vis: true,
        message: "Only admin can remove someone",
      };
      setOpenSnack(open);
      return;
    }

    try{
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:8383/api/chat/groupremove`,
        {
          chatId: currChat._id,
          userId: user1._id,
        },
        config
      );

      user1._id === user._id ? setCurrChat() : setCurrChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
    }catch(error){
      const open = {
        vis: true,
        message: error.response.data.message,
      };
      setOpenSnack(open);
    };
  };


  const handleAddUser = async (user1) => {
    if(currChat.users.find((u)=>u._id === user1._id)){
      const open = {
        vis: true,
        message: "User Already in group",
      };
      setOpenSnack(open);
      return;
    }

    if(currChat.groupAdmin._id !== user._id){
      const open = {
        vis: true,
        message: "Only admins can add someone!",
      };
      setOpenSnack(open);
      return;
    }

    try{
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:8383/api/chat/groupadd`,
        {
          chatId: currChat._id,
          userId: user1._id,
        },
        config
      );

      setCurrChat(data);
      setFetchAgain(!fetchAgain);
    }catch(error){
      const open = {
        vis: true,
        message: error.response.data.message,
      };
      setOpenSnack(open);
    }
    setGroupChatName("");
  };

  return (
    <div>
      <MoreVertIcon onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {getGroupData(user, currChat).name}
          </Typography>
          <div id="badge">
            {currChat.users.map((u) => {
              return (
                u._id !== user._id?<UserBadge
                  key={u._id}
                  user={u}
                  handleFunction={() => {
                    handleRemove(u);
                  }}
                />:<></>
              );
            })}
          </div>
          <form
            style={{
              display: "flex",
              marginBottom: "1rem",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <TextField
              fullWidth
              label="Rename Chat "
              variant="filled"
              InputProps={{ style: styleText, disableUnderline: true }}
              size="small"
              value={groupChatName}
              onChange={(e) => {
                setGroupChatName(e.target.value);
              }}
            />
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={handleRename}
            >
              Update
            </Button>
          </form>
          <form>
            <TextField
              fullWidth
              label="Add user to group"
              variant="filled"
              InputProps={{ style: styleText, disableUnderline: true }}
              //   value={search}
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
            />
          </form>
          {searchResult?.slice(0, 4).map((user) => (
            <UserListItem
              key={user._id}
              user={user}
              handleFunction={() => {
                handleAddUser(user);
              }}
            />
          ))}
          <div
            style={{
              margin: "1rem",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => {
                handleRemove(user);
              }}
            >
              Leave Group
            </Button>
          </div>
        </Box>
      </Modal>
      
      <Snackbar open={openSnack.vis} autoHideDuration={4000} onClose={handleCloseSnack}>
        <Alert
          onClose={handleCloseSnack}
          variant="filled"
          severity={openSnack.severity ? openSnack.severity : "error"}
          sx={{ width: "100%" }}
        >
          {openSnack.message}
        </Alert>
      </Snackbar>
    </div>
    
  );
};

export default UpdateGroupModal;
