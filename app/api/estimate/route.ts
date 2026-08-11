// /src/app/api/estimate/route.ts
import { NextResponse } from "next/server";
import {
  generateTurnkeyProposal,
  HomeownerInputPayload,
} from "@/lib/pricing/estimator";

export async function POST(request: Request) {
  try {
    // 1. INGESTION: Parse the incoming JSON payload from the frontend Chatbot
    const body = await request.json();

    // 2. CONTRACT ENFORCEMENT: Cast the incoming data to your strict TypeScript interface
    const payload = body as HomeownerInputPayload;

    // 3. STRUCTURAL VERIFICATION: Ensure the AI did not drop critical variables
    if (
      !payload.projectScope ||
      !payload.linearFootage ||
      !payload.materialTier ||
      !payload.roomCondition ||
      !payload.mepRequired ||
      !payload.zipCode
    ) {
      return NextResponse.json(
        {
          error:
            "System Error: Missing required parametric variables in payload.",
        },
        { status: 400 }, // Bad Request
      );
    }

    // 4. EXECUTION: Pass the verified payload into your decoupled deterministic engine
    // We do not await this function because it executes synchronously on the server.
    const proposalDossier = generateTurnkeyProposal(payload);

    // 5. RESPONSE: Transmit the B2C Turnkey Proposal back to the client interface
    return NextResponse.json(proposalDossier, { status: 200 }); // OK
  } catch (error) {
    // 6. FALLBACK: Catch any runtime parsing errors to prevent the server from crashing
    console.error("Estimating Engine Failure:", error);
    return NextResponse.json(
      { error: "Internal Server Error: Failed to generate turnkey proposal." },
      { status: 500 },
    );
  }
}
