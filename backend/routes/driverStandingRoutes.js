const express = require("express");
const { getDriversStandings } = require("../controllers/driverStandingController");
const { protect } = require("../middleware/authMiddleware");  

const router = express.Router();

router.get("/", protect, getDriversStandings); 

module.exports = router;