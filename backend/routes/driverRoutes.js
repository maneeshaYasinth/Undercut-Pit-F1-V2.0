const express = require("express");
const { getDrivers } = require("../controllers/driverController");
const { protect } = require("../middleware/authMiddleware");  

const router = express.Router();

router.get("/", protect, getDrivers); 

module.exports = router;