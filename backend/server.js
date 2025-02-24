require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const axios = require("axios");

const Post = require("./models/Post");  // ✅ Fixed import path
const cropRoutes = require("./routes/cropRoutes");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const chatRoutes = require("./routes/chatRoutes");

// ✅ Initialize express app at the beginning
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

const allowedOrigins = ["http://localhost:3000", "http://localhost:3004"];
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use(express.json());

// ✅ Ensure required env variables are set
const { API_URL, API_KEY, MONGO_URI, SESSION_SECRET } = process.env;

if (!MONGO_URI) {
  console.error("ERROR: MONGO_URI is not set in .env file!");
  process.exit(1);
} else {
  console.log("✅ MONGO_URI Loaded");
}

// ✅ Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected!"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

// ✅ Session Storage
const store = new MongoDBStore({
  uri: MONGO_URI,
  collection: "sessions",
});

app.use(
  session({
    secret: SESSION_SECRET || "mysecret",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true, secure: false, sameSite: "Lax" },
  })
);

// ✅ Routes
app.use("/api/crops", cropRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/chat", chatRoutes);

// ✅ Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ✅ Post Schema & Routes
app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

app.post("/api/posts", async (req, res) => {
  const { content, user } = req.body;
  if (!content || !user) return res.status(400).json({ message: "Missing content or user" });

  try {
    const newPost = new Post({ content, user });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: "Error creating post" });
  }
});

app.put("/api/posts/:id", async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(id, { content }, { new: true });
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: "Error updating post" });
  }
});

app.delete("/api/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Post.findByIdAndDelete(id);
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(400).json({ message: "Error deleting post" });
  }
});

// ✅ Upload posts with images
app.post("/api/posts/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.body.content && !req.file) {
      return res.status(400).json({ message: "Please enter text or select an image to post." });
    }

    const newPost = new Post({
      content: req.body.content,
      user: req.body.user || "Anonymous",
      image: req.file ? req.file.path : null,
    });

    const savedPost = await newPost.save();
    console.log("Post uploaded:", { content: req.body.content, file: req.file });
    res.status(201).json({ message: "Post uploaded successfully!", post: savedPost });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Server error. Try again later." });
  }
});

// ✅ Schemes API route
if (!API_URL || !API_KEY) {
  console.error("ERROR: Missing API_URL or API_KEY in .env file!");
  process.exit(1);
}

app.get("/schemes", async (req, res) => {
  try {
    console.log("Fetching data from API...");
    console.log("API_URL:", API_URL);
    console.log("API_KEY:", API_KEY);

    const response = await axios.get(`${API_URL}?api-key=${API_KEY}`);
    console.log("Full API Response:", response.data);

    if (!response.data || !response.data.records) {
      console.error("Invalid API response:", response.data);
      return res.status(500).json({ error: "Invalid API response" });
    }

    res.json(response.data.records);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// ✅ ML Model Prediction API
app.post("/api/predict", async (req, res) => {
  try {
      console.log("Received request for prediction:", req.body);

      const response = await axios.post("http://127.0.0.1:5000/predict", { 
          features: req.body.features 
      });

      console.log("Prediction Response:", response.data);
      res.json({ prediction: response.data.prediction });
  } catch (error) {
      console.error("Error in prediction API:", error.message);
      res.status(500).json({ error: error.message });
  }
});



// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
