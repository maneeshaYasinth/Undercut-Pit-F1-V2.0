const Prediction = require("../models/Prediction");
const Score = require("../models/Score");

// Manual scoring (admin/test only)
const manualScoring = async (req, res) => {
  try {
    const { season, round, qualifyingWinner, raceTopThree } = req.body;

    if (!season || !round || !qualifyingWinner || !Array.isArray(raceTopThree)) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // Find all predictions for this race and populate userId
    const predictions = await Prediction.find({ season, round }).populate("userId");

    if (!predictions.length) {
      return res.status(404).json({ message: "No predictions found for this race" });
    }

    for (const prediction of predictions) {
      let points = 0;

      // Check qualifying winner
      if (prediction.qualifyingWinner === qualifyingWinner) points += 5;

      // Check race top 3
      prediction.raceTopThree.forEach((driver, index) => {
        if (raceTopThree[index] === driver) points += 10;
      });

      // Save/update score and include user field
      await Score.findOneAndUpdate(
        { user: prediction.userId._id, season, round }, // use userId
        { user: prediction.userId._id, points },       // include user
        { upsert: true, new: true }
      );
    }

    res.json({ message: "Manual scoring complete ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get leaderboard for a season
const getLeaderboard = async (req, res) => {
  try {
    const { season } = req.query; // ?season=2025

    const leaderboard = await Score.aggregate([
      { $match: season ? { season } : {} },
      {
        $group: {
          _id: "$user",
          totalPoints: { $sum: "$points" }
        }
      },
      { $sort: { totalPoints: -1 } },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $project: {
          totalPoints: 1,
          username: { $arrayElemAt: ["$user.username", 0] }
        }
      }
    ]);

    res.json(leaderboard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { manualScoring, getLeaderboard };
