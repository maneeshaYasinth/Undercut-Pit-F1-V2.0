const express = require("express");
const { getTeamRadio } = require("../controllers/teamRadioController");
const { protect } = require("../middleware/authMiddleware");    
const { route } = require("./driverRoutes");

router = express.Router();
router.get("/", protect, getTeamRadio);

module.exports = router;