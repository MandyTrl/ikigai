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
        throw new Error(result?.error ?? `HTTP ${response.status}`);
      }

      saveAnalysisCache(currentSignature, result.data);
      router.push("/votre-ikigai");
    } catch (err) {
      console.error("Erreur lors de l'analyse :", err);
      setError("L’analyse n’a pas pu aboutir. Patientez un instant, puis réessayez.");
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
