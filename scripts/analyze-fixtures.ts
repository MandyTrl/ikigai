import path from "node:path";
import { readdir, rmdir } from "node:fs/promises";
import type { IkigaiAnalysisResult } from "../app/api/analyze/types/response";
import { payloadFixtures } from "./fixtures.ts";
import {
  createRunDir,
  latestRunDir,
  readAnalysis,
  readRepeats,
  saveAnalysis,
} from "./output-store.ts";
import { formatTerminalSummary, type FixtureRun } from "./measures.ts";

const readArg = (name: string) =>
  process.argv.find((arg) => arg.startsWith(`--${name}=`))?.split("=")[1];

const options = {
  baseUrl: readArg("base-url") ?? "http://localhost:3000",
  runs: Number(readArg("runs") ?? 1),
  only: readArg("only")
    ?.split(",")
    .map((slug) => slug.trim()),
  reportOnly: process.argv.includes("--report-only"),
};

/** Si Gemini renvoie une forme inattendue, le message nomme le champ manquant. */
const assertAnalysisShape = (value: unknown, source: string) => {
  const analysis = value as IkigaiAnalysisResult;

  const missing = [
    ["signature", analysis?.signature],
    ["summary.profile", analysis?.summary?.profile],
    ["summary.key_strengths", analysis?.summary?.key_strengths],
    ["analysis.insights", analysis?.analysis?.insights],
    ["analysis.tensions", analysis?.analysis?.tensions],
    ["jobs", analysis?.jobs],
    ["recommendations.actions", analysis?.recommendations?.actions],
    ["tags.love", analysis?.tags?.love],
    ["coherence.level", analysis?.coherence?.level],
    ["coherence.signals", analysis?.coherence?.signals],
    ["confidence", analysis?.confidence],
  ].find(([, field]) => field === undefined);

  if (missing) {
    throw new Error(`${source} : champ ${missing[0]} absent de la sortie`);
  }

  return analysis;
};

const wait = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

// Gemini renvoie régulièrement un 503 « high demand » : on réessaie avant d'abandonner la série
const requestAnalysis = async (
  payload: unknown,
  label: string,
  attempt = 1,
): Promise<IkigaiAnalysisResult> => {
  const url = `${options.baseUrl}/api/analyze`;
  const startedAt = Date.now();

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => {
    throw new Error(
      `${url} injoignable. Lance le serveur avec « yarn dev », ou passe --base-url=…`,
    );
  });

  const body = await response.json().catch(() => null);

  if (!response.ok || !body?.success) {
    if (response.status === 429) {
      throw new Error(
        `${label} : quota Gemini atteint (20 requêtes par jour en palier gratuit). Réessaie demain ou change de clé.`,
      );
    }

    if (response.status >= 500 && attempt < 4) {
      const delay = attempt * 15;
      console.log(`  ${label} : ${response.status}, nouvelle tentative dans ${delay} s`);
      await wait(delay * 1000);

      return requestAnalysis(payload, label, attempt + 1);
    }

    throw new Error(
      `${label} : HTTP ${response.status}, ${body?.error ?? "réponse illisible"}`,
    );
  }

  console.log(
    `  ${label} : analyse reçue en ${((Date.now() - startedAt) / 1000).toFixed(1)} s`,
  );

  return assertAnalysisShape(body.data, label);
};

let currentRunDir: string | null = null;

const main = async () => {
  const fixtures = options.only
    ? payloadFixtures.filter((fixture) => options.only?.includes(fixture.slug))
    : payloadFixtures;

  if (fixtures.length === 0) {
    throw new Error(
      `Aucune fixture pour --only=${options.only?.join(",")}. Disponibles : ${payloadFixtures.map((fixture) => fixture.slug).join(", ")}`,
    );
  }

  const runDir = options.reportOnly
    ? await latestRunDir(fixtures.map((fixture) => fixture.slug))
    : await createRunDir();

  currentRunDir = runDir;

  if (!runDir) {
    throw new Error(
      "Aucune exécution complète dans scripts/output. Relance sans --report-only.",
    );
  }

  const runs: FixtureRun[] = [];

  for (const fixture of fixtures) {
    if (options.reportOnly) {
      const analysis = await readAnalysis(runDir, fixture.slug).catch(() => {
        throw new Error(
          `${fixture.slug}.json absent de ${path.basename(runDir)}. Relance sans --report-only.`,
        );
      });

      runs.push({
        fixture,
        analysis,
        repeats: await readRepeats(runDir, fixture.slug),
      });
      continue;
    }

    const analysis = await requestAnalysis(fixture.payload, fixture.slug);
    await saveAnalysis(runDir, fixture.slug, analysis);

    const repeats: IkigaiAnalysisResult[] = [];

    for (let run = 2; run <= options.runs; run += 1) {
      const repeat = await requestAnalysis(
        fixture.payload,
        `${fixture.slug} #${run}`,
      );
      await saveAnalysis(runDir, `${fixture.slug}-${run}`, repeat);
      repeats.push(repeat);
    }

    runs.push({ fixture, analysis, repeats });
  }

  console.log(`\n${formatTerminalSummary(runs)}\n`);
  console.log(`  sorties : ${path.relative(process.cwd(), runDir)}`);
  console.log(
    `  voir une fiche : yarn seed ${fixtures[0].slug}\n`,
  );
};

// Un dossier resté vide après un échec ne doit pas traîner et devenir « la dernière exécution »
const removeIfEmpty = async (dir: string | null) => {
  if (!dir) return;

  const files = await readdir(dir).catch((): string[] => []);
  if (files.length === 0) await rmdir(dir).catch(() => {});
};

main().catch(async (error: unknown) => {
  await removeIfEmpty(currentRunDir);
  console.error(`\n  ${error instanceof Error ? error.message : error}\n`);
  process.exitCode = 1;
});