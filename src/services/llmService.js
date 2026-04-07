const openai = require("../config/openai");
const { z } = require("zod");

// Define the expected response schema
const AnswerSchema = z.object({
  answer: z.string(),
  sources: z.array(z.string()),
  confidence: z.enum(["high", "medium", "low"]),
});

class LLMService {
  async getGroundedAnswer(question, documents, retrievalConfidence) {
    if (!documents || documents.length === 0) {
      return {
        answer:
          "I don't have enough information in my knowledge base to answer that question. Please ask about our e-commerce policies (refunds, shipping, returns, warranty, or cancellations).",
        sources: [],
        confidence: "low",
      };
    }

    // Build context from documents
    const context = documents
      .map(
        (doc, idx) => `
      [DOCUMENT ${idx + 1}: ${doc.title}]
      Content: ${doc.content}
      Tags: ${doc.tags.join(", ")}
    `,
      )
      .join("\n\n");

    // Create system prompt that restricts answers
    const systemPrompt = `You are a helpful customer support AI for an e-commerce store. 
You MUST ONLY answer based on the provided documents below. 
If the question cannot be answered using ONLY these documents, say: "I don't have enough information to answer that question."
Do not use any outside knowledge or make up information.
Always return a valid JSON object with exactly these keys: answer, sources, confidence.`;

    const userPrompt = `Based ONLY on these documents:
${context}

Question: ${question}

Return a JSON object with:
- "answer": Your answer based ONLY on documents (or "I don't have enough information..." if not found)
- "sources": Array of document titles you used
- "confidence": "${retrievalConfidence}" (use exactly this value)

Example: {"answer": "Refunds take 5-7 days.", "sources": ["Refund Policy"], "confidence": "high"}`;

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.3,
        response_format: { type: "json_object" },
      });

      const responseText = completion.choices[0].message.content;
      const parsed = JSON.parse(responseText);

      // Validate with Zod
      const validated = AnswerSchema.parse(parsed);

      // Ensure confidence matches retrieval confidence
      validated.confidence = retrievalConfidence;

      return validated;
    } catch (error) {
      console.error("LLM Error:", error);
      throw new Error("Failed to get response from LLM");
    }
  }
}

module.exports = new LLMService();
