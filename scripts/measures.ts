import type { IkigaiAnalysisResult } from "../app/api/analyze/types/response";
import {
  PILLARS,
  checkAnalysis,
  firstWords,
  insightTexts,
  meaningfulWords,
  sharedWordRatio,
  wordsInCommon,
  type Alert,
} from "./checks.ts";
import type { PayloadFixture } from "./fixtures.ts";

export type FixtureRun = {
  fixture: PayloadFixture;
  analysis: IkigaiAnalysisResult;
  //  Exécutions supplémentaires du même persona, avec --runs.
  repeats: IkigaiAnalysisResult[];
};

// Seuils indicatifs
export const THRESHOLDS = {
  portraitOverlap: 0.25,
  tagsOverlap: 0.3,
  confidenceSpread: 10,
};

const portraitWords = (analysis: IkigaiAnalysisResult) =>
  meaningfulWords(
    [
      analysis.signature ?? "",
      analysis.summary.profile,
      ...insightTexts(analysis),
    ].join(" "),
  );

const tagWords = (analysis: IkigaiAnalysisResult) =>
  meaningfulWords(PILLARS.flatMap((pillar) => analysis.tags[pillar]).join(" "));

const personaPairs = (runs: FixtureRun[]) =>
  runs.flatMap((left, index) =>
    runs.slice(index + 1).map((right) => [left, right] as const),
  );

export type Measures = {
  openings: {
    slug: string;
    label: string;
    sentence: string;
    skeleton: string;
  }[];
  hasRepeatedSkeleton: boolean;
  scores: {
    slug: string;
    confidence: number;
    jobScores: number[];
    pillarSpreads: number[];
  }[];
  confidenceSpread: number;
  overlaps: {
    pair: string;
    portrait: number;
    tags: number;
    jobTitles: number;
    flags: string[];
  }[];
  closestPair: { pair: string; words: string[] } | null;
  jobsByPersona: { slug: string; titles: string[] }[];
  sharedJobs: { title: string; slugs: string[] }[];
  variance: { slug: string; comparison: string; ratio: number }[];
  alerts: { slug: string; alerts: Alert[] }[];
};

export const buildMeasures = (runs: FixtureRun[]): Measures => {
  const confidences = runs.map((run) => run.analysis.confidence);

  const skeletons = runs.map((run) =>
    firstWords(run.analysis.signature ?? "", 2).toLowerCase(),
  );

  const overlaps = personaPairs(runs).map(([left, right]) => {
    const portrait = sharedWordRatio(
      portraitWords(left.analysis),
      portraitWords(right.analysis),
    );
    const tags = sharedWordRatio(
      tagWords(left.analysis),
      tagWords(right.analysis),
    );
    const jobTitles = sharedWordRatio(
      left.analysis.jobs.flatMap((job) => meaningfulWords(job.title)),
      right.analysis.jobs.flatMap((job) => meaningfulWords(job.title)),
    );

    return {
      pair: `${left.fixture.slug} ↔ ${right.fixture.slug}`,
      portrait,
      tags,
      jobTitles,
      flags: [
        portrait > THRESHOLDS.portraitOverlap ? "portrait" : "",
        tags > THRESHOLDS.tagsOverlap ? "tags" : "",
      ].filter(Boolean),
      left,
      right,
    };
  });

  const closest =
    overlaps.length > 0
      ? overlaps.reduce((max, row) => (row.portrait > max.portrait ? row : max))
      : null;

  const jobOwners = new Map<string, string[]>();
  for (const run of runs) {
    for (const job of run.analysis.jobs) {
      const key = job.title.toLowerCase();
      jobOwners.set(key, [...(jobOwners.get(key) ?? []), run.fixture.slug]);
    }
  }

  return {
    openings: runs.map((run) => ({
      slug: run.fixture.slug,
      label: run.fixture.label,
      sentence: run.analysis.signature ?? "signature absente",
      skeleton: firstWords(run.analysis.signature ?? ""),
    })),
    hasRepeatedSkeleton: new Set(skeletons).size !== skeletons.length,
    scores: runs.map((run) => ({
      slug: run.fixture.slug,
      confidence: run.analysis.confidence,
      jobScores: run.analysis.jobs.map((job) => job.score),
      pillarSpreads: run.analysis.jobs.map((job) => {
        const values = PILLARS.map((pillar) => job.ikigai_scores[pillar]);
        return Math.max(...values) - Math.min(...values);
      }),
    })),
    confidenceSpread: Math.max(...confidences) - Math.min(...confidences),
    overlaps: overlaps.map(({ pair, portrait, tags, jobTitles, flags }) => ({
      pair,
      portrait,
      tags,
      jobTitles,
      flags,
    })),
    closestPair: closest
      ? {
          pair: closest.pair,
          words: wordsInCommon(
            portraitWords(closest.left.analysis),
            portraitWords(closest.right.analysis),
          ).slice(0, 25),
        }
      : null,
    jobsByPersona: runs.map((run) => ({
      slug: run.fixture.slug,
      titles: run.analysis.jobs.map((job) => job.title),
    })),
    sharedJobs: [...jobOwners]
      .filter(([, slugs]) => slugs.length > 1)
      .map(([title, slugs]) => ({ title, slugs })),
    variance: runs.flatMap((run) =>
      run.repeats.map((repeat, index) => ({
        slug: run.fixture.slug,
        comparison: `1 ↔ ${index + 2}`,
        ratio: sharedWordRatio(
          portraitWords(run.analysis),
          portraitWords(repeat),
        ),
      })),
    ),
    alerts: runs.map((run) => ({
      slug: run.fixture.slug,
      alerts: checkAnalysis(run.analysis, run.fixture.payload),
    })),
  };
};

const percent = (value: number) => `${Math.round(value * 100)} %`;

export const formatTerminalSummary = (runs: FixtureRun[]) => {
  const measures = buildMeasures(runs);

  const personaLines = measures.openings.map((opening, index) => {
    const alerts = measures.alerts[index].alerts;
    const counts = alerts.reduce<Record<string, number>>((acc, alert) => {
      acc[alert.kind] = (acc[alert.kind] ?? 0) + 1;
      return acc;
    }, {});

    const summary =
      alerts.length === 0
        ? "aucun écart"
        : Object.entries(counts)
            .map(([kind, count]) => `${count} ${kind}`)
            .join(", ");

    return [
      `  ${opening.slug.padEnd(18)} confidence ${measures.scores[index].confidence}  ${summary}`,
      `    « ${opening.sentence} »`,
    ].join("\n");
  });

  const comparable = measures.overlaps.length > 0;

  const warnings = [
    comparable && measures.hasRepeatedSkeleton
      ? "  ALERTE  au moins deux signatures ouvrent sur les trois mêmes mots"
      : "",
    comparable && measures.confidenceSpread < THRESHOLDS.confidenceSpread
      ? `  ALERTE  les confidences tiennent dans ${measures.confidenceSpread} points`
      : "",
    ...measures.sharedJobs.map(
      (job) => `  ALERTE  « ${job.title} » proposé à ${job.slugs.join(" et ")}`,
    ),
  ].filter(Boolean);

  const overlapLine = comparable
    ? `  recoupement de prose le plus élevé : ${percent(Math.max(...measures.overlaps.map((row) => row.portrait)))} (seuil ${percent(THRESHOLDS.portraitOverlap)})`
    : "";

  return [...personaLines, "", overlapLine, ...warnings]
    .filter(Boolean)
    .join("\n");
};
