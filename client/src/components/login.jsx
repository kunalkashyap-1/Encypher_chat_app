import { TextField, Button } from "@mui/material";
import background from ".//aurora.jpg";
import { useState } from "react";
import {Link} from "react-router-dom";
import axios from "axios";


function Login(props) {
  const [email,setEmail] = useState();
  const [passwd,setPasswd] = useState();

  const onSubmit = async ()=>{
    if(!email || !passwd){
      const open = {
        vis:true,
        message:"Please fill all the feilds"
      }
      props.isOpen(open);
      return;
    }
    // console.log(email, passwd);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post("http://localhost:8383/api/user/login",
        { email, passwd },
        config
      );

      // console.log(JSON.stringify(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
      // history.push("/chats");
    } catch (error) {
      //snackbar later
        console.log(error.response.data.message)
    }
  }

  const style = {
    color: "#fff",
    background: "rgb(211,211,211,0.5)",
    "border-radius": 20,
  };


  return (
    <div id="back" style={{ backgroundImage: `url(${background})` }}>
      <div className="blur">
        <div className="login-data">
          <h1>Encypher</h1>
          <h2>
            this would be some data which would be given after the mvp is done
          </h2>
        </div>
        <div className="login">
          <form>
            <table>
              <tbody>
              <tr>
                <td>
                  <h1>Login</h1>
                </td>
              </tr>
              <tr>
                <td>
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="filled"
                    InputLabelProps={{style: { color: '#fff' }}}
                    InputProps={{ style: style, disableUnderline: true }}
                    size="large"
                    onChange={(e)=>{setEmail(e.target.value)}}
                    sx={{ mr: 4, width: 300 }}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <TextField
                    id="outlined-password-input"
                    label="Password"
                    variant="filled"
                    type="password"
                    InputLabelProps={{style: { color: '#fff' }}}
                    InputProps={{ style: style, disableUnderline: true }}
                    size="large"
                    onChange={(e)=>{setPasswd(e.target.value)}}
                    sx={{ mr: 4, width: 300 }}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ size: "medium" }}
                    onClick={onSubmit}
                  >
                    Login
                  </Button>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Don't have an account?
                  <Link className="anchor" to="/signup"> Sign up</Link></p>
                </td>
              </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
