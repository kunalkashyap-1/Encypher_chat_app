import { useState } from "react";
import Login from "../components/login.jsx";
import Signup from "../components/signup.jsx";
import { Alert, Snackbar } from "@mui/material";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function HomePage() {
  const [open, setOpen] = useState({
    vis: false,
    message: null,
  });
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login isOpen={(e)=>{setOpen(e)}}/>} />
        <Route exact path="/signup" element={<Signup isOpen={(e)=>{setOpen(e)}}/>} />
      </Routes>
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
    </Router>
  );
}

export default HomePage;
