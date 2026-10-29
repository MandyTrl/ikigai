import { NextResponse } from "next/server";
import { ThinkingLevel } from "@google/genai";
import { getGemini } from "@/lib/gemini";
import { GEMINI_MODELS } from "@/lib/geminiModel";
import { ikigaiPrompt } from "@/app/utils/ikigaiPrompt";
import { ikigaiResponseSchema } from "./responseSchema";
import {
  cleanJsonString,
  isCompleteIkigaiPayload,
  isValidIkigaiPayload,
} from "./utils";

const getErrorStatus = (error: unknown) => (error as { status?: number })?.status;

// Seuls le quota atteint et la surcharge sont propres à un modèle : toute autre erreur
// échouerait de la même façon sur le suivant
const isModelUnavailable = (error: unknown) => {
  const status = getErrorStatus(error);
  return status === 429 || status === 503;
};

const generateWithFallback = async (prompt: string) => {
  const gemini = getGemini();
  let lastError: unknown;

  for (const model of GEMINI_MODELS) {
    try {
      const response = await gemini.models.generateContent({
        model,
        contents: prompt,
        config: {
          // « high » par défaut sur Gemini 3 : près de 5 min par analyse
          thinkingConfig: { thinkingLevel: ThinkingLevel.MEDIUM },
          responseMimeType: "application/json",
          responseSchema: ikigaiResponseSchema,
        },
      });

      return { response, model };
    } catch (error) {
      if (!isModelUnavailable(error)) throw error;
      lastError = error;
    }
  }

  throw lastError;
};

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

    const { response, model } = await generateWithFallback(prompt);

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
      model,
    });
  } catch (error) {
    console.error("Gemini analyze route error:", error);

    // 429 quota épuisé et 503 surcharge n'appellent pas la même réponse qu'une vraie panne  le client peut proposer de réessayer, et le harnais de fixtures sait ne pas insister.
    const status = getErrorStatus(error);

    if (status === 429 || status === 503) {
      return NextResponse.json(
        {
          success: false,
          error:
            status === 429
              ? "Quota Gemini atteint"
              : "Gemini momentanément surchargé",
        },
        { status },
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate ikigai analysis",
      },
      { status: 500 },
    );
  }
}
