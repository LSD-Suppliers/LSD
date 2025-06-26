const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.OPENROUTER_API_KEY;

// Function to call OpenRouter and analyze text for scam detection
async function analyzeTextWithOpenRouter(text) {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "anthropic/claude-3-sonnet-20240229", // ✅ Supported & Available
        messages: [
          {
            role: "system",
            content: `You are a scam detection assistant. Analyze suspicious messages to determine if they may be scams based on common fraud patterns like:
- Fake job offers
- Platform switching (e.g., asking to move to WhatsApp/Telegram)
- Too good to be true salary/offer
- Vague company/recruiter details
- Generic or suspicious links

Only respond in this strict JSON format:
{
  "scam_score": <number between 0 and 100>,
  "analysis_summary": [
    {
      "pattern": "short scam clue name",
      "description": "why this clue makes the message suspicious"
    }
  ]
}`,
          },
          {
            role: "user",
            content: text,
          },
        ],
        temperature: 0.3,
        max_tokens: 1000, // ✅ Reduced to avoid "not enough credits" error
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Try to parse the AI's response content as JSON
    const aiMessage = response.data.choices[0].message.content;
    const parsed = JSON.parse(aiMessage);
    return parsed;
  } catch (err) {
    console.error("OpenRouter API Error:", err?.response?.data || err.message);

    // Fallback response
    return {
      scam_score: 0,
      analysis_summary: [
        {
          pattern: "Error",
          description:
            "AI analysis failed. Possibly due to quota issues or malformed response.",
        },
      ],
    };
  }
}

module.exports = { analyzeTextWithOpenRouter };
