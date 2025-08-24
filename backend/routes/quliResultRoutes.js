const express = require("express");
const { getResults } = require("../controllers/qualiResultController");
const { protect } = require("../middleware/authMiddleware");  

const router = express.Router();

router.get("/", protect, getResults); 

module.exports = router;
