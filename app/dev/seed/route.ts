import { timingSafeEqual } from "node:crypto";
import path from "node:path";
import { notFound } from "next/navigation";
import { getPayloadSignature } from "@/app/api/analyze/utils";
import { IkigaiStepEnum, PillarStateEnum } from "@/app/types";
import type { IkigaiPayload } from "@/app/api/analyze/types/request";
import { payloadFixtures } from "@/scripts/fixtures";
import {
  OUTPUT_ROOT,
  latestRunDir,
  readAnalysis,
  readModels,
} from "@/scripts/output-store";

export const dynamic = "force-dynamic";

const hasValidKey = (given: string | null) => {
  const expected = process.env.FIXTURES_DEV_KEY;

  if (!expected || !given) return false;

  const a = Buffer.from(given);
  const b = Buffer.from(expected);

  return a.length === b.length && timingSafeEqual(a, b);
};

const toIkigaiForm = (payload: IkigaiPayload) =>
  [
    { mainstay: IkigaiStepEnum.LOVE, answers: payload.love },
    { mainstay: IkigaiStepEnum.NEEDS, answers: payload.needs },
    { mainstay: IkigaiStepEnum.PAID, answers: payload.paid },
    { mainstay: IkigaiStepEnum.TALENT, answers: payload.talent },
  ].map((pillar) => ({ ...pillar, progressState: PillarStateEnum.IS_SAVED }));

// « 2026-10-21_1653 » → l'instant de l'exécution, pour que la page affiche la vraie date d'analyse
const runDate = (runDir: string) => {
  const match = path.basename(runDir).match(/^(\d{4}-\d{2}-\d{2})_(\d{2})(\d{2})/);
  return match ? new Date(`${match[1]}T${match[2]}:${match[3]}`).toISOString() : undefined;
};

const errorPage = (message: string) =>
  new Response(`<pre style="font:14px monospace;padding:2rem">${message}</pre>`, {
    status: 404,
    headers: { "content-type": "text/html; charset=utf-8" },
  });

export async function GET(request: Request) {
  const url = new URL(request.url);

  if (process.env.NODE_ENV === "production" || !hasValidKey(url.searchParams.get("k"))) {
    notFound();
  }

  const slug = url.searchParams.get("persona");
  const fixture = payloadFixtures.find((entry) => entry.slug === slug);

  if (!fixture) {
    return errorPage(
      `Persona inconnu : ${slug}\nDisponibles : ${payloadFixtures.map((entry) => entry.slug).join(", ")}`,
    );
  }

  const run = url.searchParams.get("run");
  const runDir = run
    ? path.join(OUTPUT_ROOT, run)
    : await latestRunDir([fixture.slug]);

  if (!runDir) return errorPage("Aucune exécution complète dans scripts/output");

  const analysis = await readAnalysis(runDir, fixture.slug).catch(() => null);

  if (!analysis) {
    return errorPage(`${fixture.slug}.json absent de ${path.basename(runDir)}`);
  }

  // Une exécution antérieure à models.json n'a pas de modèle noté : la page retombe sur l'ancien
  const model = (await readModels(runDir))[fixture.slug];

  // Le localStorage n'est accessible que depuis la page : on écrit puis on redirige aussitôt
  const script = `
    localStorage.setItem("ikigai-form", ${JSON.stringify(JSON.stringify(toIkigaiForm(fixture.payload)))});
    localStorage.setItem("ikigai-enrichment", ${JSON.stringify(JSON.stringify(fixture.payload.enrichment ?? {}))});
    localStorage.setItem("ikigai-analysis-cache", ${JSON.stringify(
      JSON.stringify({
        signature: getPayloadSignature(fixture.payload),
        result: analysis,
        analyzedAt: runDate(runDir),
        model,
      }),
    )});
    location.replace("/votre-ikigai");
  `;

  return new Response(`<!doctype html><script>${script}</script>`, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
