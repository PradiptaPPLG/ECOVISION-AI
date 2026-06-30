import { AIProvider } from "./provider";
import { AIResult } from "@/types/ai";

/**
 * The main AI Service layer for EcoVision AI.
 * 
 * Utilizes Dependency Injection (Provider/Strategy Pattern) to execute AI tasks.
 * This class follows the Open-Closed Principle (SOLID) as it can use any provider
 * (Mock, Gemini, OpenAI, etc.) without modifying this core service logic.
 */
export class AIService {
  private provider: AIProvider;

  /**
   * Injects the desired AI Provider into the service.
   * 
   * @param provider - An instance of a class implementing the AIProvider interface.
   */
  constructor(provider: AIProvider) {
    this.provider = provider;
  }

  /**
   * Analyzes an image using the injected AI provider.
   * 
   * @param image - The image file to analyze.
   * @returns A normalized AIResult.
   * @throws Error if the image is missing or the provider fails.
   */
  public async analyze(image: File): Promise<AIResult> {
    try {
      if (!image) {
        throw new Error("No image provided for analysis.");
      }

      // Delegate the actual analysis to the specific provider implementation
      const result = await this.provider.analyze(image);
      
      return result;
    } catch (error) {
      console.error("AI Analysis failed in AIService:", error);
      throw error;
    }
  }
}
