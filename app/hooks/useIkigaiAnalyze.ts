"use client";

import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { IkigaiContext } from "@/app/context/IkigaiContext";
import { canAnalyzeIkigai } from "@/app/utils/validateForm";
import {
  buildIkigaiPayload,
  getAnalysisCache,
  getPayloadSignature,
  saveAnalysisCache,
} from "@/app/api/analyze/utils";

const analyzeErrorMessage = (status?: number) => {
  switch (status) {
    case 429:
      return "Les analyses du jour sont toutes utilisées. Vos réponses restent enregistrées sur cet appareil : revenez demain pour lancer la vôtre.";
    case 503:
      return "Gemini est très sollicité en ce moment. Vos réponses sont bien enregistrées : réessayez dans quelques minutes.";
    default:
      return "L’analyse n’a pas pu aboutir. Vos réponses sont enregistrées, vous pouvez réessayer.";
  }
};

export const useIkigaiAnalyze = () => {
  const router = useRouter();
  const { ikigaiForm, enrichment } = useContext(IkigaiContext);

  const payload = buildIkigaiPayload(ikigaiForm, enrichment);
  const currentSignature = getPayloadSignature(payload);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    try {
      setIsAnalyzing(true);
      setError(null);

      const cached = getAnalysisCache();

      if (cached && cached.signature === currentSignature) {
        router.push("/votre-ikigai");
        return;
      }

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success || !result?.data) {
        console.error("Erreur lors de l'analyse :", result?.error);
        setError(analyzeErrorMessage(response.status));
        return;
      }

      const model =
        typeof result.model === "string" ? result.model : undefined;
      saveAnalysisCache(currentSignature, result.data, model);
      router.push("/votre-ikigai");
    } catch (err) {
      // Pas de réponse du tout (réseau coupé…) : aucun statut à lire
      console.error("Erreur lors de l'analyse :", err);
      setError(analyzeErrorMessage());
    } finally {
      setIsAnalyzing(false);
    }
  };

  const cached = typeof window !== "undefined" ? getAnalysisCache() : null;
  const hasCachedCurrentAnalysis =
    cached && cached.signature === currentSignature;
  const canAnalyze = canAnalyzeIkigai(ikigaiForm);

  return {
    handleAnalyze,
    isAnalyzing,
    error,
    canAnalyze,
    hasCachedCurrentAnalysis,
  };
};
