const cloudinary = require("cloudinary").v2;
const fs = require("fs");
// Configuration
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

const imgUpload = async (req, res) => {
  const { upload_preset, public_id, cloud_name } = req.body;
//   console.log(req.file);

  //   check for upload function
  const result = cloudinary.uploader.upload(req.file.path, {
    public_id,
    upload_preset,
    cloud_name,
    folder: "Encypher",
    resource_type: "auto",
  });

  result
    .then((data) => {
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        // console.log(`Deleted file: ${req.file.path}`);
      });
    //   console.log(data.secure_url);
      res.json(data.secure_url);
    })
    .catch((err) => {
      console.log(err);
    });

  //upload image
  // cloudinary.uploader.upload(`${imgUrl}`, {public_id: `${imgId}`});

  // Generate URL
    // const url = cloudinary.url(`${public_id}`, {
    //   width: 130,
    //   height: 130,
    //   Crop: "fill",
    // });

    // // The output url
    // res.json(url);
};

module.exports = imgUpload;
