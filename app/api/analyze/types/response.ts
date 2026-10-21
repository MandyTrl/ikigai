export type IkigaiScores = {
  love: number;
  talent: number;
  needs: number;
  paid: number;
};

export type IkigaiJob = {
  title: string;
  description: string;
  match_reason: string;
  score: number;
  ikigai_scores: IkigaiScores;
};

export type PillarKey = keyof IkigaiScores;

// pillars : les piliers que la phrase relie, dessinés en fils qui se nouent dans la lecture croisée
export type IkigaiInsight = {
  pillars: PillarKey[];
  text: string;
};

export type IkigaiTags = {
  love: string[];
  talent: string[];
  needs: string[];
  paid: string[];
};

export type CoherenceLevel = "faible" | "moyenne" | "bonne" | "forte";

export type IkigaiCoherence = {
  level: CoherenceLevel;
  signals: string[];
};

export type IkigaiAnalysisResult = {
  signature: string;
  summary: {
    profile: string;
    key_strengths: string[];
    motivations: string[];
    work_environment: string[];
  };
  analysis: {
    insights: IkigaiInsight[];
    tensions: string[];
  };
  jobs: IkigaiJob[];
  recommendations: {
    actions: string[];
    warning: string;
  };
  tags: IkigaiTags;
  coherence: IkigaiCoherence;
  confidence: number;
};
