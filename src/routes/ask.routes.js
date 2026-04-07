const express = require("express");
const { askQuestion, getHistory } = require("../controllers/askController");
const authMiddleware = require("../middleware/auth");
const { perUserRateLimiter } = require("../middleware/rateLimiter");

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Rate limit: 10 requests per minute per user
router.post("/", perUserRateLimiter(10, 60 * 1000), askQuestion);

// Bonus: Get user's question history
router.get("/history", getHistory);

module.exports = router;
