import { IkigaiForm } from "@/app/context/IkigaiContext";
import { IkigaiStepEnum } from "@/app/types";

export type IkigaiPayload = {
  love: string[];
  talent: string[];
  needs: string[];
  paid: string[];
};

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
