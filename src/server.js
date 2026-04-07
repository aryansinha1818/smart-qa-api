require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/database");
const errorHandler = require("./middleware/errorHandler");

// Import routes
const authRoutes = require("./routes/auth.routes");
const docsRoutes = require("./routes/docs.routes");
const askRoutes = require("./routes/ask.routes");

const app = express();
const PORT = process.env.PORT || 3003;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("combined")); // Logging every request

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Smart Q&A API",
    endpoints: {
      auth: "/api/auth/register, /api/auth/login",
      docs: "GET /api/docs",
      ask: "POST /api/ask (requires JWT, rate limited)",
      history: "GET /api/ask/history (bonus)",
    },
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/docs", docsRoutes);
app.use("/api/ask", askRoutes);

// Error handler (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 Seed database: npm run seed`);
  console.log(`🔐 JWT auth required for /api/ask`);
  console.log(`⏱️  Rate limit: 10 requests/minute per user`);
});
