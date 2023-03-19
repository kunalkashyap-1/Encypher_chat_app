import { useRef, useState } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

function ImgUpload(props) {
  const fileInputRef = useRef(null);
  const [image, setImage] = useState();

  const picUpload = (img) => {
    const imgData = new FormData();
    imgData.append("file", img);
    imgData.append("public_id", img.name);
    imgData.append("upload_preset", "Encypher");
    imgData.append("cloud_name", "discki5bm");
    props.data(imgData);
  };
  const handlePic = () => {
    fileInputRef.current.click();
  };

  return (
      <div className="container">
      <h3>Upload Profile image</h3>
        <div className="circle">
          <img
            className="profile-pic"
            alt="profile pic"
            src={
              image
                ? image
                : "https://i0.wp.com/www.artstation.com/assets/default_avatar.jpg?ssl=1"
            }
          />
        </div>
        <div className="p-image">
          <input
            type="file"
            id="File"
            name="File"
            ref={fileInputRef}
            accept="image/*"
            multiple={false}
            onChange={(e) => {
              picUpload(e.target.files[0]);
              setImage(URL.createObjectURL(e.target.files[0]));
            }}
          />
          <AddAPhotoIcon onClick={handlePic} />
        </div>
      </div>
  );
}

export default ImgUpload;
