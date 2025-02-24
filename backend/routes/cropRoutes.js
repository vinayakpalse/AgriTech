const express = require("express"); // ✅ Use require instead of import
const router = express.Router();

// Define routes
router.get("/", (req, res) => {
    res.send("Crop API is working!");
});

module.exports = router; // ✅ Use module.exports instead of export default
