const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware"); // ✅ Ensure this path is correct

if (!authMiddleware) {
    throw new Error("Protect middleware is undefined. Check authMiddleware.js!");
}

// Example route using authMiddleware
router.post("/create", authMiddleware, async (req, res) => {
    try {
        const { content } = req.body;
        if (!content) {
            return res.status(400).json({ message: "Content is required." });
        }
        
        res.status(201).json({ message: "Post created successfully!", content });
    } catch (err) {
        console.error("Post creation error:", err);
        res.status(500).json({ message: "Server error during post creation." });
    }
});

module.exports = router; // ✅ Ensure proper export
