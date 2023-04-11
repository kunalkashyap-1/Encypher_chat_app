import {
  Drawer,
  Button,
  Menu,
  MenuItem,
  Avatar,
  TextField,
  Box,
  Badge,
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
  const { user, setCurrChat, chats, setChats, notif, setNotif } = ChatState();
  const [isActive, setIsActive] = useState(false);
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [search, setSearch] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const open1 = Boolean(anchorEl1);
  const open2 = Boolean(anchorEl2);

  const ENDPOINT = "http://localhost:8383";
  const style = {
    // color: "#fff",
    background: "rgb(211,211,211,0.5)",
    "border-radius": 20,
  };

  const toggler = () => {
    setIsActive((preVal) => !preVal);
  };
  const logOutHandler = () => {
    localStorage.removeItem("userInfo");
    const socket = io(ENDPOINT);
    socket.emit("logOut",user);

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

  const handleSearch = async () => {
    if (!search) {
      const open = {
        vis: true,
        message: "Please Enter something in search",
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

  const accessChat = async (userId) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        "http://localhost:8383/api/chat",
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
      <div>
        <Button onClick={toggler}>
          <PersonSearchIcon />
          Search User
        </Button>
        <Drawer anchor="left" open={isActive} onClose={toggler}>
          <div id="drawer">
            <h1>Search Users</h1>
            <br />
            <div id="drawer_search">
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
              <Button
                variant="contained"
                color="success"
                size="small"
                onClick={handleSearch}
              >
                Go
              </Button>
            </div>
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
            <MenuItem >
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
