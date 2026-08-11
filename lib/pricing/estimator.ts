// /src/lib/pricing/estimator.ts

// ============================================================================
// 1. DATA CONTRACTS (STRICT TYPING)
// Prevents runtime failures by forcing the AI and UI to pass exact data shapes.
// ============================================================================

export interface HomeownerInputPayload {
  projectScope:
    | "custom_cabinetry"
    | "architectural_millwork"
    | "room_refinish_install";
  linearFootage: number;
  materialTier:
    | "designer_painted"
    | "stain_grade_hardwood"
    | "ultra_custom_walnut_oak";
  roomCondition: "turnkey_ready" | "minor_prep_needed" | "gut_and_reframe";
  mepRequired: {
    electricalModifications: boolean;
    plumbingModifications: boolean;
  };
  zipCode: string;
}

export interface ResolvedParametricVariables {
  mUnit: number;
  lUnit: number;
  dPrep: number;
  rDay: number;
  sMep: number;
  mSub: number;
  fFixed: number;
}

export interface CalculationResult {
  productSubtotal: number;
  prepSubtotal: number;
  mepManagedSubtotal: number;
  fixedOverhead: number;
  totalTurnkeyInvestment: number;
}

export interface B2CProposalPayload {
  clientName: string;
  projectSummary: string;
  totalTurnkeyInvestment: number;
  includedScopeOfWork: string[];
  projectedTimelineDays: number;
  legalExclusions: string[];
}

// ============================================================================
// 2. OPERATOR HEURISTICS & LOOKUP TABLES
// Decoupled variables for high-autonomy adjustments.
// ============================================================================

const MASTER_CARPENTER_DAY_RATE = 950.0;
const BASE_FIXED_OVERHEAD = 1500.0;
const SUBCONTRACTOR_MARKUP = 0.2; // 20%
const HAMILTON_COUNTY_CORRIDOR = ["46032", "46033", "46060", "46062", "46077"];
const OUT_OF_NETWORK_SURCHARGE = 450.0; // Fuel/travel offset

const MATERIAL_AND_LABOR_RATES: Record<
  string,
  { mUnit: number; lUnit: number }
> = {
  designer_painted: { mUnit: 220, lUnit: 120 },
  stain_grade_hardwood: { mUnit: 350, lUnit: 180 },
  ultra_custom_walnut_oak: { mUnit: 550, lUnit: 280 },
};

const ROOM_PREP_DAYS: Record<string, number> = {
  turnkey_ready: 1.0,
  minor_prep_needed: 3.0,
  gut_and_reframe: 6.0,
};

const MEP_ALLOWANCES = {
  electrical: 1800.0,
  plumbing: 2200.0,
};

// ============================================================================
// 3. DETERMINISTIC ENGINE
// Executes the decoupled financial algorithm.
// ============================================================================

export function generateTurnkeyProposal(
  input: HomeownerInputPayload,
  clientIdentifier: string = "Valued Client",
): B2CProposalPayload {
  // STEP A: Resolve Parametric Variables
  const rates = MATERIAL_AND_LABOR_RATES[input.materialTier];
  const dPrep = ROOM_PREP_DAYS[input.roomCondition];

  let sMep = 0;
  if (input.mepRequired.electricalModifications)
    sMep += MEP_ALLOWANCES.electrical;
  if (input.mepRequired.plumbingModifications) sMep += MEP_ALLOWANCES.plumbing;

  let fFixed = BASE_FIXED_OVERHEAD;
  if (!HAMILTON_COUNTY_CORRIDOR.includes(input.zipCode)) {
    fFixed += OUT_OF_NETWORK_SURCHARGE;
  }

  const params: ResolvedParametricVariables = {
    mUnit: rates.mUnit,
    lUnit: rates.lUnit,
    dPrep: dPrep,
    rDay: MASTER_CARPENTER_DAY_RATE,
    sMep: sMep,
    mSub: SUBCONTRACTOR_MARKUP,
    fFixed: fFixed,
  };

  // STEP B: Execute Financial Algorithm
  // C_total = [LF * (M_unit + L_unit)] + (D_prep * R_day) + [S_MEP * (1 + M_sub)] + F_fixed
  const productSubtotal = input.linearFootage * (params.mUnit + params.lUnit);
  const prepSubtotal = params.dPrep * params.rDay;
  const mepManagedSubtotal = params.sMep * (1 + params.mSub);

  const totalTurnkeyInvestment =
    productSubtotal + prepSubtotal + mepManagedSubtotal + params.fFixed;

  // STEP C: Generate Timeline
  // Timeline = Math.ceil(D_prep + (LF / 15)) + 1
  const projectedTimelineDays =
    Math.ceil(params.dPrep + input.linearFootage / 15) + 1;

  // STEP D: Construct Value-Backed Scope Array
  const includedScopeOfWork: string[] = [
    "Precision laser-leveling and installation of custom architectural units.",
    "Complete floor-to-ceiling zip-wall dust containment and site protection system.",
    "In-house preparation, wall alignment, and seamless integration of millwork.",
  ];

  if (
    input.mepRequired.electricalModifications ||
    input.mepRequired.plumbingModifications
  ) {
    includedScopeOfWork.push(
      "Turnkey coordination and management of all licensed trade professionals (Electrical/Plumbing).",
    );
  }

  // STEP E: Edge Case Handling & System Guardrails
  const legalExclusions: string[] = [
    "Remediation of existing mold, asbestos, or pest damage concealed behind walls.",
    "Upgrades to existing main electrical panels to support new loads (unless expressly written).",
  ];

  if (input.roomCondition === "gut_and_reframe" && input.linearFootage > 40) {
    legalExclusions.push(
      "Structural modifications to load-bearing walls require independent engineering approval and are quoted under separate contract.",
    );
  }

  // STEP F: Return Zero-Cost Breakdown Payload
  return {
    clientName: clientIdentifier,
    projectSummary: `Custom ${input.projectScope.replace(/_/g, " ")} Installation (${input.linearFootage} LF)`,
    totalTurnkeyInvestment: Math.round(totalTurnkeyInvestment), // Round to nearest dollar for clean presentation
    includedScopeOfWork,
    projectedTimelineDays,
    legalExclusions,
  };
}
