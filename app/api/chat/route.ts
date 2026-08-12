import { NextResponse } from "next/server";
import OpenAI from "openai";
import {
  generateInvestmentTier,
  EstimatorInputs,
} from "@/lib/estimatingEngine";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MODEL_VERSION = process.env.DRAFT_SCOPE_MODEL || "gpt-4o-mini";

// THE ABSTRACTION LAYER: Front-of-House Designer & Back-of-House PM
const SYSTEM_INSTRUCTION = `
You operate in two distinct cognitive phases for BSC Residential LLC, a high-end custom carpentry firm.

PHASE 1: THE DESIGN CONSULTANT (Client-Facing)
When conversing with the user, act as an elite architectural design consultant. Validate their aesthetic vision, accommodate their ideas, and gently expand their concepts using luxury design trends. DO NOT output JSON in your conversational replies.

PHASE 2: THE PROJECT MANAGER (System-Facing)
Once you have gathered enough structural context (typically 2-4 exchanges), you must explicitly ask: "Shall I compile these concepts into your preliminary project dossier?"
If the client explicitly agrees, execute the 'generate_project_dossier' tool. You must extrapolate the client's abstract vision into four highly clinical, structural phases, and estimate the linear footage, material tier, and room condition based on the scope of the chat.
`;

const tools = [
  {
    type: "function" as const,
    function: {
      name: "generate_project_dossier",
      description:
        "Executes when the client agrees to finalize the consultation. Compiles the vision into a phased, structural scope of work.",
      parameters: {
        type: "object",
        properties: {
          projectTitle: { type: "string" },
          assumedScope: { type: "string" },
          projectPhases: {
            type: "array",
            items: {
              type: "object",
              properties: {
                phaseName: { type: "string" },
                description: { type: "string" },
              },
              required: ["phaseName", "description"],
            },
          },
          linearFootage: {
            type: "number",
            description: "Estimated linear footage of the work area.",
          },
          materialTier: {
            type: "string",
            enum: ["Standard", "Premium", "Ultra-Custom"],
          },
          roomCondition: {
            type: "string",
            enum: ["Turnkey", "Minor Prep Needed", "Gut and Reframe"],
          },
        },
        required: [
          "projectTitle",
          "assumedScope",
          "projectPhases",
          "linearFootage",
          "materialTier",
          "roomCondition",
        ],
      },
    },
  },
];

export async function POST(request: Request) {
  try {
    console.log("[DIAGNOSTIC PROBE] 1. Request Received. Parsing payload...");
    const { messages } = await request.json();

    console.log(
      "[DIAGNOSTIC PROBE] 2. Transmitting to OpenAI (Computation Only)...",
    );
    const response = await openai.chat.completions.create({
      model: MODEL_VERSION,
      messages: [{ role: "system", content: SYSTEM_INSTRUCTION }, ...messages],
      tools: tools,
      tool_choice: "auto",
    });

    const responseMessage = response.choices[0].message;
    console.log("[DIAGNOSTIC PROBE] 3. OpenAI Response Received.");

    if (responseMessage?.tool_calls) {
      const toolCall = responseMessage.tool_calls.find(
        (tool) =>
          tool.type === "function" &&
          tool.function.name === "generate_project_dossier",
      );

      if (toolCall && toolCall.type === "function") {
        console.log(
          "[DIAGNOSTIC PROBE] 4. Executing Dossier Generation Logic...",
        );
        const rawData = JSON.parse(toolCall.function.arguments);

        const investmentData = generateInvestmentTier({
          linearFootage: rawData.linearFootage,
          materialTier: rawData.materialTier as EstimatorInputs["materialTier"],
          roomCondition:
            rawData.roomCondition as EstimatorInputs["roomCondition"],
        });

        console.log(
          "[DIAGNOSTIC PROBE] 5. Math calculated. Shipping volatile payload to UI.",
        );
        return NextResponse.json(
          {
            type: "dossier_generated",
            message:
              "Project parameters compiled. Transitioning to formal dossier.",
            data: {
              projectTitle: rawData.projectTitle,
              assumedScope: rawData.assumedScope,
              projectPhases: rawData.projectPhases,
              investmentRange: {
                floor: investmentData.formattedFloor,
                ceiling: investmentData.formattedCeiling,
              },
              // The frontend needs the raw integers to execute the database write later
              rawInvestment: {
                floor: investmentData.rawFloor,
                ceiling: investmentData.rawCeiling,
                linearFootage: rawData.linearFootage,
                materialTier: rawData.materialTier,
                roomCondition: rawData.roomCondition,
              },
            },
          },
          { status: 200 },
        );
      }
    }

    console.log(
      "[DIAGNOSTIC PROBE] 4. Standard chat response. Shipping payload to UI.",
    );
    return NextResponse.json(
      {
        type: "chat_response",
        message:
          responseMessage.content || "Processing structural variables...",
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("[BACKEND FAULT]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
