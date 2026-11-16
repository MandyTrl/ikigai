import { describe, expect, it } from "vitest";
import type { IkigaiAnalysisResult } from "@/app/api/analyze/types/response";
import {
  checkAnalysis,
  firstWords,
  insightTexts,
  meaningfulWords,
  sharedWordRatio,
  wordsInCommon,
} from "@/scripts/checks";
import { buildAnalysis, buildPayload } from "./factories/analysis";

// level 1: test helpers
describe("meaningfulWords", () => {
  it("Returns lowercase words without accents when the text has capitals and accents", () => {
    expect(
      meaningfulWords("Dernièrement il a donné énormément de cartes Pokemon"),
    ).toEqual(["dernierement", "donne", "enormement", "cartes", "pokemon"]);
  });
  it("Returns only the words longer than 3 letters", () => {
    expect(meaningfulWords("Au jour le jour il est devenu.")).toEqual([
      "jour",
      "jour",
      "devenu",
    ]);
  });
  it("Returns no stopword even when it is longer than 3 letters", () => {
    expect(
      meaningfulWords("Avec un engouement évident pour les tests."),
    ).toEqual(["engouement", "evident", "tests"]);
  });
});

describe("sharedWordRatio", () => {
  it("Returns 0 when one list is empty", () => {
    expect(sharedWordRatio(["word"], [])).toBe(0);
  });
  it("Returns 0 when both lists are empty", () => {
    expect(sharedWordRatio([], [])).toBe(0);
  });
  it("Returns 1 when both lists are identical", () => {
    expect(sharedWordRatio(["word"], ["word"])).toBe(1);
  });
  it("Returns the share of distinct words in common when the lists partly overlap", () => {
    expect(
      sharedWordRatio(
        ["word", "test", "ikigai"],
        ["test", "ikigai", "documentation", "vitest"],
      ),
    ).toBeCloseTo(0.4);
  });
  it("Returns 1 when the lists only differ by repeated words", () => {
    expect(sharedWordRatio(["velo", "velo"], ["velo"])).toBe(1);
  });
});

describe("wordsInCommon", () => {
  it("Returns each shared word once when it appears several times", () => {
    expect(
      wordsInCommon(
        ["art", "culture", "jeux", "culture"],
        ["culture", "lecture", "randonnée"],
      ),
    ).toEqual(["culture"]);
  });
  it("Returns an empty array when no word is shared", () => {
    expect(
      wordsInCommon(
        ["art", "culture", "jeux"],
        ["videoclub", "lecture", "randonnee"],
      ),
    ).toEqual([]);
  });
  it("Returns no match when words only differ by case (expects normalized words)", () => {
    expect(wordsInCommon(["Culture"], ["culture"])).toEqual([]);
  });
});

describe("firstWords", () => {
  it("Returns the first 6 words when no count is given", () => {
    expect(
      firstWords("Vous aimez réparer des vélos le week-end avec vos amis"),
    ).toBe("Vous aimez réparer des vélos le");
  });
  it("Returns the first N words when a count is given", () => {
    expect(
      firstWords("Vous aimez réparer des vélos le week-end avec vos amis", 3),
    ).toBe("Vous aimez réparer");
  });
});

const withInsights = (insights: unknown[]) =>
  ({ analysis: { insights } }) as unknown as IkigaiAnalysisResult;

describe("insightTexts", () => {
  it("Returns the text of each insight when insights are objects", () => {
    expect(
      insightTexts(
        withInsights([
          {
            pillars: ["love", "talent"],
            text: "Réparer et expliquer vont ensemble.",
          },
          {
            pillars: ["needs", "paid"],
            text: "Les ateliers payés répondent au besoin du quartier.",
          },
        ]),
      ),
    ).toEqual([
      "Réparer et expliquer vont ensemble.",
      "Les ateliers payés répondent au besoin du quartier.",
    ]);
  });
  it("Returns the insight itself when it is a plain string (legacy format)", () => {
    expect(
      insightTexts(withInsights(["Réparer et expliquer vont ensemble."])),
    ).toEqual(["Réparer et expliquer vont ensemble."]);
  });
});

// level 1: checkAnalysis
describe("checkAnalysis", () => {
  it("Returns no alert when the analysis is valid", () => {
    expect(checkAnalysis(buildAnalysis(), buildPayload())).toEqual([]);
  });

  describe("missing fields", () => {
    it("Returns only the missing field alert when the signature is absent", () => {
      expect(
        checkAnalysis(buildAnalysis({ signature: "" }), buildPayload()),
      ).toEqual([
        expect.objectContaining({
          kind: "contrat",
          label: "champ signature absent",
        }),
      ]);
    });
    it("Returns only the missing field alert when coherence is absent (legacy output)", () => {
      // the cast simulates an output from before coherence was added to the schema
      const legacy = {
        ...buildAnalysis(),
        coherence: undefined,
      } as unknown as IkigaiAnalysisResult;

      expect(checkAnalysis(legacy, buildPayload())).toEqual([
        expect.objectContaining({
          kind: "contrat",
          label: "champ coherence absent",
        }),
      ]);
    });
  });

  describe("schema contract", () => {
    it.todo("Returns a contract alert when there are not exactly 3 jobs");
    it.todo("Returns a contract alert when an insight links fewer than 2 pillars");
    it.todo("Returns a contract alert when the warning is empty");
    it.todo("Returns a contract alert when two jobs share the same title");
  });

  describe("accents", () => {
    it.todo("Returns a contract alert when the text has almost no accents");
  });

  describe("scores", () => {
    it.todo("Returns a rule alert when a score is not a multiple of 5");
    it.todo("Returns a rule alert when confidence is outside its coherence band");
    it.todo("Returns a rule alert when two jobs are less than 5 points apart");
    it.todo("Returns a vigilance alert when the pillar scores of a job are too flat");
  });

  describe("writing", () => {
    it.todo("Returns a rule alert when a text contains an em dash");
    it.todo("Returns a rule alert when a text contains markdown");
    it.todo("Returns a rule alert when a text mentions the answers");
    it.todo("Returns a rule alert when a pillar name leaks into a text");
    it.todo("Returns a rule alert when a text outside match_reason contains quotes");
    it.todo("Returns a rule alert when a match_reason quotes in the first person");
    it.todo("Returns a rule alert when the portrait uses a forbidden opening");
    it.todo("Returns a rule alert when the portrait opens with a character trait");
    it.todo("Returns a rule alert when the signature is longer than 28 words");
    it.todo("Returns a rule alert when the signature has several sentences");
    it.todo("Returns a rule alert when the portrait repeats the signature");
    it.todo("Returns a rule alert when a list contains the same item twice");
    it.todo("Returns a vigilance alert when a summary item is longer than 6 words");
  });

  describe("paraphrase", () => {
    it.todo("Returns a vigilance alert when a text reuses 6 words of an answer verbatim");
  });

  describe("answer material", () => {
    it.todo("Returns a rule alert when 4 answers are skipped and coherence does not say so");
    it.todo("Returns a rule alert when confidence is above 70 on thin answers");
  });
});
