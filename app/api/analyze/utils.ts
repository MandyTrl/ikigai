import { IkigaiPayload } from "@/app/utils/buildIkigaiPayload";

export const isValidPayload = (body: unknown): body is IkigaiPayload => {
  if (!body || typeof body !== "object") return false;

  const payload = body as IkigaiPayload;

  return (
    Array.isArray(payload.love) &&
    Array.isArray(payload.talent) &&
    Array.isArray(payload.needs) &&
    Array.isArray(payload.paid)
  );
};

export const cleanJsonString = (value: string) => {
  return value
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();
};
