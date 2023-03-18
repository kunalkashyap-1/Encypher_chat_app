const express = require("express");
const router = express.Router();

const multer = require('multer');

// Configure multer to handle multipart/form-data
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Encypher-uploads/') // set the destination directory
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname) // set the filename
      }
});

  
const upload = multer({ storage });

const {registerUser,authUser} = require("../controllers/userControllers");
const imgUpload = require("../controllers/imgUpload");

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/img").post( upload.single('file'),imgUpload);

module.exports=router;