import { Link } from "react-router-dom";
import background from ".//aurora.jpg";
import { TextField, Button } from "@mui/material";
import ImgUpload from "./imgUpload";
import { useState } from "react";
import axios from "axios";

function Signup(props) {
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [email, setEmail] = useState();
  const [imgLink, setImgLink] = useState();
  const [cnfmPasswd, setCnfmpasswd] = useState();
  const [passwd, setPasswd] = useState();


  const onSubmit = async () => {
    if (!fname || !lname || !email || !passwd || !cnfmPasswd) {
      const open = {
        vis:true,
      message:"Please fill all the feilds"}
      props.isOpen(open);
      return;
    }
    if (passwd !== cnfmPasswd) {
      const open = {
        vis:true,
      message:"Passwords does not match"}
      props.isOpen(open);
      return;
    }
    // console.log(fname,lname,email,passwd,imgLink);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post("http://localhost:8383/api/user",
        {
          name:`${fname} ${lname}`,
          email,
          passwd,
          image:imgLink,
        },
        config
      );
      // console.log(data);
      
      localStorage.setItem("userInfo", JSON.stringify(data));
      // history.push("/chats");
    } catch (error) {
      //snackbar later
        console.log(error.response.data.message);
      };
  };


  return (
    <div id="back" style={{ backgroundImage: `url(${background})` }}>
      <div className="blur">
        <div className="signup">
          <table>
            <tbody>
              <tr>
                <td>
                  <h1>Create new account</h1>
                </td>
              </tr>
              <tr>
                <td>
                  <p>
                    Already a member?<Link to="/">Log in</Link>
                  </p>
                </td>
              </tr>
              <tr>
                <ImgUpload onUpload={(link)=>{
                  console.log(link);
                  setImgLink(link)
                  }}/>
              </tr>
              <tr>
                <td>
                  <TextField
                    id="outlined-basic"
                    label="First name"
                    variant="outlined"
                    InputLabelProps={{ style: { color: "#fff" } }}
                    InputProps={{ style: { color: "#fff" } }}
                    size="large"
                    onChange={(e) => {
                      setFname(e.target.value);
                    }}
                  />
                </td>
                <td>
                  <TextField
                    id="outlined-basic"
                    label="Last name"
                    variant="outlined"
                    InputLabelProps={{ style: { color: "#fff" } }}
                    InputProps={{ style: { color: "#fff" } }}
                    size="large"
                    onChange={(e) => {
                      setLname(e.target.value);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    InputLabelProps={{ style: { color: "#fff" } }}
                    InputProps={{ style: { color: "#fff" } }}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    size="large"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <TextField
                    id="outlined-password-input"
                    label="Password"
                    variant="outlined"
                    type="password"
                    InputLabelProps={{ style: { color: "#fff" } }}
                    InputProps={{ style: { color: "#fff" } }}
                    onChange={(e) => {
                      setPasswd(e.target.value);
                    }}
                    size="large"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <TextField
                    id="outlined-password-input"
                    label="Confirm Password"
                    variant="outlined"
                    type="password"
                    InputLabelProps={{ style: { color: "#fff" } }}
                    InputProps={{ style: { color: "#fff" } }}
                    onChange={(e) => {
                      setCnfmpasswd(e.target.value);
                    }}
                    size="large"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ size: "medium", m: "10px" }}
                  >
                    GOAuth
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ size: "medium" }}
                    onClick={onSubmit}
                  >
                    Sign Up
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      ;
    </div>
  );
}

export default Signup;
