/**
 * Represents the general category of waste.
 */
export type WasteCategory =
  | 'Plastic'
  | 'Paper'
  | 'Glass'
  | 'Metal'
  | 'Organic'
  | 'Hazardous'
  | 'E-Waste';

/**
 * Represents the difficulty level of recycling the item.
 */
export type RecyclingDifficulty = 'Easy' | 'Medium' | 'Hard' | 'Specialized';

/**
 * Interface representing a specific waste item in the Knowledge Engine.
 */
export interface WasteKnowledge {
  id: string;
  name: string;
  category: WasteCategory;
  description: string;
  recyclable: boolean;
  recyclingBin: string;
  estimatedDecomposition: string;
  environmentalImpact: string;
  recommendations: string[];
  difficulty: RecyclingDifficulty;
  confidenceNote: string;
}
