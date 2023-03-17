import { Link } from "react-router-dom";
import background from ".//aurora.jpg";
import { TextField, Button } from "@mui/material";
import {useRef,useState} from "react";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

function Signup() {
    const fileInputRef = useRef(null);
    const [image,setImage] = useState(null);

    const picUpload = (event)=>{
        setImage(URL.createObjectURL(event.target.files[0]));
    }
    const handlePic = ()=>{
        fileInputRef.current.click();
    }
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
                <td>
                    <lable htmlFor="File">Upload Profile image</lable>
                </td>
            </tr>
            <tr>
                <div className="container">
                <div className="circle">
                <img 
                className="profile-pic"
                alt="profile pic" 
                src={image?image:"https://d11a6trkgmumsb.cloudfront.net/original/3X/d/8/d8b5d0a738295345ebd8934b859fa1fca1c8c6ad.jpeg"}/>
                </div>
                <div className="p-image">
                <input 
                type="file" 
                id="File" 
                name="File" 
                onChange={picUpload} 
                ref={fileInputRef} 
                accept="image/*"
                multiple={false}
                />
                <AddAPhotoIcon onClick={handlePic}/>
                </div>
                </div>
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
