const { GoogleGenAI } = require("@google/genai");

if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing from backend/.env");
}

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function evaluateAnswer(question, answer) {

    const prompt = `
You are an expert technical interviewer.

Evaluate the candidate's answer to the interview question.

Question:
${question}

Candidate Answer:
${answer}

Return ONLY valid JSON in exactly this format:

{
    "score": 0,
    "relevance": "",
    "technicalAccuracy": "",
    "strengths": [],
    "weaknesses": [],
    "suggestions": []
}

Rules:
- score must be between 0 and 10.
- Evaluate the actual content, not just answer length.
- Check relevance to the question.
- Check technical correctness.
- Give practical suggestions.
- Keep the response concise.
- Return JSON only.
- Do not use markdown or code fences.
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt
    });

    const text = response.text.trim();

    try {
        return JSON.parse(text);
    } catch (error) {
        console.error("Invalid AI response:", text);
        throw new Error("AI returned an invalid evaluation.");
    }
}

module.exports = {
    evaluateAnswer
};