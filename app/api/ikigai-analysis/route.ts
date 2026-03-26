import { NextResponse } from "next/server";
import { gemini } from "@/lib/gemini";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const prompt = `
Tu es un coach d'orientation bienveillant et structuré.
Analyse les réponses suivantes liées à l'ikigai.
Réponds uniquement en JSON valide.

Données utilisateur :
${JSON.stringify(body, null, 2)}
`;

    const response = await gemini.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text;

    return NextResponse.json({
      success: true,
      data: text,
    });
  } catch (error) {
    console.error("Gemini error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate ikigai analysis",
      },
      { status: 500 },
    );
  }
}
