import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

try {
  const res = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Hello",
  });

  console.log("Success! Gemini response:", res.text);
} catch (e) {
  console.error("API Call Failed with error:");
  console.error(e);
}
