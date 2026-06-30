import { GoogleGenAI } from "@google/genai";
import * as fs from "fs";
import * as path from "path";

// Function to read and parse GEMINI_API_KEY from .env.local
function getApiKeyFromEnv() {
  try {
    const envPath = path.resolve(process.cwd(), ".env.local");
    if (!fs.existsSync(envPath)) {
      console.warn("⚠️ .env.local file not found in current directory.");
      return null;
    }
    const content = fs.readFileSync(envPath, "utf-8");
    const match = content.match(/^GEMINI_API_KEY\s*=\s*(.+)$/m);
    return match ? match[1].trim() : null;
  } catch (error) {
    console.error("Failed to read .env.local:", error);
    return null;
  }
}

async function main() {
  const apiKey = getApiKeyFromEnv();
  
  if (!apiKey) {
    console.error("❌ Error: GEMINI_API_KEY not found in .env.local. Please define it first.");
    process.exit(1);
  }

  console.log(`🔌 Testing Gemini API Connection...`);
  console.log(`🔑 Using API Key: ${apiKey.substring(0, 8)}...${apiKey.substring(apiKey.length - 4)}`);

  if (!apiKey.startsWith("AIzaSy")) {
    console.warn("⚠️ Warning: Your API Key does not start with 'AIzaSy'. This is likely NOT a valid Google AI Studio key.");
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    // Test with gemini-2.5-flash or gemini-2.0-flash
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Say 'Hello from Gemini! Connection successful.' only."
    });

    console.log("\n✅ Success! Gemini response:");
    console.log("----------------------------------------");
    console.log(response.text);
    console.log("----------------------------------------");
    console.log("Your API key is active and working correctly.");
  } catch (error) {
    console.error("\n❌ API Call Failed:");
    console.error("----------------------------------------");
    console.error(error);
    console.error("----------------------------------------");
    console.log("\n💡 Diagnostics:");
    console.log("- If the error mentions 403 / PERMISSION_DENIED / 'Your project has been denied access':");
    console.log("  Google Cloud or AI Studio has blocked/suspended the project associated with this key.");
    console.log("  Please generate a new API key under a fresh project in Google AI Studio (https://aistudio.google.com/).");
  }
}

main();
