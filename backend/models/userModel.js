const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String }, // Profile picture (optional)
}, { timestamps: true });

// Prevent model overwrite error
const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
