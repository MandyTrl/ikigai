import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { IkigaiAnalysisResult } from "../app/api/analyze/types/response";

export const OUTPUT_ROOT = path.join(process.cwd(), "scripts", "output");

// Un dossier par exécution: rien n'est remove + date
export const createRunDir = async (date = new Date()) => {
  const stamp = date
    .toISOString()
    .slice(0, 16)
    .replace("T", "_")
    .replace(":", "");

  const dir = path.join(OUTPUT_ROOT, stamp);
  await mkdir(dir, { recursive: true });

  return dir;
};

// Exécute de la plus récente à la plus ancienne
export const listRunNames = async () => {
  const entries = await readdir(OUTPUT_ROOT, { withFileTypes: true }).catch(
    () => [],
  );

  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
    .reverse();
};

// La plus récente exécution qui contient bien toutes les sorties attendues : une
// exécution interrompue laisse un dossier partiel, qui ne doit pas être choisi.
export const latestRunDir = async (requiredNames: string[] = []) => {
  for (const name of await listRunNames()) {
    const dir = path.join(OUTPUT_ROOT, name);
    const files = await readdir(dir).catch((): string[] => []);

    const hasAll = requiredNames.every((required) =>
      files.includes(`${required}.json`),
    );

    if (hasAll) return dir;
  }

  return null;
};

export const saveAnalysis = (
  dir: string,
  name: string,
  analysis: IkigaiAnalysisResult,
) =>
  writeFile(
    path.join(dir, `${name}.json`),
    `${JSON.stringify(analysis, null, 2)}\n`,
    "utf8",
  );

export const readAnalysis = async (dir: string, name: string) => {
  const raw = await readFile(path.join(dir, `${name}.json`), "utf8");
  return JSON.parse(raw) as IkigaiAnalysisResult;
};

// Le modèle qui a répondu pour chaque sortie (repli possible) : sans lui, on comparerait
// deux exécutions sans savoir qu'elles viennent de modèles différents
const MODELS_FILE = "models.json";

export const readModels = async (
  dir: string,
): Promise<Record<string, string>> => {
  const raw = await readFile(path.join(dir, MODELS_FILE), "utf8").catch(
    () => null,
  );
  const parsed: unknown = raw ? JSON.parse(raw) : {};

  if (typeof parsed !== "object" || parsed === null) return {};

  return Object.fromEntries(
    Object.entries(parsed).filter(
      (entry): entry is [string, string] => typeof entry[1] === "string",
    ),
  );
};

export const saveModel = async (dir: string, name: string, model: string) => {
  const models = await readModels(dir);

  await writeFile(
    path.join(dir, MODELS_FILE),
    `${JSON.stringify({ ...models, [name]: model }, null, 2)}\n`,
    "utf8",
  );
};

// Les exécutions répétées d'un persona, écrites par --runs sous la forme slug-2.json.
export const readRepeats = async (dir: string, slug: string) => {
  const files = await readdir(dir).catch(() => []);

  const repeats = files
    .filter((file) => new RegExp(`^${slug}-\\d+\\.json$`).test(file))
    .sort();

  return Promise.all(
    repeats.map((file) => readAnalysis(dir, path.basename(file, ".json"))),
  );
};
