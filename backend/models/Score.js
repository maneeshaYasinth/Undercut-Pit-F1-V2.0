const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    season: { type: String, required: true },
    round: { type: String, required: true },
    points: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Score", scoreSchema);
