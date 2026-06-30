import { AIProvider } from "./provider";
import { MockProvider } from "./mockProvider";
import { GeminiProvider } from "./geminiProvider";

/**
 * Factory class for managing and instantiating AI Providers.
 * Uses the Factory Pattern to determine which provider to use at runtime
 * based on environment variables.
 */
export class ProviderManager {
  /**
   * Instantiates and returns the appropriate AI Provider.
   * 
   * Environment Variable: `NEXT_PUBLIC_AI_PROVIDER`
   * - "mock": Returns MockProvider
   * - "gemini": Returns GeminiProvider
   * - default: Falls back to MockProvider for safety in development
   * 
   * @returns An instance of a class implementing the AIProvider interface.
   */
  public static getProvider(): AIProvider {
    // Access environment variable safely
    const providerType = process.env.NEXT_PUBLIC_AI_PROVIDER?.toLowerCase() || "mock";

    switch (providerType) {
      case "gemini":
        return new GeminiProvider();
      
      case "mock":
      default:
        // Default to MockProvider to prevent unexpected crashes if env var is missing or invalid
        return new MockProvider();
    }
  }
}
