const express = require("express");
const { getConstructorStanding } = require("../controllers/constructorStandingController");
const { protect } = require("../middleware/authMiddleware");  

const router = express.Router();

router.get("/", protect, getConstructorStanding);

module.exports = router;