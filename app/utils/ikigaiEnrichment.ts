type EnrichmentFields = {
  mbti?: string;
  disc?: string;
  currentJob?: string;
  satisfaction?: number;
  age?: number;
};

// Ne garde que les champs facultatifs réellement renseignés (chaînes vides/undefined exclues),
// et trim le texte libre. Partagé par buildIkigaiPayload (payload envoyé) et normalizePayload
// (signature de cache) pour que les deux filtrent exactement de la même façon.
export const pickEnrichmentFields = (
  source?: EnrichmentFields,
): EnrichmentFields => {
  const currentJob = source?.currentJob?.trim();

  return {
    ...(source?.mbti && { mbti: source.mbti }),
    ...(source?.disc && { disc: source.disc }),
    ...(currentJob && { currentJob }),
    ...(source?.satisfaction !== undefined && {
      satisfaction: source.satisfaction,
    }),
    ...(source?.age !== undefined && { age: source.age }),
  };
};
