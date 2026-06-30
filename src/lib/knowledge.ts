import { wasteKnowledgeDB } from "@/data/wasteKnowledge";
import { WasteKnowledge } from "@/types/waste";

/**
 * Retrieves detailed educational and recycling knowledge about a specific waste item.
 * 
 * @param id - The unique identifier of the waste item (e.g., "plastic-pet")
 * @returns The WasteKnowledge object if found, otherwise null.
 */
export function getWasteKnowledge(id: string): WasteKnowledge | null {
  // Finds the specific item by ID in the local knowledge database
  const item = wasteKnowledgeDB.find((waste) => waste.id === id);
  return item || null;
}
