const mongoose = require("mongoose");

const PredictionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  season: { type: String, required: true },
  round: { type: String, required: true },
  qualifyingWinner: { type: String, required: true }, // driverId (string)
  raceTopThree: {
    type: [String],
    required: true,
    validate: {
      validator: arr => Array.isArray(arr) && arr.length === 3 && new Set(arr).size === 3,
      message: "raceTopThree must be an array of 3 unique driver IDs"
    }
  },
  submittedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// enforce one prediction per user per race
PredictionSchema.index({ userId: 1, season: 1, round: 1 }, { unique: true });

module.exports = mongoose.model("Prediction", PredictionSchema);
