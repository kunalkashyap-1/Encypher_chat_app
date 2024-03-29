import {
  Drawer,
  Button,
  Menu,
  MenuItem,
  Avatar,
  TextField,
  Box,
  Badge,
  CircularProgress,
} from "@mui/material";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { ChatState } from "../context/chatProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "./Modals/profile";
import UserListItem from "./userListItem";
import { getSender } from "../config/chatLogics.js";

import axios from "axios";
import io from "socket.io-client";

function SideDrawer(props) {
  const navigate = useNavigate();
  const { user, currChat, setCurrChat, chats, setChats, notif, setNotif } =
    ChatState();
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const open1 = Boolean(anchorEl1);
  const open2 = Boolean(anchorEl2);

  const ENDPOINT = "https://encypher-backend.onrender.com";
  const style = {
    // color: "#fff",
    background: "rgb(211,211,211,0.5)",
    borderRadius: 20,
  };

  const toggler = () => {
    setIsActive((preVal) => !preVal);
  };
  const logOutHandler = () => {
    localStorage.removeItem("userInfo");
    const socket = io(ENDPOINT);
    socket.emit("logOut", user);
    if (currChat) {
      socket.emit("userUpdate", getSender(user, currChat.users)._id);
    }
    navigate("/");
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) {
      const open = {
        vis: true,
        message: "Please Enter something in search",
      };
      props.isOpen(open);
      return;
    }

    try {
      setIsLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `https://encypher-backend.onrender.com/api/user?search=${search}`,
        config
      );
      setIsLoading(false);
      setSearchResult(data);
    } catch (error) {
      const open = {
        vis: true,
        message: "Failed to load the Search Results",
      };
      props.isOpen(open);
      setIsLoading(false);
    }
  };

  const accessChat = async (userId) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        "https://encypher-backend.onrender.com/api/chat",
        { userId },
        config
      );
      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }
      setCurrChat(data);
      toggler();
    } catch (error) {
      const open = {
        vis: true,
        message: error.message,
      };
      props.isOpen(open);
    }
  };

  return (
    <div className="header">
      <div style={{alignSelf:"center"}}>
        <Button onClick={toggler}
          sx={{
            color:"white"
          }}
        >
          <PersonSearchIcon />
          Search User
        </Button>
        <Drawer anchor="left" open={isActive} onClose={toggler}>
          <div id="drawer">
            <h1>Search Users</h1>
            <br />
            <form onSubmit={handleSearch} id="drawer_search">
              <TextField
                id="outlined-basic"
                label="Search"
                variant="filled"
                // InputLabelProps={{ style: { color: "#fff" } }}
                InputProps={{ style: style, disableUnderline: true }}
                size="small"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                // sx={{ mt: 2}}
              />
              {isLoading? <CircularProgress  style={{margin: " 0 1.25rem"}}/> : <Button
                variant="contained"
                color="success"
                size="medium"
                onClick={handleSearch}
              >
                Go
              </Button>}
            </form>
            <Box>
              {searchResult?.map((user) => {
                return (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => {
                      accessChat(user._id);
                    }}
                  />
                );
              })}
            </Box>
          </div>
        </Drawer>
      </div>
      <h1>Encypher</h1>
      <div>
        <Button
          id="basic-button1"
          aria-controls={open1 ? "basic-menu1" : undefined}
          aria-haspopup="true"
          aria-expanded={open1 ? "true" : undefined}
          onClick={handleClick1}
          sx={{
            color:"white"
          }}
        >
          <Badge badgeContent={notif.length} color="error">
            <NotificationsIcon />
          </Badge>
        </Button>
        <Menu
          id="basic-menu1"
          anchorEl={anchorEl1}
          open={open1}
          onClose={() => {
            setAnchorEl1(null);
          }}
          MenuListProps={{
            "aria-labelledby": "basic-button1",
          }}
        >
          {!notif.length ? (
            <MenuItem
              onClick={() => {
                setAnchorEl1(null);
              }}
            >
              No New Notifications
            </MenuItem>
          ) : (
            ""
          )}
          {notif?.map((n) => {
            return (
              <MenuItem
                onClick={() => {
                  setAnchorEl1(null);
                  setCurrChat(n.chat);
                  setNotif(notif.filter((el) => el !== n));
                }}
                key={n._id}
              >
                {n.chat.isGroupChat
                  ? `New Message in ${n.chat.chatName}`
                  : `New Message from ${getSender(user, n.chat.users).name}`}
              </MenuItem>
            );
          })}
        </Menu>
        <Button
          id="basic-button2"
          aria-controls={open2 ? "basic-menu2" : undefined}
          aria-haspopup="true"
          aria-expanded={open2 ? "true" : undefined}
          onClick={handleClick2}
        >
          <Avatar alt={user.name} src={user.image} />
        </Button>
        <Menu
          id="basic-menu2"
          anchorEl={anchorEl2}
          open={open2}
          onClose={handleClose2}
          MenuListProps={{
            "aria-labelledby": "basic-button2",
          }}
        >
          <MenuItem>
            <Profile user={user}>
              <Button onClick={handleClose2}>My Profile</Button>
            </Profile>
          </MenuItem>
          <MenuItem onClick={logOutHandler}>Log Out</MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default SideDrawer;
