import { describe, expect, it } from "vitest";
import { meaningfulWords, sharedWordRatio } from "@/scripts/checks";

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
});

describe("wordsInCommon", () => {
  it.todo("Returns each shared word once when it appears several times");
  it.todo("Returns an empty array when no word is shared");
});

describe("firstWords", () => {
  it.todo("Returns the first 6 words when no count is given");
  it.todo("Returns the first N words when a count is given");
});

describe("insightTexts", () => {
  it.todo("Returns the text of each insight when insights are objects");
  it.todo(
    "Returns the insight itself when it is a plain string (legacy format)",
  );
});
