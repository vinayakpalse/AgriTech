const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware"); // Ensure authMiddleware is correct
const User = require("../models/User"); // Ensure User model is correct

// ✅ Fix: Add update profile route
router.put("/update-profile", authMiddleware, async (req, res) => {
    try {
        console.log("Update Request Received:", req.body); // Debugging log

        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized - No user ID found" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { username: req.body.username, email: req.body.email, city: req.body.city, role: req.body.role },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(updatedUser);
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
