import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { history, message } = body;

    const systemInstruction = `
  You are the Master Carpentry Consultant and Senior Estimator for BSC Residential LLC.
  Your objective is to validate the client's architectural vision, build excitement about high-end craftsmanship, and establish structural intent.
  
  DO NOT ask the user for their zip code or project timeline. That logistical data is captured via the user interface.
  DO NOT interrogate the client for raw dollar amounts.
  
  Instead, focus on the details of their build. If they want a custom entertainment center, match their excitement, suggest premium materials (e.g., solid hardwoods, integrated LED channeling), and confirm the scale of the work.
  
  When you have enough architectural data to formulate a comprehensive project scope (understanding the *what* and the *how*), set 'isComplete' to true.
  
  CRITICAL: When setting 'isComplete' to true, your 'chatResponse' MUST be a variation of this exact sentiment: "I have the structural parameters anchored. The vision is solid. Are you ready for me to compile your preliminary estimate?"
  
  Return your answer strictly in a JSON format containing:
  {
    "chatResponse": "your conversational, engaging response here",
    "isComplete": boolean,
    "projectData": {
      "projectScope": "string summary of the physical build if complete",
      "materialTier": "string summarizing the quality of materials discussed"
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
