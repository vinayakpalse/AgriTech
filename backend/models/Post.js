const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    content: { type: String, required: true },
    image: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now }
});

// ✅ Prevent overwriting the model
const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

module.exports = Post;
