import { TextField, Button } from "@mui/material";
import background from ".//aurora.jpg";
import {Link} from "react-router-dom";

function Login() {
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
              <tr>
                <td>
                  <h1>Login</h1>
                </td>
              </tr>
              <tr>
                <td>
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    InputLabelProps={{style: { color: '#fff' }}}
                    InputProps={{style: { color: '#fff' }}}
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
                    InputLabelProps={{style: { color: '#fff' }}}
                    InputProps={{style: { color: '#fff' }}}
                    size="large"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ size: "medium" }}
                  >
                    Login
                  </Button>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Don't have an account?</p>
                  <Link to="/signup">Sign up</Link>
                </td>
              </tr>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
