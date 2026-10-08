import { IkigaiStepEnum } from "@/app/types";
import { ikigaiMainstay } from "@/app/utils/datas/ikigaiMainstay";
import { IkigaiScores } from "@/app/api/analyze/types/response";

export type PillarKey = "love" | "talent" | "needs" | "paid";

export type PillarMeta = {
  kanji: string;
  accent: string;
  label: string;
};

const KEY_TO_STEP: Record<PillarKey, IkigaiStepEnum> = {
  love: IkigaiStepEnum.LOVE,
  talent: IkigaiStepEnum.TALENT,
  needs: IkigaiStepEnum.NEEDS,
  paid: IkigaiStepEnum.PAID,
};

const LABELS: Record<PillarKey, string> = {
  love: "passion",
  talent: "talent",
  needs: "utilité",
  paid: "vocation",
};

export const PILLAR_ORDER: PillarKey[] = ["love", "talent", "needs", "paid"];

export const PILLARS: Record<PillarKey, PillarMeta> = Object.fromEntries(
  PILLAR_ORDER.map((key) => {
    const source = ikigaiMainstay.find((m) => m.mainstay === KEY_TO_STEP[key])!;
    return [key, { kanji: source.kanji, accent: source.accent, label: LABELS[key] }];
  }),
) as Record<PillarKey, PillarMeta>;

export const getDominantPillar = (scores: IkigaiScores): PillarKey =>
  (Object.entries(scores) as [PillarKey, number][]).reduce((a, b) =>
    b[1] > a[1] ? b : a,
  )[0];
