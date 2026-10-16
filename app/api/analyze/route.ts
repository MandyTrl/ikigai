import { NextResponse } from "next/server";
import { getGemini } from "@/lib/gemini";
import { ikigaiPrompt } from "@/app/utils/ikigaiPrompt";
import { ikigaiResponseSchema } from "./responseSchema";
import {
  cleanJsonString,
  isCompleteIkigaiPayload,
  isValidIkigaiPayload,
} from "./utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!isValidIkigaiPayload(body)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid payload",
        },
        { status: 400 },
      );
    }

    if (!isCompleteIkigaiPayload(body)) {
      return NextResponse.json(
        {
          success: false,
          error: "Incomplete payload",
        },
        { status: 400 },
      );
    }

    const prompt = ikigaiPrompt(body);

    const gemini = getGemini();
    const response = await gemini.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0.8,
        responseMimeType: "application/json",
        responseSchema: ikigaiResponseSchema,
      },
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
