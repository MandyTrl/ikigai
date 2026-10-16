import { Type, type Schema } from "@google/genai";

const PILLAR_KEYS = ["love", "talent", "needs", "paid"];

// L'UI rend les ScoreBar dans l'ordre des clés renvoyées : propertyOrdering le fixe.
const perPillar = (item: Schema): Schema => ({
  type: Type.OBJECT,
  required: PILLAR_KEYS,
  propertyOrdering: PILLAR_KEYS,
  properties: Object.fromEntries(PILLAR_KEYS.map((key) => [key, item])),
});

const stringList = (
  minItems: number,
  maxItems: number,
  description: string,
): Schema => ({
  type: Type.ARRAY,
  description,
  minItems: String(minItems),
  maxItems: String(maxItems),
  items: { type: Type.STRING },
});

const pillarScore: Schema = {
  type: Type.INTEGER,
  minimum: 0,
  maximum: 100,
  description:
    "Correspondance entre le métier et les réponses de ce pilier, multiple de 5",
};

const summary: Schema = {
  type: Type.OBJECT,
  required: ["profile", "key_strengths", "motivations", "work_environment"],
  propertyOrdering: [
    "profile",
    "key_strengths",
    "motivations",
    "work_environment",
  ],
  properties: {
    profile: {
      type: Type.STRING,
      description:
        "Portrait au vouvoiement, 3 à 5 phrases, chaleureux mais simple et factuel. La première phrase nomme le fil rouge dans les mots de la personne, citable telle quelle, et ne doit pas pouvoir s'appliquer à quelqu'un d'autre. Aucune ouverture générique du type « vous êtes quelqu'un qui »",
    },
    key_strengths: stringList(
      3,
      4,
      "Ce que la personne sous-estime, en compétence transférable, 2 à 6 mots",
    ),
    motivations: stringList(3, 4, "Le moteur, pas le goût, 2 à 6 mots"),
    work_environment: stringList(
      3,
      4,
      "Conditions dans lesquelles cette personne fonctionne bien, assez précises pour ne pas valoir pour tout le monde",
    ),
  },
};

const analysis: Schema = {
  type: Type.OBJECT,
  required: ["insights", "tensions"],
  propertyOrdering: ["insights", "tensions"],
  properties: {
    insights: stringList(
      3,
      4,
      "Ce qui se tient dans les réponses, 1 à 2 phrases, croise au moins 2 piliers, sans nommer de métier ni donner de conseil. Dit quelque chose que la personne n'a pas formulé elle-même",
    ),
    tensions: stringList(
      0,
      3,
      "Ce qui tire dans deux sens, 1 à 2 phrases, jamais un insight déguisé. Tableau vide si aucune",
    ),
  },
};

const jobs: Schema = {
  type: Type.ARRAY,
  minItems: "3",
  maxItems: "3",
  description: "3 métiers classés par score décroissant",
  items: {
    type: Type.OBJECT,
    required: [
      "title",
      "description",
      "match_reason",
      "ikigai_scores",
      "score",
    ],
    // Le score global est généré après le détail par pilier, pour rester cohérent.
    propertyOrdering: [
      "title",
      "description",
      "match_reason",
      "ikigai_scores",
      "score",
    ],
    properties: {
      title: {
        type: Type.STRING,
        description: "Intitulé de métier existant sur le marché francophone",
      },
      description: {
        type: Type.STRING,
        description: "2 à 3 phrases concrètes sur le quotidien du métier",
      },
      match_reason: {
        type: Type.STRING,
        description:
          "Pilier dominant nommé, au moins 2 tags cités, et un écho précis aux réponses. Ne paraphrase ni la description ci-dessus ni les mots de la personne. Ton chaleureux mais factuel : tu montres pourquoi ça colle, tu ne vends pas le métier",
      },
      ikigai_scores: perPillar(pillarScore),
      score: {
        type: Type.INTEGER,
        minimum: 40,
        maximum: 95,
        description:
          "Pertinence globale, multiple de 5, cohérente avec les 4 scores de pilier",
      },
    },
  },
};

const recommendations: Schema = {
  type: Type.OBJECT,
  required: ["actions", "warning"],
  propertyOrdering: ["actions", "warning"],
  properties: {
    actions: stringList(
      3,
      3,
      "3 pistes activables rapidement, de natures différentes, dont une gratuite",
    ),
    warning: {
      type: Type.STRING,
      description:
        "Un seul point de vigilance, 1 à 2 phrases, proportionné à la situation, toujours renseigné. Ton d'un repère posé : ni alarmiste, ni moralisateur, et jamais un reproche sur les réponses données",
    },
  },
};

// Miroir runtime de IkigaiAnalysisResult, à garder synchronisé avec lui.
export const ikigaiResponseSchema: Schema = {
  type: Type.OBJECT,
  required: [
    "tags",
    "analysis",
    "summary",
    "jobs",
    "recommendations",
    "confidence",
  ],
  // propertyOrdering pilote l'ordre de génération : les tags d'abord, ils servent de
  // base au matching métier.
  propertyOrdering: [
    "tags",
    "analysis",
    "summary",
    "jobs",
    "recommendations",
    "confidence",
  ],
  properties: {
    tags: perPillar(
      stringList(5, 8, "5 à 8 tags de 1 à 3 mots, en minuscules, non redondants"),
    ),
    analysis,
    summary,
    jobs,
    recommendations,
    confidence: {
      type: Type.INTEGER,
      minimum: 40,
      maximum: 95,
      description:
        "Fiabilité de l'analyse en pourcentage, multiple de 5. Mesure la cohérence de ce qui a été dit, jamais la maturité professionnelle",
    },
  },
};