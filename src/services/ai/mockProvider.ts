import { AIProvider } from "./provider";
import { AIResult } from "@/types/ai";

/**
 * A mock implementation of the AIProvider.
 * Used for development, testing, and UI building without requiring actual AI API keys.
 */
export class MockProvider implements AIProvider {
  /**
   * Simulates an AI image analysis.
   * Always returns a dummy "plastic-pet" result with 96% confidence as requested.
   * 
   * @param image - The image file to "analyze" (ignored in mock).
   * @returns A promise resolving to a mock AIResult.
   */
  public async analyze(image: File): Promise<AIResult> {
    // Simulate network latency (e.g., 2 seconds) for realistic UI loading states
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return {
      id: "plastic-pet", // Maps perfectly to our local knowledge engine
      confidence: 96,
      detectedLabel: "plastic-pet",
    };
  }
}
