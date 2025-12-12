const User = require("../models/User");

// Get user profile
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // assuming user ID is available in req.user.id
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Error getting user profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getProfile };
