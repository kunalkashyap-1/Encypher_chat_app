import { Link } from "react-router-dom";
import background from ".//aurora.jpg";
import { TextField, Button } from "@mui/material";
import ImgUpload from "./imgUpload";

function Signup() {
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
                <ImgUpload/>
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
                >
                  Sign Up
                </Button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Signup;
