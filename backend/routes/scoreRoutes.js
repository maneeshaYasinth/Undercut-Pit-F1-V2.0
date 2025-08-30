const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { manualScoring, getLeaderboard } = require("../controllers/scoreController");

const router = express.Router();

// POST /api/scores/manual → manually score a race
router.post("/manual", protect, manualScoring);

// GET /api/scores/leaderboard?season=2025 → leaderboard
router.get("/leaderboard", getLeaderboard);

module.exports = router;
