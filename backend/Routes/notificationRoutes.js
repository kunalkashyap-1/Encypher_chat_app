const express = require("express");
const {allNotif, sendNotif, deleteNotif} = require("../controllers/notificationControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/")
.get(protect, allNotif)
.post(protect, sendNotif);
router.route("/:notifId").delete(protect, deleteNotif);

module.exports = router;