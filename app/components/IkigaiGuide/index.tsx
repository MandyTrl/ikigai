"use client";

import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { IkigaiContext } from "@/app/context/IkigaiContext";
import { MainstayList } from "../MainstayList";
import {
  CheckIcon,
  ChecksIcon,
  MinusIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Button, ButtonSizeEnum, ButtonVariantEnum } from "../UI/Button";
import { Title } from "../UI/Title";
import { Eyebrow } from "../UI/Eyebrow";
import { GuideStep } from "./GuideStep";
import { canAnalyzeIkigai } from "@/app/utils/validateForm";
import {
  buildIkigaiPayload,
  getAnalysisCache,
  getPayloadSignature,
  saveAnalysisCache,
} from "@/app/api/analyze/utils";

const STATUS_LEGEND = [
  {
    label: "à faire",
    icon: <MinusIcon size={13} className="fill-primary/80" />,
  },
  { label: "en cours (1/3)", icon: <CheckIcon size={13} color="#ff6b1f" /> },
  { label: "validé (2/3)", icon: <CheckIcon size={13} color="#059669" /> },
  { label: "complété (3/3)", icon: <ChecksIcon size={13} color="#059669" /> },
];

export const IkigaiGuide = () => {
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

  const canAnalyze = canAnalyzeIkigai(ikigaiForm);

  return (
    <div className="flex w-full flex-col gap-10 md:max-w-lg md:flex-1">
      <div className="flex flex-col gap-3">
        <Eyebrow text="Mode d'emploi" withDot />
        <Title
          as="h3"
          text="Comment commencer votre introspection ?"
          className="border-b border-line pb-3"
        />
      </div>

      <ol className="flex flex-col gap-8">
        <GuideStep step="01" title="Choisissez un pilier">
          <p className="text-primary/65">
            N&apos;importe lequel, dans l&apos;ordre que vous voulez — sur le
            diagramme ou dans la liste.
          </p>

          <MainstayList />

          <div className="mt-1 flex flex-col gap-2 border-t border-line pt-3">
            <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-primary/55">
              {STATUS_LEGEND.map(({ label, icon }) => (
                <span key={label} className="inline-flex items-center gap-1">
                  {icon}
                  {label}
                </span>
              ))}
            </div>

            <p className="text-sm text-primary/55">
              Deux réponses valident un pilier mais plus vous répondez de
              questions, plus votre analyse{" "}
              <span className="font-semibold">sera précise</span>.
            </p>
          </div>
        </GuideStep>

        <GuideStep step="02" title="Répondez à 3 questions guidées">
          <p className="text-primary/65">
            Comptez 10 à 20 min par pilier. Deux réponses suffisent à le
            valider.
          </p>
        </GuideStep>

        <GuideStep step="03" title="Lancez votre analyse">
          <p className="text-primary/65">
            Le diagramme se complète à mesure. Une fois les 4 piliers remplis,
            recevez votre synthèse, des pistes de métiers et un PDF.
          </p>

          <div className="mt-1 flex flex-col gap-2">
            <Button
              label={
                hasCachedCurrentAnalysis
                  ? "Voir mon analyse"
                  : isAnalyzing
                    ? "Analyse en cours..."
                    : "Analyser mes réponses"
              }
              variant={ButtonVariantEnum.Outline}
              onClick={handleAnalyze}
              size={ButtonSizeEnum.M}
              disabled={!canAnalyze || isAnalyzing}
            />

            {error && (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            )}
          </div>
        </GuideStep>
      </ol>
    </div>
  );
};
