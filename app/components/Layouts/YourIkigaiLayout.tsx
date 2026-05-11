"use client";

import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { IkigaiContext } from "@/app/context/IkigaiContext";
import { MainstayList } from "../MainstayList";
import VennDiagram from "../VennDiagram/VennDiagram";
import { Button, ButtonSizeEnum } from "../UI/Button";
import { canAnalyzeIkigai } from "@/app/utils/validateForm";
import {
  buildIkigaiPayload,
  getAnalysisCache,
  getPayloadSignature,
  saveAnalysisCache,
} from "@/app/api/analyze/utils";
import { Title } from "../UI/Title";
import Image from "next/image";
import Link from "next/link";

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
      <div className="flex justify-between px-6 py-8 mb-2">
        <Link href="/">
          <Image
            src={"/assets/logos/logo-variant.svg"}
            alt="icone du logo d'Ikig-ai"
            width={50}
            height={50}
            style={{ height: "auto" }}
            priority
          />
        </Link>

        <Title as="h2" text="Bienvenue dans votre ikigai" className="font-[200] text-4xl tracking-tight" />
      </div>

      <div className="flex flex-col md:flex-row gap-5 md:gap-10">
        <VennDiagram />

        <div className="flex flex-col gap-10">
          <div className="w-fit bg-white p-4 pb-2 border-b border-secondary">
            <Title as="h3" text="Comment commencer votre introspection ?" />
          </div>

          <div className="flex flex-col gap-y-2">
            <p>
              Dans le panel qui se trouve à gauche vous avez la visualisation
              de l&apos;ikigai dans son format le plus connu: le diagramme de
              Venn. Il se compose des{" "}
              <span className="underline underline-offset-2">4 piliers</span>{" "}
              de l&apos;ikigai:
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
                size={ButtonSizeEnum.M}
                disabled={isAnalyzing}
              />

              {error && (
                <p className="text-sm text-red-600" role="alert">
                  {error}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
