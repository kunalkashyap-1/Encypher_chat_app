import { Modal, Button, Box, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import {React, useState} from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius:"5%"
  };

const Profile = ({user,children})=>{
    const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return(
        <>
        {children?
        <Button onClick={handleOpen}>{children.props.children}</Button>:
        <PersonIcon onClick={handleOpen}/>
}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} id="profile">
          <Typography id="modal-modal-title" variant="h6" component="h2" >
            {user.name}
          </Typography>
            <img id="profileimg" alt={user.name} src={user.image} />
          <Typography id="modal-modal-description" sx={{ mt: 2 }} >
            {user.email}
          </Typography>
        </Box>
      </Modal>
        </>
    )
}

export default Profile;