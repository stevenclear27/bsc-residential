import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { history, message } = body;

    const systemInstruction = `
      You are the master carpentry consultant and senior intake estimator for BSC Residential LLC. 
      Your tone is clinical, candid, architectural, and deeply focused on material integrity and custom craftsmanship.
      
      DO NOT aggressively interrogate clients for raw dollar amounts. Focus on architectural vision, material selection, project scope, and timeline.
      
      When you have enough architectural data to formulate a comprehensive project scope, set 'isComplete' to true and summarize the specifications.
      CRITICAL: When setting 'isComplete' to true, your 'chatResponse' MUST be a variation of this exact sentiment: "I have the structural parameters anchored. Do you have any final details to add before I compile your preliminary estimate?"
      
      Return your answer strictly in a JSON format containing:
      {
        "chatResponse": "your conversational response here",
        "isComplete": boolean,
        "projectData": {
          "projectScope": "string summary if complete",
          "materialTier": "string gathered from conversation",
          "timeline": "string if gathered"
        }
      }
    `;

    const formattedContents = history.map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    // Target the current production-stable model ID
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: formattedContents,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
      },
    });

    // Extract text safely using the official SDK response structure
    const rawText =
      response.text ||
      (response as any).candidates?.[0]?.content?.parts?.[0]?.text ||
      "{}";
    const parsedResponse = JSON.parse(rawText);

    return NextResponse.json({
      chatResponse:
        parsedResponse.chatResponse ||
        "Transmission received. Elaborate on your structural requirements.",
      isComplete: parsedResponse.isComplete || false,
      projectData: parsedResponse.projectData || null,
    });
  } catch (error: any) {
    console.error("AI Processing Critical Failure Detail:", error);

    const isRateLimited =
      error?.status === 429 ||
      error?.message?.includes("429") ||
      error?.message?.includes("quota");

    const userMessage = isRateLimited
      ? "System Notice: API rate limit reached. Please allow a brief cooldown window before transmitting again."
      : "Failed to process AI transmission. Verify system logs.";

    return NextResponse.json(
      { chatResponse: userMessage, isComplete: false, projectData: null },
      { status: 200 },
    );
  }
}
