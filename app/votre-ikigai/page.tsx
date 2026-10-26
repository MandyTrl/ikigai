"use client";
import { useEffect, useState, useContext, useMemo } from "react";
import { useRouter } from "next/navigation";
import { IkigaiContext } from "@/app/context/IkigaiContext";
import { MainLayout } from "@/app/components/Layouts/MainLayout";
import { canAnalyzeIkigai } from "@/app/utils/validateForm";
import { withoutStrayQuotes } from "@/app/utils/stripQuotes";
import {
  buildIkigaiPayload,
  getAnalysisCache,
  getPayloadSignature,
} from "@/app/api/analyze/utils";
import { IkigaiAnalysisResult } from "../api/analyze/types/response";
import { ResultHeader } from "../components/Analyze/ResultHeader";
import { CrossReading } from "../components/Analyze/CrossReading";
import { ResultSection } from "../components/Analyze/ResultSection";
import { Signature } from "../components/Analyze/Signature";
import { IkigaiSummary } from "../components/Analyze/IkigaiSummary";
import { JobCardReveal } from "../components/Analyze/JobCardReveal";
import { NextSteps } from "../components/Analyze/NextSteps";
import { VigilancePoint } from "../components/Analyze/VigilancePoint";
import { ResultClosing } from "../components/Analyze/ResultClosing";
import { PrintPdfButton } from "../components/Analyze/PdfButton";

const toAnalysisDate = (iso?: string) => {
  const date = iso ? new Date(iso) : new Date();
  return Number.isNaN(date.getTime()) ? new Date() : date;
};

export default function IkigaiResultPage() {
  const router = useRouter();
  const { ikigaiForm, isHydrated, enrichment } = useContext(IkigaiContext);

  // enrichment entre dans la signature côté useIkigaiAnalyze : l'omettre ici ferait
  // échouer la comparaison avec le cache.
  const payload = useMemo(
    () => buildIkigaiPayload(ikigaiForm, enrichment),
    [ikigaiForm, enrichment],
  );
  const signature = useMemo(() => getPayloadSignature(payload), [payload]);

  const [analysis, setAnalysis] = useState<IkigaiAnalysisResult | null>(null);
  const [analyzedAt, setAnalyzedAt] = useState(() => new Date());

  useEffect(() => {
    if (!isHydrated) return;

    if (!canAnalyzeIkigai(ikigaiForm)) {
      router.replace("/commencer");
      return;
    }

    const cache = getAnalysisCache();

    if (!cache || cache.signature !== signature) {
      router.replace("/commencer");
      return;
    }

    setAnalysis(withoutStrayQuotes(cache.result as IkigaiAnalysisResult));
    setAnalyzedAt(toAnalysisDate(cache.analyzedAt));
  }, [ikigaiForm, router, signature, isHydrated]);

  if (!analysis) {
    return (
      <p className="flex min-h-screen items-center justify-center font-mono text-sm uppercase tracking-[0.2em] text-secondary/60">
        Chargement de votre analyse…
      </p>
    );
  }

  return (
    <MainLayout
      hasNavbar
      navEndSlot={
        <div className="print:hidden">
          <PrintPdfButton analyzedAt={analyzedAt} />
        </div>
      }
      className="w-full pt-4 md:py-16 max-w-5xl mx-auto flex flex-col gap-16 md:gap-24"
    >
      <div className="flex flex-col gap-14">
        <ResultHeader
          analyzedAt={analyzedAt}
          confidence={analysis.confidence}
          coherence={analysis.coherence}
        />

        {analysis.signature && <Signature text={analysis.signature} />}

        <ResultSection index="01" eyebrow="synthèse">
          <IkigaiSummary summary={analysis.summary} tags={analysis.tags} />
        </ResultSection>
      </div>

      <ResultSection index="02" eyebrow="orientations">
        <div className="grid gap-5">
          {analysis.jobs.map((job, index) => (
            <JobCardReveal
              key={job.title}
              job={job}
              rank={index + 1}
              tags={Object.values(analysis.tags).flat()}
            />
          ))}
        </div>
      </ResultSection>
      <div className="pb-8">
        <CrossReading insights={analysis.analysis.insights} />
      </div>

      <NextSteps actions={analysis.recommendations.actions} />

      <VigilancePoint
        warning={analysis.recommendations.warning}
        tensions={analysis.analysis.tensions}
      />

      <ResultClosing />
    </MainLayout>
  );
}
