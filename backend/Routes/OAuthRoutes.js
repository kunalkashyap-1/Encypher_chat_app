const express = require("express");
const router = express.Router();
const {
  googleAuth,
  googleAuthCallback,
} = require("../controllers/authGoogleController");

router.route("/google").get(googleAuth);
router.route("/google/callback").get(googleAuthCallback);

module.exports = router;
