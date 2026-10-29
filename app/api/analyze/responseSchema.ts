import { Type, type Schema } from "@google/genai";

// Les descriptions ne portent que la forme (nombre, longueur, champ obligatoire) et renvoient
// à une section du prompt : le style ne s'écrit qu'à un endroit, sinon les deux divergent.

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
        "Portrait au vouvoiement, 4 à 6 phrases courtes. Règles d'écriture : voir SYNTHÈSE",
    },
    key_strengths: stringList(
      3,
      4,
      "Forces sous-estimées, 2 à 6 mots chacune. Voir SYNTHÈSE",
    ),
    motivations: stringList(3, 4, "Moteurs, 2 à 6 mots chacun. Voir SYNTHÈSE"),
    work_environment: stringList(
      3,
      4,
      "Conditions de travail, 2 à 6 mots chacune. Voir SYNTHÈSE",
    ),
  },
};

const analysis: Schema = {
  type: Type.OBJECT,
  required: ["insights", "tensions"],
  propertyOrdering: ["insights", "tensions"],
  properties: {
    insights: {
      type: Type.ARRAY,
      minItems: "3",
      maxItems: "4",
      items: {
        type: Type.OBJECT,
        required: ["pillars", "text"],
        // pillars d'abord : le modèle choisit le croisement, puis l'écrit
        propertyOrdering: ["pillars", "text"],
        properties: {
          pillars: {
            type: Type.ARRAY,
            description:
              "Clés des piliers que cet insight relie réellement, 2 au minimum, sans doublon",
            minItems: "2",
            maxItems: "4",
            items: { type: Type.STRING, enum: PILLAR_KEYS },
          },
          text: {
            type: Type.STRING,
            description:
              "Un insight, 1 à 2 phrases. Règles d'écriture : voir LECTURE CROISÉE",
          },
        },
      },
    },
    tensions: stringList(
      0,
      3,
      "Tensions, 1 à 2 phrases chacune, tableau vide si aucune. Voir TENSIONS",
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
          "Pourquoi ce métier correspond à la personne. Règles d'écriture : voir MÉTIERS",
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
      "3 pistes. Voir RECOMMANDATIONS",
    ),
    warning: {
      type: Type.STRING,
      description:
        "Un seul point de vigilance, 1 à 2 phrases, toujours renseigné. Voir RECOMMANDATIONS",
    },
  },
};

const signature: Schema = {
  type: Type.STRING,
  description:
    "Une seule phrase, 28 mots au maximum, sans guillemets. Règles d'écriture : voir SIGNATURE",
};

export const COHERENCE_LEVELS = ["faible", "moyenne", "bonne", "forte"];

// Constats imposés : des faits sur la matière reçue, jamais un jugement sur la personne
export const COHERENCE_SIGNALS = [
  "réponses denses et détaillées",
  "réponses courtes ou expédiées",
  "exemples concrets nombreux",
  "peu d'exemples concrets",
  "formulations générales plus que situées",
  "piliers inégalement renseignés",
  "plusieurs questions laissées de côté",
  "réponses cohérentes entre elles",
  "contradictions relevées entre piliers",
  "expérience professionnelle encore limitée",
];

const coherence: Schema = {
  type: Type.OBJECT,
  required: ["signals", "level"],
  propertyOrdering: ["signals", "level"],
  properties: {
    signals: {
      type: Type.ARRAY,
      description:
        "2 à 3 constats sur la matière reçue, pris dans la liste, du plus déterminant au moins déterminant",
      minItems: "2",
      maxItems: "3",
      items: { type: Type.STRING, enum: COHERENCE_SIGNALS },
    },
    level: {
      type: Type.STRING,
      enum: COHERENCE_LEVELS,
      description: "Niveau déduit des constats, avant d'en tirer le pourcentage",
    },
  },
};

// Miroir runtime de IkigaiAnalysisResult, à garder synchronisé avec lui.
export const ikigaiResponseSchema: Schema = {
  type: Type.OBJECT,
  required: [
    "tags",
    "analysis",
    "signature",
    "summary",
    "jobs",
    "recommendations",
    "coherence",
    "confidence",
  ],
  // propertyOrdering pilote l'ordre de génération : les tags d'abord, ils servent de
  // base au matching métier.
  propertyOrdering: [
    "tags",
    "analysis",
    "signature",
    "summary",
    "jobs",
    "recommendations",
    "coherence",
    "confidence",
  ],
  properties: {
    tags: perPillar(
      stringList(4, 5, "4 à 5 tags de 1 à 3 mots, en minuscules, non redondants"),
    ),
    analysis,
    signature,
    summary,
    jobs,
    recommendations,
    coherence,
    confidence: {
      type: Type.INTEGER,
      minimum: 40,
      maximum: 95,
      description:
        "Fiabilité de l'analyse en pourcentage, multiple de 5, déduit du niveau. Voir COHÉRENCE ET CONFIANCE",
    },
  },
};