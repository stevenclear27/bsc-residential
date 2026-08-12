// /lib/estimatingEngine.ts
import { Database } from "./types/database";

// STRICT TYPING: Extracting the exact column types directly from Supabase
type ProjectRecord = Database["public"]["Tables"]["projects"]["Row"];

export interface EstimatorInputs {
  // We force these inputs to match the exact data types your database expects
  linearFootage: NonNullable<ProjectRecord["linear_footage"]>;
  materialTier: NonNullable<ProjectRecord["material_tier"]>;
  roomCondition: NonNullable<ProjectRecord["room_condition"]>;
}

// ISOLATED CONFIGURATION: Your business logic variables
const BASE_RATES = {
  masterCarpenterDayRate: 850,
  linearFootBaseline: 150,
};

// We define the exact string literals expected by the engine
type MaterialTier = "Standard" | "Premium" | "Ultra-Custom";
type RoomCondition = "Turnkey" | "Minor Prep Needed" | "Gut and Reframe";

const MULTIPLIERS: Record<string, Record<string, number>> = {
  material: {
    Standard: 1.0,
    Premium: 1.45,
    "Ultra-Custom": 2.2,
  },
  complexity: {
    Turnkey: 1.0,
    "Minor Prep Needed": 1.25,
    "Gut and Reframe": 1.75,
  },
};

const ALLOWANCES = {
  subcontractorBuffer: 1500,
  contingencyMargin: 1.15,
};

export function generateInvestmentTier(inputs: EstimatorInputs) {
  // 1. Calculate Base Structural Cost
  const baseStructuralCost =
    inputs.linearFootage * BASE_RATES.linearFootBaseline;

  // 2. Apply Multipliers (Fallback to 1.0 if the AI passes an unexpected string)
  const materialMultiplier = MULTIPLIERS.material[inputs.materialTier] || 1.0;
  const complexityMultiplier =
    MULTIPLIERS.complexity[inputs.roomCondition] || 1.0;

  const calculatedCost =
    baseStructuralCost * materialMultiplier * complexityMultiplier;

  // 3. Add Fixed Allowances and Master Carpenter Minimums
  const laborAndSubs =
    BASE_RATES.masterCarpenterDayRate * 3 + ALLOWANCES.subcontractorBuffer;

  const rawTotal = calculatedCost + laborAndSubs;

  // 4. Generate the Range (Floor and Ceiling)
  const targetFloor = rawTotal;
  const targetCeiling = rawTotal * ALLOWANCES.contingencyMargin;

  // Return formatted strings for the UI and raw integers for the database
  return {
    formattedFloor: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(targetFloor),
    formattedCeiling: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(targetCeiling),
    rawFloor: targetFloor,
    rawCeiling: targetCeiling,
  };
}
