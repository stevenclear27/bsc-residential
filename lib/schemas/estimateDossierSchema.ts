import * as z from "zod";

/**
 * Strict Data Contract for the Final Project Dossier Handoff.
 * Guarantees compiler-level verification before Supabase write or Stripe checkout.
 */
export const estimateDossierSchema = z.object({
  // Contact & Location
  clientName: z.string().min(2, "Full name is required."),
  clientEmail: z.string().email("Valid email address is required."),
  clientPhone: z.string().min(10, "Valid contact number is required."),
  zipCode: z.string().regex(/^\d{5}$/, "Must be a valid 5-digit zip code."),

  // AI-Gathered Scope Parameters
  timeline: z.string().min(1, "Timeline selection required."),
  budgetTier: z.string().min(1, "Budget allocation required."),
  scopeOfWork: z.string().min(20, "Project scope description must be defined."),

  // Multimodal Visual Assets (Optional base64 payload strings)
  beforeImage: z.string().optional(),
  afterImage: z.string().optional(),

  // System Auditing
  createdAt: z.string().default(() => new Date().toISOString()),
});

export type EstimateDossier = z.infer<typeof estimateDossierSchema>;
