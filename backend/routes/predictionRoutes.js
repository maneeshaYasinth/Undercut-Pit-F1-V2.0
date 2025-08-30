const express = require("express");
const Prediction = require("../models/Prediction");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Submit prediction (protected)
router.post("/", protect, async (req, res) => {
  try {
    const { season, round, qualifyingWinner, raceTopThree } = req.body;

    // basic validation
    if (!season || !round || !qualifyingWinner || !Array.isArray(raceTopThree)) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // create and save (unique index will prevent duplicate)
    try {
      const pred = new Prediction({
        userId: req.user._id,
        season,
        round,
        qualifyingWinner,
        raceTopThree
      });
      await pred.save();
      return res.status(201).json({ message: "Prediction saved", prediction: pred });
    } catch (err) {
      // handle duplicate key error (11000)
      if (err.code === 11000) {
        return res.status(400).json({ message: "Prediction already submitted for this race" });
      }
      // validation errors from mongoose
      if (err.name === "ValidationError") {
        return res.status(400).json({ message: err.message });
      }
      throw err;
    }
  } catch (err) {
    console.error("Submit prediction error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get logged-in user's predictions
router.get("/mine", protect, async (req, res) => {
  try {
    const preds = await Prediction.find({ userId: req.user._id }).sort({ submittedAt: -1 });
    res.json(preds);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
