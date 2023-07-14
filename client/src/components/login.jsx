import { TextField, Button, CircularProgress } from "@mui/material";
import background from ".//aurora.jpg";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login(props) {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      navigate("/chats");
    }
  }, [navigate]);

  const [email, setEmail] = useState();
  const [passwd, setPasswd] = useState();
  const [loading, setLoading] = useState(false);

  const OAuthHandler = async () => {
    // try {
    //   setLoading(true);

    //   const { data } = await axios.get("http://localhost:8383/auth/google");

    //   console.log(JSON.stringify(data));
    //   localStorage.setItem("userInfo", JSON.stringify(data));
    //   setLoading(false);
    //   if(!loading){
    //     navigate("/chats");
    //   }
    // } catch (error) {
    //   console.log(error);
    //   const open = {
    //     vis: true,
    //     message: error.message,
    //   };
    //   props.isOpen(open);
    //   setLoading(false);
    // }

    window.open("https://encypher-backend.onrender.com/auth/google", "_self");
  };

  const Submit = async () => {
    if (!email || !passwd) {
      const open = {
        vis: true,
        message: "Please fill all the feilds",
      };
      props.isOpen(open);
      return;
    }

    if (!email.includes("@")) {
      const open = {
        vis: true,
        message: "Please enter valid E-Mail",
      };
      props.isOpen(open);
      return;
    }
    // console.log(email, passwd);
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "https://encypher-backend.onrender.com/api/user/login",
        { email, passwd },
        config
      );

      // console.log(JSON.stringify(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      if (!loading) {
        navigate("/chats");
      }
    } catch (error) {
      const open = {
        vis: true,
        message: error.message,
      };
      props.isOpen(open);
      console.log(error.response.data.message);
      setLoading(false);
    }
  };

  const style = {
    color: "#fff",
    background: "rgb(211,211,211,0.5)",
    borderRadius: 20,
  };

  return (
    <div id="back" style={{ backgroundImage: `url(${background})` }}>
      <div className="blur">
        <div className="login-data">
          <h1 style={{ fontSize: "clamp(40px, 6vw, 80px)" }}>Encypher</h1>
          <h3
            style={{
              fontSize: "clamp(40px, 6vw, 40px)",
              color: "rgba(255,255,255,0.75",
            }}
          >
            Stay connected, stay safe with Encypher.
          </h3>
        </div>
        <div className="login">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              Submit();
            }}
          >
            <h1 style={{ fontSize: "3rem", padding: "0 1rem" }}>Login</h1>
            <table>
              <tbody>
                <tr>
                  <td>
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      variant="filled"
                      autoComplete="off"
                      InputLabelProps={{ style: { color: "#fff" } }}
                      InputProps={{ style: style, disableUnderline: true }}
                      size="large"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      sx={{ width: 350 }}
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
                      InputLabelProps={{ style: { color: "#fff" } }}
                      InputProps={{ style: style, disableUnderline: true }}
                      size="large"
                      onChange={(e) => {
                        setPasswd(e.target.value);
                      }}
                      sx={{ width: 350 }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        gap: "1rem",
                      }}
                    >
                      <Button
                        variant="contained"
                        color="success"
                        type="submit"
                        size="large"
                        onClick={Submit}
                      >
                        Login
                      </Button>

                      <Button
                        variant="contained"
                        color="error"
                        size="large"
                        onClick={OAuthHandler}
                      >
                        GMail
                      </Button>
                      {loading ? <CircularProgress /> : <></>}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>
                      Don't have an account?
                      <Link className="anchor" to="/signup">
                        {" "}
                        Sign up
                      </Link>
                    </p>
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
