const Document = require("../models/Document");

class RetrievalService {
  async findRelevantDocuments(question, topN = 3) {
    // Convert question to keywords (simple approach)
    const keywords = question
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(" ")
      .filter((word) => word.length > 3);

    // Search in MongoDB using text-like search
    const allDocs = await Document.find({});

    // Score each document based on keyword matches
    const scoredDocs = allDocs.map((doc) => {
      let score = 0;
      const contentLower = doc.content.toLowerCase();
      const titleLower = doc.title.toLowerCase();

      keywords.forEach((keyword) => {
        if (contentLower.includes(keyword)) score += 2;
        if (titleLower.includes(keyword)) score += 3;
        if (doc.tags.some((tag) => tag.includes(keyword))) score += 1;
      });

      return { doc, score };
    });

    // Filter and sort by score
    const relevant = scoredDocs
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, topN);

    // Determine confidence based on scores
    let confidence = "low";
    if (relevant.length > 0) {
      const topScore = relevant[0].score;
      if (topScore >= 5) confidence = "high";
      else if (topScore >= 2) confidence = "medium";
      else confidence = "low";
    }

    return {
      documents: relevant.map((r) => r.doc),
      confidence,
      scores: relevant.map((r) => ({ title: r.doc.title, score: r.score })),
    };
  }
}

module.exports = new RetrievalService();
