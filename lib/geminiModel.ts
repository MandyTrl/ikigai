// Séparé de gemini.ts : les composants client affichent ce nom sans embarquer le SDK

// Ordre de repli sur quota atteint (429) ou surcharge (503) : chaque modèle a son propre
// quota gratuit, 20 requêtes par jour
export const GEMINI_MODELS = ["gemini-3.8-flash", "gemini-3.6-flash"] as const;

export type GeminiModel = (typeof GEMINI_MODELS)[number];

export const GEMINI_MODEL: GeminiModel = GEMINI_MODELS[0];

// Une analyse mise en cache avant qu'on y note le modèle vient forcément de celui-ci
export const LEGACY_GEMINI_MODEL = "gemini-2.5-flash";
