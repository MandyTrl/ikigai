export type IkigaiEnrichmentPayload = {
  mbti?: string;
  disc?: string;
  currentJob?: string;
  satisfaction?: number;
  age?: number;
};

export type IkigaiPayload = {
  love: string[];
  talent: string[];
  needs: string[];
  paid: string[];
  enrichment?: IkigaiEnrichmentPayload;
};
