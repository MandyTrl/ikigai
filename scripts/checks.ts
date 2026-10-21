import type { IkigaiPayload } from "../app/api/analyze/types/request";
import type { IkigaiAnalysisResult } from "../app/api/analyze/types/response";

type AlertKind = "contrat" | "regle" | "vigilance";

export type Alert = { kind: AlertKind; label: string; detail: string };

export const PILLARS = ["love", "talent", "needs", "paid"] as const;

const STOPWORDS = new Set([
  "alors",
  "aussi",
  "autre",
  "autres",
  "avec",
  "avoir",
  "beaucoup",
  "bien",
  "cela",
  "cette",
  "chaque",
  "comme",
  "dans",
  "depuis",
  "deux",
  "dont",
  "elle",
  "elles",
  "encore",
  "entre",
  "etre",
  "faire",
  "fait",
  "leur",
  "leurs",
  "mais",
  "meme",
  "moins",
  "notre",
  "nous",
  "parce",
  "pour",
  "plus",
  "quand",
  "quelque",
  "sans",
  "sont",
  "sous",
  "souvent",
  "tout",
  "toute",
  "toutes",
  "tous",
  "tres",
  "vers",
  "votre",
  "vous",
  "vraiment",
]);

const FORBIDDEN_OPENINGS = [
  "vous etes quelqu'un qui",
  "vous etes une personne",
  "votre profil revele",
  "ce qui vous caracterise",
  "vous avez a coeur de",
  "vous etes anime par",
  "vous etes animee par",
  "vous vous epanouissez",
  "vous trouvez votre epanouissement",
];

const PROCESS_MENTIONS = [
  "d'apres vos reponses",
  "vos reponses",
  "les donnees fournies",
  "formulaire",
  "questionnaire",
];

/** « talent » est aussi un mot français : il n'est signalé qu'en majuscules ou entre parenthèses. */
const PILLAR_LEAKS = [
  /\((?:love|talent|needs|paid)\)/i,
  /\b(?:LOVE|TALENT|NEEDS|PAID)\b/,
  /\ble pilier\b/i,
  /\b(?:[Ll]ove|[Nn]eeds|[Pp]aid)\b/,
];

const VERBATIM_LENGTH = 6;

const QUOTE_MARK = /[«"“]/;

//  Detecte et coupe les pronoms à la 1ère personne dans une citation

const FIRST_PERSON_QUOTE = /[«"“][^»"”]*\b(je|j'|mes|mon|ma|nous)\b/i;

const normalizeSpacing = (value: string) =>
  value.replace(/[’‘`]/g, "'").replace(/\s+/g, " ").trim();

const withoutAccents = (value: string) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export const meaningfulWords = (value: string): string[] =>
  withoutAccents(normalizeSpacing(value).toLowerCase())
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length > 3 && !STOPWORDS.has(word));

const allWords = (value: string) =>
  withoutAccents(normalizeSpacing(value).toLowerCase())
    .split(/[^a-z0-9']+/)
    .filter(Boolean);

const sequencesOf = (words: string[], size: number) =>
  words
    .slice(0, Math.max(0, words.length - size + 1))
    .map((_, index) => words.slice(index, index + size).join(" "));

export const sharedWordRatio = (left: string[], right: string[]) => {
  const a = new Set(left);
  const b = new Set(right);

  if (a.size === 0 || b.size === 0) return 0;

  const shared = [...a].filter((word) => b.has(word)).length;
  return shared / (a.size + b.size - shared);
};

export const wordsInCommon = (left: string[], right: string[]) => {
  const b = new Set(right);
  return [...new Set(left)].filter((word) => b.has(word));
};

const firstSentence = (value: string) => {
  const text = normalizeSpacing(value);
  return text.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? text;
};

export const firstWords = (value: string, count = 6) =>
  normalizeSpacing(value).split(" ").slice(0, count).join(" ");

// Les sorties d'avant ANALYSIS_SCHEMA_VERSION 3 ont des insights en texte brut :
// --report-only sur un ancien dossier doit rester lisible.
export const insightTexts = (analysis: IkigaiAnalysisResult): string[] =>
  (analysis.analysis.insights as unknown[]).map((insight) =>
    typeof insight === "string" ? insight : ((insight as { text?: string }).text ?? ""),
  );

const countWords = (value: string) =>
  normalizeSpacing(value).split(" ").filter(Boolean).length;

const proseFields = (analysis: IkigaiAnalysisResult): [string, string][] => [
  ["signature", analysis.signature],
  ["summary.profile", analysis.summary.profile],
  ["recommendations.warning", analysis.recommendations.warning],
  ...insightTexts(analysis).map((insight, index): [string, string] => [
    `insights[${index}]`,
    insight,
  ]),
  ...analysis.jobs.map((job): [string, string] => [
    `${job.title} · match_reason`,
    job.match_reason,
  ]),
];

const listFields = (analysis: IkigaiAnalysisResult): [string, string[]][] => [
  ["summary.key_strengths", analysis.summary.key_strengths],
  ["summary.motivations", analysis.summary.motivations],
  ["summary.work_environment", analysis.summary.work_environment],
  ["recommendations.actions", analysis.recommendations.actions],
  ["analysis.insights", insightTexts(analysis)],
  ["analysis.tensions", analysis.analysis.tensions],
  ...PILLARS.map((pillar): [string, string[]] => [
    `tags.${pillar}`,
    analysis.tags[pillar],
  ]),
];

// Les nombres sont recopiés de responseSchema.ts (3 métiers, 4 à 5 tags…). Si on changes un élément là-bas il faut changer ici, sinon ce contrôle valide une sortie devenue hors contrat.

const checkContract = (analysis: IkigaiAnalysisResult): Alert[] => {
  const { summary, jobs, recommendations, tags } = analysis;

  const expected: [string, number, number, number][] = [
    ["jobs", jobs.length, 3, 3],
    ["coherence.signals", analysis.coherence.signals.length, 2, 3],
    ["recommendations.actions", recommendations.actions.length, 3, 3],
    ["analysis.insights", analysis.analysis.insights.length, 3, 4],
    ["analysis.tensions", analysis.analysis.tensions.length, 0, 3],
    ["summary.key_strengths", summary.key_strengths.length, 3, 4],
    ["summary.motivations", summary.motivations.length, 3, 4],
    ["summary.work_environment", summary.work_environment.length, 3, 4],
    ...PILLARS.map((pillar): [string, number, number, number] => [
      `tags.${pillar}`,
      tags[pillar].length,
      4,
      5,
    ]),
  ];

  const alerts = expected
    .filter(([, count, min, max]) => count < min || count > max)
    .map(([field, count, min, max]): Alert => ({
      kind: "contrat",
      label: `cardinalité ${field}`,
      detail: `${count} élément(s), le schéma en attend ${min === max ? min : `${min} à ${max}`}`,
    }));

  if (!recommendations.warning?.trim()) {
    alerts.push({
      kind: "contrat",
      label: "warning vide",
      detail: "VigilancePoint rendrait un bloc sans texte",
    });
  }

  // MusubiIllustration dessine un nœud par insight entre les fils de ses piliers
  analysis.analysis.insights.forEach((insight, index) => {
    const pillars = Array.isArray(insight?.pillars) ? insight.pillars : [];
    const known = new Set(pillars.filter((p) => (PILLARS as readonly string[]).includes(p)));
    if (known.size < 2 || known.size !== pillars.length) {
      alerts.push({
        kind: "contrat",
        label: `insights[${index}].pillars`,
        detail: `${JSON.stringify(insight?.pillars ?? null)} : 2 à 4 clés de pilier distinctes attendues, sinon le nœud n'a pas de fils`,
      });
    }
  });

  const titles = jobs.map((job) => normalizeSpacing(job.title).toLowerCase());
  if (new Set(titles).size !== titles.length) {
    alerts.push({
      kind: "contrat",
      label: "intitulés de métier en doublon",
      detail:
        "JobCard est monté avec key={job.title} : deux titres identiques cassent le rendu",
    });
  }

  return alerts;
};

// Fourchettes de l'étape 9 du prompt : le pourcentage doit rester dans celle de son niveau
const CONFIDENCE_BANDS: Record<string, [number, number]> = {
  faible: [40, 60],
  moyenne: [65, 70],
  bonne: [75, 85],
  forte: [90, 95],
};

const checkScores = (analysis: IkigaiAnalysisResult): Alert[] => {
  const { jobs, confidence } = analysis;

  const everyScore = [
    ["confidence", confidence] as const,
    ...jobs.flatMap((job) => [
      [`${job.title} · score`, job.score] as const,
      ...PILLARS.map(
        (pillar) =>
          [`${job.title} · ${pillar}`, job.ikigai_scores[pillar]] as const,
      ),
    ]),
  ];

  const alerts: Alert[] = everyScore
    .filter(([, value]) => !Number.isInteger(value) || value % 5 !== 0)
    .map(([field, value]) => ({
      kind: "regle",
      label: "score hors grille",
      detail: `${field} = ${value}, tous les scores doivent être des multiples de 5`,
    }));

  const band = CONFIDENCE_BANDS[analysis.coherence?.level];
  if (band && (confidence < band[0] || confidence > band[1])) {
    alerts.push({
      kind: "regle",
      label: "confiance hors fourchette",
      detail: `niveau ${analysis.coherence?.level} et confidence ${confidence}, la fourchette est ${band[0]} à ${band[1]}`,
    });
  }

  jobs.forEach((job, index) => {
    const values = PILLARS.map((pillar) => job.ikigai_scores[pillar]);
    const spread = Math.max(...values) - Math.min(...values);

    if (spread < 10) {
      alerts.push({
        kind: "regle",
        label: "piliers trop plats",
        detail: `${job.title} : écart de ${spread} points, le pilier dominant doit ressortir de 10 au moins`,
      });
    }

    const next = jobs[index + 1];
    if (next && job.score - next.score < 5) {
      alerts.push({
        kind: "regle",
        label: "métiers trop serrés",
        detail: `${job.title} (${job.score}) et ${next.title} (${next.score}) : 5 points d'écart minimum attendus`,
      });
    }
  });

  return alerts;
};

const checkWriting = (analysis: IkigaiAnalysisResult): Alert[] => {
  const alerts: Alert[] = [];
  const profile = withoutAccents(
    normalizeSpacing(analysis.summary.profile).toLowerCase(),
  );
  const signature = withoutAccents(
    normalizeSpacing(analysis.signature ?? "").toLowerCase(),
  );

  for (const [field, value] of proseFields(analysis)) {
    if (/[—–]/.test(value)) {
      alerts.push({
        kind: "regle",
        label: "tiret cadratin",
        detail: `${field} contient un — ou un –`,
      });
    }

    if (/(\*\*|^#|^[-*] )/m.test(value)) {
      alerts.push({
        kind: "regle",
        label: "markdown dans une valeur",
        detail: `${field} contient du balisage`,
      });
    }

    const mentions = PROCESS_MENTIONS.filter((pattern) =>
      withoutAccents(normalizeSpacing(value).toLowerCase()).includes(pattern),
    );
    if (mentions.length > 0) {
      alerts.push({
        kind: "regle",
        label: "mention du processus",
        detail: `${field} : « ${mentions.join(" », « ")} »`,
      });
    }

    const leaks = PILLAR_LEAKS.map(
      (pattern) => normalizeSpacing(value).match(pattern)?.[0],
    ).filter(Boolean);
    if (leaks.length > 0) {
      alerts.push({
        kind: "regle",
        label: "nom de pilier en clair",
        detail: `${field} : « ${leaks.join(" », « ")} »`,
      });
    }
  }

  const quoting: [string, string][] = [
    ["signature", analysis.signature ?? ""],
    ["summary.profile", analysis.summary.profile],
    ...insightTexts(analysis).map((insight, index): [string, string] => [
      `insights[${index}]`,
      insight,
    ]),
    ...analysis.analysis.tensions.map((tension, index): [string, string] => [
      `tensions[${index}]`,
      tension,
    ]),
  ];

  for (const [field, value] of quoting) {
    if (QUOTE_MARK.test(value)) {
      alerts.push({
        kind: "regle",
        label: "citation hors match_reason",
        detail: `${field} contient des guillemets, le prompt les y interdit`,
      });
    }
  }

  for (const job of analysis.jobs) {
    if (FIRST_PERSON_QUOTE.test(withoutAccents(job.match_reason))) {
      alerts.push({
        kind: "regle",
        label: "citation à la première personne",
        detail: `${job.title} · match_reason cite sans passer au vouvoiement`,
      });
    }
  }

  for (const [field, value] of [
    ["la signature", signature],
    ["le portrait", profile],
  ] as const) {
    const generic = FORBIDDEN_OPENINGS.filter((pattern) =>
      value.includes(pattern),
    );

    if (generic.length > 0) {
      alerts.push({
        kind: "regle",
        label: value.startsWith(generic[0])
          ? "ouverture interdite"
          : "formule passe-partout",
        detail: `${field} contient « ${generic.join(" », « ")} », interchangeable d'un profil à l'autre`,
      });
    }
  }

  const portraitOpening = withoutAccents(
    firstSentence(analysis.summary.profile).toLowerCase(),
  );

  if (/^(vous etes|vous avez|votre |ce qui vous)/.test(portraitOpening)) {
    alerts.push({
      kind: "regle",
      label: "portrait qui caractérise",
      detail:
        "la première phrase doit partir d'un fait décrit par la personne, pas d'un trait de caractère",
    });
  }

  const signatureWords = allWords(analysis.signature ?? "").length;
  if (signatureWords > 28) {
    alerts.push({
      kind: "regle",
      label: "signature hors format",
      detail: `${signatureWords} mots, le maximum est 28 pour tenir sur deux lignes`,
    });
  }

  if (
    (normalizeSpacing(analysis.signature ?? "").match(/[.!?](?=\s|$)/g) ?? [])
      .length > 1
  ) {
    alerts.push({
      kind: "regle",
      label: "signature en plusieurs phrases",
      detail: "une seule phrase est attendue, elle s'affiche seule en tête de page",
    });
  }

  const echoed = sequencesOf(allWords(analysis.signature ?? ""), 5).filter(
    (sequence) => allWords(analysis.summary.profile).join(" ").includes(sequence),
  );
  const closeness = sharedWordRatio(
    meaningfulWords(analysis.signature ?? ""),
    meaningfulWords(analysis.summary.profile),
  );

  if (echoed.length > 0 || closeness > 0.4) {
    alerts.push({
      kind: "regle",
      label: "signature répétée dans le portrait",
      detail:
        echoed.length > 0
          ? `le portrait reprend « ${echoed[0]} »`
          : `${Math.round(closeness * 100)} % de vocabulaire commun, le portrait doit déployer la signature, pas la redire`,
    });
  }

  for (const [field, values] of listFields(analysis)) {
    const seen = new Map<string, number>();

    for (const value of values) {
      const key = meaningfulWords(value).sort().join(" ");
      seen.set(key, (seen.get(key) ?? 0) + 1);
    }

    for (const [key] of [...seen].filter(([, count]) => count > 1)) {
      alerts.push({
        kind: "regle",
        label: "doublon dans un tableau",
        detail: `${field} : « ${key} » apparaît deux fois`,
      });
    }
  }

  const tooLong = [
    ...analysis.summary.key_strengths,
    ...analysis.summary.motivations,
    ...analysis.summary.work_environment,
  ].filter((item) => countWords(item) > 6);

  if (tooLong.length > 0) {
    alerts.push({
      kind: "vigilance",
      label: "items de synthèse longs",
      detail: `${tooLong.length} item(s) au-delà de 6 mots, la grille à 3 colonnes se déséquilibre : « ${tooLong[0]} »`,
    });
  }

  return alerts;
};

/**
 * Le seuil du README : une phrase reconstituable depuis une seule réponse paraphrase.
 * Les guillemets de match_reason sont voulus, le portrait et les insights non.
 */
const checkParaphrase = (
  analysis: IkigaiAnalysisResult,
  payload: IkigaiPayload,
): Alert[] => {
  const fromAnswers = new Set(
    PILLARS.flatMap((pillar) => payload[pillar] ?? []).flatMap((answer) =>
      sequencesOf(allWords(answer), VERBATIM_LENGTH),
    ),
  );

  const fields: [string, string][] = [
    ["signature", analysis.signature ?? ""],
    ["summary.profile", analysis.summary.profile],
    ...insightTexts(analysis).map((insight, index): [string, string] => [
      `insights[${index}]`,
      insight,
    ]),
  ];

  return fields.flatMap(([field, value]) => {
    const reused = sequencesOf(allWords(value), VERBATIM_LENGTH).filter(
      (sequence) => fromAnswers.has(sequence),
    );

    if (reused.length === 0) return [];

    return [
      {
        kind: "vigilance" as const,
        label: "reprise mot à mot",
        detail: `${field} reprend ${reused.length} suite(s) de ${VERBATIM_LENGTH} mots des réponses : « ${reused[0]} »`,
      },
    ];
  });
};

// La densité réelle des réponses, pour confronter le niveau annoncé à la matière reçue
const checkMaterial = (
  analysis: IkigaiAnalysisResult,
  payload: IkigaiPayload,
): Alert[] => {
  const answers = PILLARS.flatMap((pillar) => payload[pillar] ?? []).filter(
    (answer) => answer.trim().length >= 60,
  );

  const averageLength =
    answers.reduce((total, answer) => total + answer.trim().length, 0) /
    (answers.length || 1);

  const skipped = PILLARS.flatMap((pillar) => payload[pillar] ?? []).filter(
    (answer) => answer.trim().length === 0,
  ).length;

  const alerts: Alert[] = [];

  if (
    skipped >= 4 &&
    !analysis.coherence.signals.includes("plusieurs questions laissées de côté")
  ) {
    alerts.push({
      kind: "regle",
      label: "constat manquant",
      detail: `${skipped} questions laissées vides, le constat correspondant doit figurer dans coherence.signals`,
    });
  }

  const thin = answers.length <= 8 && averageLength < 120;

  if (thin && analysis.confidence > 70) {
    alerts.push({
      kind: "regle",
      label: "confiance élevée sur matière mince",
      detail: `${answers.length} réponses retenues, ${Math.round(averageLength)} caractères en moyenne, et confidence ${analysis.confidence}`,
    });
  }

  return alerts;
};

// Une sortie produite par un schéma antérieur n'a pas les champs récents : on le constate
// et on s'arrête là, les contrôles suivants supposent tous le contrat à jour.
const missingFields = (analysis: IkigaiAnalysisResult): Alert[] =>
  [
    ["signature", analysis.signature],
    ["coherence", analysis.coherence],
    ["summary", analysis.summary],
    ["jobs", analysis.jobs],
    ["tags", analysis.tags],
  ]
    .filter(([, value]) => value === undefined || value === "")
    .map(([field]) => ({
      kind: "contrat" as const,
      label: `champ ${field} absent`,
      detail: "sortie produite avant l'ajout de ce champ au schéma",
    }));

export const checkAnalysis = (
  analysis: IkigaiAnalysisResult,
  payload: IkigaiPayload,
): Alert[] => {
  const missing = missingFields(analysis);

  return missing.length > 0 ? missing : runChecks(analysis, payload);
};

const runChecks = (
  analysis: IkigaiAnalysisResult,
  payload: IkigaiPayload,
): Alert[] => [
  ...checkContract(analysis),
  ...checkScores(analysis),
  ...checkWriting(analysis),
  ...checkParaphrase(analysis, payload),
  ...checkMaterial(analysis, payload),
];
