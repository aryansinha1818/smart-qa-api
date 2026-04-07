const retrievalService = require("../services/retrievalService");
const llmService = require("../services/llmService");
const QueryHistory = require("../models/QueryHistory");

const askQuestion = async (req, res, next) => {
  const startTime = Date.now();
  const { question } = req.body;
  const userId = req.user._id;

  try {
    if (!question || question.trim().length === 0) {
      return res.status(400).json({ error: "Question is required" });
    }

    // Log request start
    console.log(
      `[${new Date().toISOString()}] User: ${userId} | Question: ${question.substring(0, 50)}...`,
    );

    // Retrieve relevant documents
    const { documents, confidence, scores } =
      await retrievalService.findRelevantDocuments(question);

    // Get grounded answer from LLM
    const response = await llmService.getGroundedAnswer(
      question,
      documents,
      confidence,
    );

    const latencyMs = Date.now() - startTime;

    // Save to history (bonus)
    const historyEntry = new QueryHistory({
      userId,
      question,
      answer: response.answer,
      sources: response.sources,
      confidence: response.confidence,
      latencyMs,
    });
    await historyEntry.save();

    // Log completion
    console.log(
      `[${new Date().toISOString()}] User: ${userId} | Latency: ${latencyMs}ms | Confidence: ${confidence}`,
    );

    res.json({
      ...response,
      latencyMs,
      retrievalScores: scores, // Optional: for debugging
    });
  } catch (error) {
    console.error("Ask endpoint error:", error);
    next(error);
  }
};

const getHistory = async (req, res, next) => {
  try {
    const history = await QueryHistory.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10)
      .select("-__v");

    res.json({
      count: history.length,
      history,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { askQuestion, getHistory };
