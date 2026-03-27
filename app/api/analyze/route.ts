import { NextResponse } from "next/server";
import { gemini } from "@/lib/gemini";
import { ikigaiPrompt } from "@/app/utils/ikigaiPrompt";
import { cleanJsonString, isValidPayload } from "./utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!isValidPayload(body)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid payload",
        },
        { status: 400 },
      );
    }

    const prompt = ikigaiPrompt(body);

    const response = await gemini.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text;

    if (!text) {
      return NextResponse.json(
        {
          success: false,
          error: "Empty response from Gemini",
        },
        { status: 502 },
      );
    }

    const cleanedText = cleanJsonString(text);
    let parsedResponse = undefined;

    try {
      parsedResponse = JSON.parse(cleanedText);
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid JSON returned by Gemini",
          raw: text,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      data: parsedResponse,
    });
  } catch (error) {
    console.error("Gemini analyze route error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate ikigai analysis",
      },
      { status: 500 },
    );
  }
}
