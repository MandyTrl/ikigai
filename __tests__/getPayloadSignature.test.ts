import type { IkigaiPayload } from "@/app/api/analyze/types/request";
import {
  ANALYSIS_SCHEMA_VERSION,
  getPayloadSignature,
  normalizePayload,
} from "@/app/api/analyze/utils";
import { describe, it, expect } from "vitest";

const payload: IkigaiPayload = {
  love: [
    "J'adore réparer des vélos le week-end et comprendre comment chaque pièce fonctionne.",
    "Je perds la notion du temps quand je dessine des plans d'aménagement pour mon appartement.",
    "Cuisiner pour mes amis et voir leur tête quand ils goûtent un plat nouveau me rend heureuse.",
  ],
  talent: [
    "On me demande souvent d'expliquer des choses compliquées avec des mots simples et des schémas.",
    "Je repère vite ce qui cloche dans une organisation et je propose une façon plus fluide de faire.",
    "Je suis patiente avec les débutants, je ne m'agace pas quand il faut répéter plusieurs fois.",
  ],
  needs: [
    "Les gens autour de moi manquent de repères pour réparer au lieu de jeter leurs objets du quotidien.",
    "Beaucoup de petites associations de quartier se noient dans l'organisation de leurs événements.",
    "Les jeunes de mon entourage ne savent pas vers quels métiers manuels se tourner après le lycée.",
  ],
  paid: [
    "On m'a déjà payée pour animer des ateliers de réparation dans une recyclerie de mon quartier.",
    "Des amis m'ont rémunérée pour réorganiser l'agencement de leur boutique et leur planning.",
    "",
  ],
};

// check the signature used as the analysis cache key
describe("getPayloadSignature", () => {
  it("Returns the same signature for the same payload", () => {
    const firstSignature = getPayloadSignature(payload);
    const secondSignature = getPayloadSignature(payload);

    expect(firstSignature).toBe(secondSignature);
  });
  it("Returns a different signature when enrichment is added", () => {
    const signatureWithEnrichment = getPayloadSignature({
      ...payload,
      enrichment: { age: 33 },
    });
    const signatureWithoutEnrichment = getPayloadSignature(payload);

    expect(signatureWithEnrichment).not.toBe(signatureWithoutEnrichment);
  });
  it("Prefixes the signature with the analysis schema version", () => {
    const signature = getPayloadSignature(payload);
    const hasVersionPrefix = signature.startsWith(
      `v${ANALYSIS_SCHEMA_VERSION}:`,
    );

    expect(hasVersionPrefix).toBe(true);
  });
  it("Returns a different signature for another schema version", () => {
    const currentSignature = getPayloadSignature(payload);
    const otherVersionSignature = `v${ANALYSIS_SCHEMA_VERSION + 1}:${JSON.stringify(normalizePayload(payload))}`;

    expect(currentSignature).not.toBe(otherVersionSignature);
  });
  it("Returns a different signature when an answer changes", () => {
    const modifiedPayload: IkigaiPayload = {
      ...payload,
      needs: [
        ...payload.needs.slice(0, 2),
        "On voit les conseillers d'orientation trop tard dans notre cursus scolaire.",
      ],
    };

    const originalSignature = getPayloadSignature(payload);
    const modifiedSignature = getPayloadSignature(modifiedPayload);

    expect(modifiedSignature).not.toBe(originalSignature);
  });
});
