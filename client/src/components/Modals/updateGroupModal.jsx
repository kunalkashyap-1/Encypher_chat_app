import { Modal, Button, Box, Typography, TextField } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import { ChatState } from "../../context/chatProvider";
import { getGroupData } from "../../config/chatLogics.js";
import UserBadge from "../userBadge";

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

const UpdateGroupModal = ({ fetchAgain, setFetchAgain }) => {
  const [open, setOpen] = useState(false);
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState();
  const [searchReasult, setSearchResult] = useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { user, currChat, setCurrChat } = ChatState();

  const handleDelete = (delUser) => {
    setCurrChat(currChat.users.filter((sel) => sel._id !== delUser._id));
  };

  const handleRename = () => {};
  const handleSearch = () => {};
  const handleRemove = () => {};

  return (
    <div>
      <PersonIcon onClick={handleOpen} />
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
                <UserBadge
                  key={u._id}
                  user={u}
                  handleFunction={() => {
                    handleDelete(u);
                  }}
                />
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
              label="Chat Name"
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
          <div style={{
            margin:"1rem",
            display:"flex",
            justifyContent:"flex-end"
        }}>
          <Button
              variant="contained"
              color="warning"
              size="small"
              onClick={()=>{handleRemove(user)}}
            >
              Leave Group
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateGroupModal;
