import { describe, expect, it } from "vitest";
import type { IkigaiAnalysisResult } from "@/app/api/analyze/types/response";
import {
  firstWords,
  insightTexts,
  meaningfulWords,
  sharedWordRatio,
  wordsInCommon,
} from "@/scripts/checks";

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
