import type { IkigaiPayload } from "@/app/api/analyze/types/request";
import type { IkigaiAnalysisResult } from "@/app/api/analyze/types/response";

// user's answer
// 12 answers of 60+ characters: enough material for a "bonne" coherence
export const buildPayload = (
  overrides: Partial<IkigaiPayload> = {},
): IkigaiPayload => ({
  love: [
    "J'adore réparer des vélos le week-end et comprendre comment chaque pièce fonctionne.",
    "Je perds la notion du temps quand je dessine des plans d'aménagement pour mon appartement.",
    "Cuisiner pour mes amis et voir leur tête quand ils goûtent un plat nouveau me rend heureuse.",
  ],
  talent: [
    "On me demande souvent d'expliquer des choses compliquées avec des mots simples et des schémas.",
    "Je repère vite ce qui cloche dans une organisation et je propose une façon plus fluide de faire.",
    "Je suis patiente avec les débutants, je ne m'agace pas quand il faut répéter plusieurs fois.",
  ],
  needs: [
    "Les gens autour de moi manquent de repères pour réparer au lieu de jeter leurs objets du quotidien.",
    "Beaucoup de petites associations de quartier se noient dans l'organisation de leurs événements.",
    "Les jeunes de mon entourage ne savent pas vers quels métiers manuels se tourner après le lycée.",
  ],
  paid: [
    "On m'a déjà payée pour animer des ateliers de réparation dans une recyclerie de mon quartier.",
    "Des amis m'ont rémunérée pour réorganiser l'agencement de leur boutique et leur planning.",
    "Je donne des cours particuliers de maths à deux collégiens chaque semaine depuis un an.",
  ],
  ...overrides,
});

// analyze in Gemini format
// An analysis that triggers no alert in checkAnalysis(analysis, buildPayload()):
// each test overrides one field to break one rule
export const buildAnalysis = (
  overrides: Partial<IkigaiAnalysisResult> = {},
): IkigaiAnalysisResult => ({
  signature:
    "Vous comprenez une chose en la démontant, puis vous aimez la rendre simple pour les autres.",
  summary: {
    profile:
      "Le week-end, vous ouvrez des vélos pour voir chaque pièce bouger. Les mêmes gestes reviennent quand vous dessinez un plan d'appartement ou réorganisez une boutique. Vous transmettez ensuite ce savoir avec patience, en atelier comme en cours. La cuisine pour vos amis ouvre une autre porte, celle du plaisir partagé. Tout cela dit une envie de rendre le monde réparable.",
    key_strengths: [
      "Expliquer simplement",
      "Repérer ce qui bloque",
      "Patience avec les débutants",
    ],
    motivations: [
      "Comprendre comment les choses marchent",
      "Transmettre un savoir pratique",
      "Voir un objet revivre",
    ],
    work_environment: [
      "Atelier ouvert au public",
      "Petite équipe de quartier",
      "Rythme qui laisse expliquer",
    ],
  },
  analysis: {
    insights: [
      {
        pillars: ["love", "talent"],
        text: "Démonter un vélo et expliquer un schéma relèvent du même geste : rendre visible ce qui est caché.",
      },
      {
        pillars: ["needs", "paid"],
        text: "Les ateliers de la recyclerie répondent déjà au manque de repères autour de la réparation.",
      },
      {
        pillars: ["talent", "needs", "paid"],
        text: "La patience avec les débutants trouve sa place auprès des jeunes qui cherchent un métier manuel.",
      },
    ],
    tensions: [
      "Le goût du concret peut s'user dans un poste trop administratif.",
    ],
  },
  // Scores 10 points apart, each job with a 15+ point spread between its pillars
  jobs: [
    {
      title: "Animatrice d'atelier de réparation",
      description:
        "Accueillir le public dans un atelier et l'aider à réparer ses objets.",
      match_reason:
        "Vous animez déjà des ateliers payés en recyclerie et vous aimez démonter pour comprendre.",
      score: 85,
      ikigai_scores: { love: 90, talent: 85, needs: 80, paid: 75 },
    },
    {
      title: "Formatrice en métiers manuels",
      description:
        "Former des jeunes ou des adultes aux gestes de base d'un métier manuel.",
      match_reason:
        "Votre patience avec les débutants rejoint le besoin des jeunes qui hésitent après le lycée.",
      score: 75,
      ikigai_scores: { love: 70, talent: 85, needs: 80, paid: 65 },
    },
    {
      title: "Consultante en organisation associative",
      description:
        "Aider les associations à structurer leurs événements et leur planning.",
      match_reason:
        "Vous repérez vite ce qui bloque, et les associations du quartier manquent justement de méthode.",
      score: 65,
      ikigai_scores: { love: 55, talent: 75, needs: 70, paid: 60 },
    },
  ],
  recommendations: {
    actions: [
      "Proposer un atelier mensuel à la recyclerie",
      "Rencontrer un formateur en lycée professionnel",
      "Aider une association à préparer son prochain événement",
    ],
    warning:
      "Garder du temps pour bricoler, sinon l'envie de transmettre risque de s'épuiser.",
  },
  tags: {
    love: ["réparation", "dessin de plans", "cuisine partagée", "mécanique"],
    talent: ["pédagogie", "patience", "organisation", "vulgarisation"],
    needs: ["réemploi", "vie associative", "orientation", "transmission"],
    paid: ["ateliers", "recyclerie", "cours particuliers", "agencement"],
  },
  // "bonne" requires a confidence between 75 and 85
  coherence: {
    level: "bonne",
    signals: [
      "réponses denses et concrètes",
      "mêmes gestes d'une question à l'autre",
    ],
  },
  confidence: 80,
  ...overrides,
});
