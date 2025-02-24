const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const Post = require("../models/Post");  // ✅ Uses preloaded Post model
 // Import Post model
 
router.post("/register", async (req, res) => {
    try {
        const { username, email, password, city, role } = req.body;

        if (!username || !email || !password || !city || !role) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const validRoles = ["user", "farmer"];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: "Invalid role selected." });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashedPassword, city, role });  
        await newUser.save();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ message: "Server error during registration", error: err.message });
    }
});


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        req.session.userId = user._id;
        console.log("User logged in, session ID:", req.session.userId);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
        });

        res.status(200).json({
            message: "Login successful!",
            token,
            user: { id: user._id, username: user.username, email: user.email, city: user.city, role: user.role }
        });
        
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error during login", error: err.message });
    }
});

router.get("/profile", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        console.error("Profile fetch error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Logout error:", err);
            return res.status(500).json({ message: "Error during logout" });
        }
        res.clearCookie("token");
        res.status(200).json({ message: "Logout successful!" });
    });
});

router.get("/profile", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email,
            city: user.city,
            role: user.role || "Not assigned" 
        });
    } catch (err) {
        console.error("Profile fetch error:", err);
        res.status(500).json({ message: "Server error" });
    }
});
router.get("/users", authMiddleware, async (req, res) => {
    try {
        const users = await User.find({}, "username email city role");
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server error while fetching users" });
    }
});

router.get("/api/posts", async (req, res) => {
    try {
        const posts = await Post.find().populate("user", "username email"); // Populate username & email
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: "Error fetching posts", error: err });
    }
});

module.exports = router;
