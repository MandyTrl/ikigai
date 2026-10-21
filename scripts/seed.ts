import { readFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";
import { payloadFixtures } from "./fixtures.ts";
import { latestRunDir } from "./output-store.ts";

const readArg = (name: string) =>
  process.argv.find((arg) => arg.startsWith(`--${name}=`))?.split("=")[1];

const slug = process.argv.slice(2).find((arg) => !arg.startsWith("--"));
const baseUrl = readArg("base-url") ?? "http://localhost:3000";

const readDevKey = async () => {
  const env = await readFile(path.join(process.cwd(), ".env.local"), "utf8");
  return env.match(/^FIXTURES_DEV_KEY=(.+)$/m)?.[1]?.trim();
};

const main = async () => {
  const fixture = payloadFixtures.find((entry) => entry.slug === slug);

  if (!fixture) {
    throw new Error(
      `Persona attendu parmi : ${payloadFixtures.map((entry) => entry.slug).join(", ")}`,
    );
  }

  const key = await readDevKey().catch(() => undefined);

  if (!key) {
    throw new Error(
      "FIXTURES_DEV_KEY absent de .env.local. Ajoute une valeur, n'importe laquelle, et relance.",
    );
  }

  const runDir = await latestRunDir([fixture.slug]);

  if (!runDir) {
    throw new Error(
      "Aucune exécution dans scripts/output. Lance « yarn fixtures » d'abord.",
    );
  }

  const target = `${baseUrl}/dev/seed?k=${encodeURIComponent(key)}&persona=${fixture.slug}&run=${path.basename(runDir)}`;

  console.log(`  ${fixture.label}`);
  console.log(`  exécution : ${path.basename(runDir)}`);

  spawn("open", [target], { stdio: "ignore", detached: true }).unref();
};

main().catch((error: unknown) => {
  console.error(`\n  ${error instanceof Error ? error.message : error}\n`);
  process.exitCode = 1;
});