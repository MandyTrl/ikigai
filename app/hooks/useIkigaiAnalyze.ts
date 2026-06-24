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

export const useIkigaiAnalyze = () => {
  const router = useRouter();
  const { ikigaiForm } = useContext(IkigaiContext);

  const payload = buildIkigaiPayload(ikigaiForm);
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

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Analyse impossible");
      }

      saveAnalysisCache(currentSignature, result.data);
      router.push("/votre-ikigai");
    } catch (err) {
      console.error("Erreur lors de l'analyse :", err);
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue pendant l'analyse.",
      );
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
