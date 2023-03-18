import { useRef, useState, useEffect } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import axios from "axios";

function ImgUpload() {
  const fileInputRef = useRef(null);
  const [pic, setPic] = useState(null);
  const [trg, setTrg] = useState(0);
  const [image, setImage] = useState(
    "https://i0.wp.com/www.artstation.com/assets/default_avatar.jpg?ssl=1"
  );

  useEffect(() => {
    if(trg ===1){
    const imgData = new FormData();
    imgData.append("file", pic);
    imgData.append("public_id",pic.name);
    imgData.append("upload_preset", "Encypher");
    imgData.append("cloud_name", "discki5bm");
    // console.log(pic);

    
    axios
      .post(`http://localhost:8383/api/user/img`, imgData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        }})
      .then((data) => console.log(data))
      .catch((error) => {
        console.log(error);
      });
      setTrg(0);
    }
  }, [trg]);

  const picUpload = (img) => {
    setPic(img);
    setTrg(1);

    // setImage(URL.createObjectURL(event.target.files[0]));
    // console.log(event.target.files[0].name);
  };
  const handlePic = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <lable htmlFor="File">Upload Profile image</lable>
      <div className="container">
        <div className="circle">
          <img className="profile-pic" alt="profile pic" src={image} />
        </div>
        <div className="p-image">
            {/* <form encType="multipart/form-data"> */}
          <input
            type="file"
            id="File"
            name="File"
            ref={fileInputRef}
            accept="image/*"
            multiple={false}
            onChange={(e) => {
              picUpload(e.target.files[0]);
            }}
          />
          {/* </form> */}
          <AddAPhotoIcon onClick={handlePic} />
        </div>
      </div>
    </>
  );
}

export default ImgUpload;
