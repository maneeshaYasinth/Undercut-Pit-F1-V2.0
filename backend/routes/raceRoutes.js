const express = require("express");
const { getRace } = require("../controllers/raceController");
const { protect } = require("../middleware/authMiddleware");  

const router = express.Router();

router.get("/", protect, getRace); 

module.exports = router;
