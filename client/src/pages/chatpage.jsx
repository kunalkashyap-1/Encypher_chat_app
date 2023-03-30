import { ChatState } from "../context/chatProvider";
import { useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import SideDrawer from "../components/sideDrawer.jsx";
import MyChats from "../components/myChats.jsx";
import ChatBox from "../components/chatBox.jsx";

function ChatPage(props) {
  const [fetchAgain, setFetchAgain] = useState(false);
  const [open, setOpen] = useState({
    vis: false,
    message: null,
  });
  const handleClose = () => {
    setOpen(false);
  };

  const { user } = ChatState();
  return (
    <div>
      {user && (
        <SideDrawer
          isOpen={(e) => {
            setOpen(e);
          }}
        />
      )}
      <div id="chats">
        {user && (
          <MyChats
            fetchAgain={fetchAgain}
            isOpen={(e) => {
              setOpen(e);
            }}
          />
        )}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </div>
      <Snackbar open={open.vis} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          variant="filled"
          severity="error"
          sx={{ width: "100%" }}
        >
          {open.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ChatPage;
