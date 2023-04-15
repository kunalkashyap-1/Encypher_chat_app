import { Link } from "react-router-dom";
import background from ".//aurora.jpg";
import { TextField, Button } from "@mui/material";
import ImgUpload from "./imgUpload";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup(props) {
  const [fname, setFname] = useState(null);
  const [lname, setLname] = useState(null);
  const [email, setEmail] = useState(null);
  const [cnfmPasswd, setCnfmpasswd] = useState(null);
  const [passwd, setPasswd] = useState(null);
  const [imgData, setImgData] = useState(null);
  const navigate = useNavigate();

  const defaultImg =
    "https://i0.wp.com/www.artstation.com/assets/default_avatar.jpg?ssl=1";
  let imgFile;

  const OAuthHandler = async () => {
    try {
      const { data } = await axios.get("http://localhost:8383/auth/google");

      console.log(JSON.stringify(data));
      // localStorage.setItem("userInfo", JSON.stringify(data));
      // if(!loading){
      //   navigate("/chats");
      // }
    } catch (error) {
      console.log(error);
      const open = {
        vis: true,
        message: error.message,
      };
      props.isOpen(open);
    }
  };

  const onSubmit = async () => {
    if (!fname || !email || !passwd || !cnfmPasswd) {
      const open = {
        vis: true,
        message: "Please fill all the feilds",
      };
      props.isOpen(open);
      return;
    }

    if(!email.includes("@")){
      const open = {
        vis: true,
        message: "Please enter valid E-Mail",
      };
      props.isOpen(open);
      return;
    }
    
    if (passwd !== cnfmPasswd) {
      const open = {
        vis: true,
        message: "Passwords does not match",
      };
      props.isOpen(open);
      return;
    }
    // console.log(fname,lname,email,passwd,imgLink);
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    if (!imgData) {
      imgFile = new FormData();
      imgFile.append("file", defaultImg);
      imgFile.append("public_id", "DefaultImage");
      imgFile.append("upload_preset", "Encypher");
      imgFile.append("cloud_name", "discki5bm");
    } else {
      imgFile = imgData;
    }

    axios
      .post(`http://localhost:8383/api/user/img`, imgFile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((imgLink) => {
        axios
          .post(
            "http://localhost:8383/api/user",
            {
              name: `${fname} ${lname}`,
              email,
              passwd,
              image: imgLink.data,
            },
            config
          )
          .then((data) => {
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate("/");
          })
          .catch((err) => {
            console.log(err.response.data.message);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const style = {
    color: "#fff",
    background: "rgb(211,211,211,0.5)",
    borderRadius: 20,
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
                    Already a member?
                    <Link className="anchor" to="/">
                      {" "}
                      Log in
                    </Link>
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                <ImgUpload
                  data={(imgData) => {
                    console.log(imgData.get("file"));
                    setImgData(imgData);
                  }}
                />
                </td>
              </tr>
              <tr>
                <td>
                  <div id="names">
                    <TextField
                      label="First name"
                      variant="filled"
                      InputLabelProps={{ style: { color: "#fff" } }}
                      InputProps={{
                        style: style,
                        disableUnderline: true,
                        id: "fname",
                      }}
                      size="large"
                      onChange={(e) => {
                        setFname(e.target.value);
                      }}
                      sx={{ mr: 4, width: 300 }}
                    />

                    <TextField
                      label="Last name"
                      variant="filled"
                      InputLabelProps={{ style: { color: "#fff" } }}
                      InputProps={{ style: style, disableUnderline: true }}
                      size="large"
                      onChange={(e) => {
                        setLname(e.target.value);
                      }}
                      sx={{ mr: 5, width: 300 }}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <TextField
                    label="Email"
                    variant="filled"
                    InputLabelProps={{ style: { color: "#fff" } }}
                    InputProps={{ style: style, disableUnderline: true }}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    size="large"
                    sx={{ width: 300 }}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <TextField
                    label="Password"
                    variant="filled"
                    type="password"
                    InputLabelProps={{ style: { color: "#fff" } }}
                    InputProps={{ style: style, disableUnderline: true }}
                    onChange={(e) => {
                      setPasswd(e.target.value);
                    }}
                    sx={{ width: 300 }}
                    size="large"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <TextField
                    label="Confirm Password"
                    variant="filled"
                    type="password"
                    InputLabelProps={{ style: { color: "#fff" } }}
                    InputProps={{ style: style, disableUnderline: true }}
                    onChange={(e) => {
                      setCnfmpasswd(e.target.value);
                    }}
                    sx={{ width: 300 }}
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
                    onClick={onSubmit}
                  >
                    Sign Up
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ size: "medium", m: "10px" }}
                    onClick={OAuthHandler}
                  >
                    GMail
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
