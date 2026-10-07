import { GoogleGenAI } from "@google/genai";

let client: GoogleGenAI | null = null;

export const getGemini = () => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY environment variable");
  }

  client ??= new GoogleGenAI({ apiKey });
  return client;
};
