import { Drawer, Button, Menu, MenuItem, Avatar } from "@mui/material";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { ChatState } from "../context/chatProvider";
import { useState } from "react";

function SideDrawer() {
    const statesData = ChatState();

  const [isActive, setIsActive] = useState(false);
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const open1 = Boolean(anchorEl1);
  const open2 = Boolean(anchorEl2);

  const toggler = () => {
    setIsActive((preVal) => !preVal);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
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

  
  return (
    <div className="header">
      <div>
        <Button onClick={toggler}>
          <PersonSearchIcon />
          Search User
        </Button>
        <Drawer anchor="left" open={isActive} onClose={toggler}>
          <ol>
            <li>kahani likh ke check</li>
            <li>b</li>
            <li>c</li>
          </ol>
        </Drawer>
      </div>
      <h1>Encypher</h1>
      <div>
      <Button
        id="basic-button1"
        aria-controls={open1 ? 'basic-menu1' : undefined}
        aria-haspopup="true"
        aria-expanded={open1 ? 'true' : undefined}
        onClick={handleClick1}
      >
        <NotificationsIcon/>
      </Button>
      <Menu
        id="basic-menu1"
        anchorEl={anchorEl1}
        open={open1}
        onClose={handleClose1}
        MenuListProps={{
          'aria-labelledby': 'basic-button1',
        }}
      >
        <MenuItem onClick={handleClose1}>Profile</MenuItem>
        <MenuItem onClick={handleClose1}>My account</MenuItem>
        <MenuItem onClick={handleClose1}>Logout</MenuItem>
      </Menu>
      <Button
        id="basic-button2"
        aria-controls={open2 ? 'basic-menu2' : undefined}
        aria-haspopup="true"
        aria-expanded={open2 ? 'true' : undefined}
        onClick={handleClick2}
      >
        <Avatar alt={statesData.user.data.name} src={statesData.user.data.image} />
      </Button>
      <Menu
        id="basic-menu2"
        anchorEl={anchorEl2}
        open={open2}
        onClose={handleClose2}
        MenuListProps={{
          'aria-labelledby': 'basic-button2',
        }}
      >
        <MenuItem onClick={handleClose2}>My Profile</MenuItem>
        <MenuItem onClick={handleClose2}>Log Out</MenuItem>
      </Menu>
      </div>
    </div>
  );
}

export default SideDrawer;
