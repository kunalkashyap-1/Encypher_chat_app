import { Modal, Button, Box, Typography, TextField } from "@mui/material";
import { useState } from "react";
import { ChatState } from "../../context/chatProvider";
import UserListItem from "../userListItem";
import UserBadge from "../userBadge";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  "border-radius": "15px",
  p: 4,
};

const styleText = {
  // color: "#fff",
  background: "rgb(211,211,211,0.5)",
  "border-radius": 20,
  "margin-bottom": "1rem",
};

const GroupChatModal = (props) => {
  const [open, setOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [groupChatName, setGroupChatName] = useState();
  const { user, chats, setChats } = ChatState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      props.isOpen(open);
    }
  };

  const handleSubmit = async (e) => {
    if (!groupChatName || !selectedUsers) {
      const open = {
        vis: true,
        message: "Please fill all the feilds",
      };
      props.isOpen(open);
      return;
    }

    if (selectedUsers.length < 2) {
      const open = {
        vis: true,
        message: "Number of members are less than three",
      };
      props.isOpen(open);
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `http://localhost:8383/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      const open = {
        vis: true,
        message: "New Group Chat created",
        severity: "success",
      };
      props.isOpen(open);
      setSelectedUsers([]);
      setSearchResult([]);
      setGroupChatName();
      setSearch();
      handleClose();
    } catch (error) {
      const open = {
        vis: true,
        message: "Failed to create Chat!",
      };
      props.isOpen(open);
    }
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      const open = {
        vis: true,
        message: "User already added",
      };
      props.isOpen(open);
      return;
    }

    setSelectedUsers([...selectedUsers,userToAdd]);
  };

  return (
    <div>
      <Button onClick={handleOpen}>{props.children}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            mb="20px"
          >
            Create Group Chat
          </Typography>
          <form>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Chat Name"
              variant="filled"
              // InputLabelProps={{ style: { color: "#fff" } }}
              InputProps={{ style: styleText, disableUnderline: true }}
              value={groupChatName}
              onChange={(e) => {
                setGroupChatName(e.target.value);
              }}
              // sx={{ mt: 2}}
            />
          </form>
          <form>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Search"
              variant="filled"
              // InputLabelProps={{ style: { color: "#fff" } }}
              InputProps={{ style: styleText, disableUnderline: true }}
              //   value={search}
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
              // sx={{ mt: 2}}
            />
          </form>
          <div id="badge">
          {selectedUsers.map((u)=>{
            return (<UserBadge
            key={u._id}
            user={u}
            handleFunction={()=>{handleDelete(u)}}/>)
          })}
          </div>
          {searchResult?.slice(0, 4).map((user) => (
            <UserListItem
              key={user._id}
              user={user}
              handleFunction={() => {
                handleGroup(user);
              }}
            />
          ))}
          <br />
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Create Chat
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default GroupChatModal;
