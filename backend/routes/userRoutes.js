const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Ensure this is your User model
const authMiddleware = require("../middleware/authMiddleware"); // Add authentication middleware

// ✅ Get Logged-in User Profile
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
