import { AIProvider } from "@/types/ai";

/**
 * This file serves as a central registry or base abstraction for AI Providers.
 * For now, it re-exports the AIProvider interface for localized imports within the services layer.
 * Future shared provider logic (e.g., base classes for rate limiting) can live here.
 */
export type { AIProvider };
