// /src/lib/types/estimating.ts

export type MaterialTier = "standard" | "premium";

export interface ProjectParameters {
  category: string;
  area: number;
  tier: MaterialTier;
  confidenceScore: number;
}
