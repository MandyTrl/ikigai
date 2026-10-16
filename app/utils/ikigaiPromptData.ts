import type { IkigaiPayload } from "@/app/api/analyze/types/request";
import { IkigaiStepEnum } from "@/app/types";
import { ikigaiMainstay } from "./datas/ikigaiMainstay";
import { mbtiTypes } from "./datas/mbtiTypes";
import { discProfiles } from "./datas/discProfiles";

type PillarKey = "love" | "talent" | "needs" | "paid";

const PILLAR_ORDER: { key: PillarKey; step: IkigaiStepEnum }[] = [
  { key: "love", step: IkigaiStepEnum.LOVE },
  { key: "talent", step: IkigaiStepEnum.TALENT },
  { key: "needs", step: IkigaiStepEnum.NEEDS },
  { key: "paid", step: IkigaiStepEnum.PAID },
];

const buildPillarBlock = (
  { key, step }: { key: PillarKey; step: IkigaiStepEnum },
  payload: IkigaiPayload,
) => {
  const pillar = ikigaiMainstay.find((entry) => entry.mainstay === step);

  if (!pillar) return "";

  const answers = payload[key] ?? [];

  const exchanges = pillar.instructions.map((instruction, index) => {
    const answer = answers[index]?.trim();

    return `Q${index + 1}. ${instruction.question}\nR${index + 1}. ${answer || "(non renseignée)"}`;
  });

  return [`[${key.toUpperCase()}] ${pillar.title}`, ...exchanges].join("\n\n");
};

const buildProfileBlock = (enrichment: IkigaiPayload["enrichment"]) => {
  if (!enrichment) return "";

  const mbti = mbtiTypes.find((type) => type.value === enrichment.mbti)?.label;
  const disc = discProfiles.find(
    (profile) => profile.id === enrichment.disc,
  )?.label;

  const lines = [
    enrichment.mbti && `type MBTI : ${mbti ?? enrichment.mbti}`,
    enrichment.disc &&
      `profil comportemental DISC : ${disc ?? enrichment.disc}`,
    enrichment.currentJob && `poste actuel : ${enrichment.currentJob}`,
    enrichment.satisfaction !== undefined &&
      `satisfaction dans le poste actuel : ${enrichment.satisfaction}/10`,
    enrichment.age !== undefined && `âge : ${enrichment.age} ans`,
  ].filter(Boolean);

  if (lines.length === 0) return "";

  return ["[PROFIL COMPLÉMENTAIRE]", ...lines].join("\n");
};

export const buildUserDataBlock = (payload: IkigaiPayload) => {
  const pillars = PILLAR_ORDER.map((pillar) =>
    buildPillarBlock(pillar, payload),
  );

  return [...pillars, buildProfileBlock(payload.enrichment)]
    .filter(Boolean)
    .join("\n\n---\n\n");
};
