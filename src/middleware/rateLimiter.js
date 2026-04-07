const rateLimit = require("express-rate-limit");

// Store rate limit data in memory (for demo)
// In production, use Redis
const userRequests = new Map();

const perUserRateLimiter = (limit = 10, windowMs = 60 * 1000) => {
  return async (req, res, next) => {
    const userId = req.user?._id?.toString() || "anonymous";
    const now = Date.now();
    const windowStart = now - windowMs;

    if (!userRequests.has(userId)) {
      userRequests.set(userId, []);
    }

    const requests = userRequests.get(userId);
    const recentRequests = requests.filter(
      (timestamp) => timestamp > windowStart,
    );

    if (recentRequests.length >= limit) {
      return res.status(429).json({
        error: `Rate limit exceeded. Maximum ${limit} requests per minute.`,
      });
    }

    recentRequests.push(now);
    userRequests.set(userId, recentRequests);
    next();
  };
};

// Clean up old entries every hour
setInterval(
  () => {
    const now = Date.now();
    const windowMs = 60 * 1000;
    for (const [userId, timestamps] of userRequests.entries()) {
      const recent = timestamps.filter((ts) => ts > now - windowMs);
      if (recent.length === 0) {
        userRequests.delete(userId);
      } else {
        userRequests.set(userId, recent);
      }
    }
  },
  60 * 60 * 1000,
);

module.exports = { perUserRateLimiter };
