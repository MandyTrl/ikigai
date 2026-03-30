"use client";

import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { IkigaiContext } from "@/app/context/IkigaiContext";
import { MainstayList } from "../MainstayList";
import { ContainerLayout } from "./ContainerLayout";
import VennDiagram from "../VennDiagram/VennDiagram";
import { Button, ButtonSizeEnum } from "../UI/Button";
import { canAnalyzeIkigai } from "@/app/utils/validateForm";
import {
  buildIkigaiPayload,
  getAnalysisCache,
  getPayloadSignature,
  saveAnalysisCache,
} from "@/app/api/analyze/utils";

export const YourIkigaiLayout = () => {
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
        headers: {
          "Content-Type": "application/json",
        },
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
          : "Une erreur est survenue pendant l’analyse.",
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const cached = typeof window !== "undefined" ? getAnalysisCache() : null;
  const hasCachedCurrentAnalysis =
    cached && cached.signature === currentSignature;

  return (
    <>
      <ContainerLayout isVennDiagram>
        <VennDiagram />
      </ContainerLayout>

      <ContainerLayout hasNavbar>
        <h1 className="text-2xl mb-5">
          Bienvenue dans{" "}
          <span className="text-3xl font-semibold">votre ikigai</span>,
        </h1>
        <h3 className="text-xl mb-1">
          Comment commencer votre introspection ?
        </h3>

        <div className="flex flex-col gap-y-2 mb-4">
          <p>
            Dans le panel qui se trouve à gauche vous avez la visualisation de
            l&apos;ikigai dans son format le plus connu: le diagramme de Venn.
            Il se compose des{" "}
            <span className="underline underline-offset-2">4 piliers</span> de
            l&apos;ikigai:
          </p>

          <MainstayList />

          <p>
            Choisissez le pilier par lequel vous voulez débuter, lisez
            l&apos;explicatif et laissez-vous guider à la prochaine étape.
          </p>
        </div>
        {canAnalyzeIkigai(ikigaiForm) && (
          <div className="flex flex-col gap-3">
            <Button
              title={
                hasCachedCurrentAnalysis
                  ? "Voir mon analyse"
                  : isAnalyzing
                    ? "Analyse en cours..."
                    : "Analyser mes réponses"
              }
              onClick={handleAnalyze}
              size={ButtonSizeEnum.S}
              disabled={isAnalyzing}
            />

            {error && (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            )}
          </div>
        )}
      </ContainerLayout>
    </>
  );
};
