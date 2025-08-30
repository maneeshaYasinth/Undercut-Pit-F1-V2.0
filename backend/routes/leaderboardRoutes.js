import express from "express";
import Score from "../models/Score.js";
import User from "../models/User.js";

const router = express.Router();

// Get leaderboard for a season
router.get("/:season", async (req, res) => {
  try {
    const { season } = req.params;

    const leaderboard = await Score.aggregate([
      { $match: { season } },
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
    res.status(500).json({ error: err.message });
  }
});

export default router;
