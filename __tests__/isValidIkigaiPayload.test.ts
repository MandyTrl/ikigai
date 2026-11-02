import { isValidIkigaiPayload } from "@/app/api/analyze/utils";
import { describe, it, expect } from "vitest";

const validPayload = {
  love: ["", "", ""],
  talent: ["", "", ""],
  needs: ["", "", ""],
  paid: ["", "", ""],
};

const payloadWithValidEnrichment = {
  ...validPayload,
  enrichment: {
    mbti: "INFP",
    disc: "blue",
    currentJob: "Responsable d'atelier",
    satisfaction: 3,
    age: 34,
  },
};

const payloadWithoutLove = {
  talent: ["", "", ""],
  needs: ["", "", ""],
  paid: ["", "", ""],
};

// check payload without enrichment profil
describe("isValidIkigaiPayload", () => {
  it("Returns true when we have a payload in which all fields are arrays of string", () => {
    expect(isValidIkigaiPayload(validPayload)).toBe(true);
  });
  it("Returns false when one key is missing", () => {
    expect(isValidIkigaiPayload(payloadWithoutLove)).toBe(false);
  });
  it.each([
    { field: "love", answers: [1, "", ""] },
    { field: "talent", answers: ["", 2, ""] },
    { field: "needs", answers: ["", "", 3] },
    { field: "paid", answers: ["", "", 3] },
  ])(
    "Returns false when $field contains other than string",
    ({ field, answers }) => {
      expect(isValidIkigaiPayload({ ...validPayload, [field]: answers })).toBe(
        false,
      );
    },
  );
  it("Returns false when body is null", () => {
    expect(isValidIkigaiPayload(null)).toBe(false);
  });
  it("Returns false when field's key is not an array", () => {
    expect(isValidIkigaiPayload({ ...validPayload, paid: "test" })).toBe(false);
  });
});

// check payload with enrichment profil
describe("isValidIkigaiPayload with Enrichment key", () => {
  it("Returns true when we have an empty enrichment", () => {
    expect(isValidIkigaiPayload({ ...validPayload, enrichment: {} })).toBe(
      true,
    );
  });
  it("Returns true when we have an enrichment with a valid mbti", () => {
    expect(
      isValidIkigaiPayload({ ...validPayload, enrichment: { mbti: "INTJ" } }),
    ).toBe(true);
  });
  it("Returns false when we have a null enrichment", () => {
    expect(isValidIkigaiPayload({ ...validPayload, enrichment: null })).toBe(
      false,
    );
  });
  it("Returns false when we have an array as enrichment", () => {
    expect(isValidIkigaiPayload({ ...validPayload, enrichment: [] })).toBe(
      false,
    );
  });
  it("Returns false when age is not a number", () => {
    expect(
      isValidIkigaiPayload({
        ...validPayload,
        enrichment: { ...payloadWithValidEnrichment.enrichment, age: "abc" },
      }),
    ).toBe(false);
  });
  it("Returns false when mbti is not in the list", () => {
    expect(
      isValidIkigaiPayload({
        ...validPayload,
        enrichment: { ...payloadWithValidEnrichment.enrichment, mbti: "INTX" },
      }),
    ).toBe(false);
  });
  it("Returns false when disc is not in the list", () => {
    expect(
      isValidIkigaiPayload({
        ...validPayload,
        enrichment: {
          ...payloadWithValidEnrichment.enrichment,
          disc: "purple",
        },
      }),
    ).toBe(false);
  });
  it("Returns false when currentJob is not a string", () => {
    expect(
      isValidIkigaiPayload({
        ...validPayload,
        enrichment: {
          ...payloadWithValidEnrichment.enrichment,
          currentJob: 33,
        },
      }),
    ).toBe(false);
  });
  it("Returns false when satisfaction is not a number", () => {
    expect(
      isValidIkigaiPayload({
        ...validPayload,
        enrichment: {
          ...payloadWithValidEnrichment.enrichment,
          satisfaction: "beaucoup",
        },
      }),
    ).toBe(false);
  });
  it("Returns true when every enrichment field is valid", () => {
    expect(isValidIkigaiPayload(payloadWithValidEnrichment)).toBe(true);
  });
  it("Returns false when age is a numeric string", () => {
    expect(
      isValidIkigaiPayload({
        ...validPayload,
        enrichment: { mbti: "INFP", disc: "blue", age: "34" },
      }),
    ).toBe(false);
  });
});
