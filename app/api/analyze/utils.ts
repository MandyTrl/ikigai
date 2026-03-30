import { IkigaiForm } from "@/app/context/IkigaiContext";
import { IkigaiStepEnum } from "@/app/types";
import { IkigaiPayload } from "./types/request";

export const isValidIkigaiPayload = (body: unknown): body is IkigaiPayload => {
  if (!body || typeof body !== "object") return false;

  const payload = body as IkigaiPayload;

  return (
    Array.isArray(payload.love) &&
    Array.isArray(payload.talent) &&
    Array.isArray(payload.needs) &&
    Array.isArray(payload.paid) &&
    payload.love.every((item) => typeof item === "string") &&
    payload.talent.every((item) => typeof item === "string") &&
    payload.needs.every((item) => typeof item === "string") &&
    payload.paid.every((item) => typeof item === "string")
  );
};

// mapper pour l'envoi au LLM
export const buildIkigaiPayload = (form: IkigaiForm[]): IkigaiPayload => {
  return {
    love:
      form.find((pillar) => pillar.mainstay === IkigaiStepEnum.LOVE)?.answers ??
      [],
    talent:
      form.find((pillar) => pillar.mainstay === IkigaiStepEnum.TALENT)
        ?.answers ?? [],
    needs:
      form.find((pillar) => pillar.mainstay === IkigaiStepEnum.NEEDS)
        ?.answers ?? [],
    paid:
      form.find((pillar) => pillar.mainstay === IkigaiStepEnum.PAID)?.answers ??
      [],
  };
};

export const cleanJsonString = (value: string) => {
  return value
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();
};

const ANALYSIS_STORAGE_KEY = "ikigai-analysis-cache";

export const normalizePayload = (payload: IkigaiPayload): IkigaiPayload => {
  const normalizeArray = (values: string[]) =>
    values.map((value) => value.trim()).filter(Boolean);

  return {
    love: normalizeArray(payload.love),
    talent: normalizeArray(payload.talent),
    needs: normalizeArray(payload.needs),
    paid: normalizeArray(payload.paid),
  };
};

export const getPayloadSignature = (payload: IkigaiPayload) => {
  return JSON.stringify(normalizePayload(payload));
};

export type AnalysisCache = {
  signature: string;
  result: unknown;
};

export const saveAnalysisCache = (signature: string, result: unknown) => {
  const cache: AnalysisCache = { signature, result };
  sessionStorage.setItem(ANALYSIS_STORAGE_KEY, JSON.stringify(cache));
};

export const getAnalysisCache = (): AnalysisCache | null => {
  const raw = sessionStorage.getItem(ANALYSIS_STORAGE_KEY);

  if (!raw) return null;

  try {
    return JSON.parse(raw) as AnalysisCache;
  } catch {
    return null;
  }
};
