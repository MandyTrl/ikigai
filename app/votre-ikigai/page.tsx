"use client";
import { useEffect, useState, useContext, useMemo } from "react";
import { useRouter } from "next/navigation";
import { IkigaiContext } from "@/app/context/IkigaiContext";
import { MainLayout } from "@/app/components/Layouts/MainLayout";
import { canAnalyzeIkigai } from "@/app/utils/validateForm";
import {
  buildIkigaiPayload,
  getAnalysisCache,
  getPayloadSignature,
} from "@/app/api/analyze/utils";
import { IkigaiAnalysisResult } from "../api/analyze/types/response";
import { ResultHeader } from "../components/Analyze/ResultHeader";
import { ResultEstampe } from "../components/Analyze/ResultEstampe";
import { ResultSection } from "../components/Analyze/ResultSection";
import { IkigaiSummary } from "../components/Analyze/IkigaiSummary";
import { JobCard } from "../components/Analyze/JobCard";
import { CrossAnalysis } from "../components/Analyze/CrossAnalysis";
import { NextSteps } from "../components/Analyze/NextSteps";
import { VigilancePoint } from "../components/Analyze/VigilancePoint";

export default function IkigaiResultPage() {
  const router = useRouter();
  const { ikigaiForm } = useContext(IkigaiContext);

  const payload = useMemo(() => buildIkigaiPayload(ikigaiForm), [ikigaiForm]);
  const signature = useMemo(() => getPayloadSignature(payload), [payload]);

  const [analysis, setAnalysis] = useState<IkigaiAnalysisResult | null>(null);

  useEffect(() => {
    if (!canAnalyzeIkigai(ikigaiForm)) {
      router.replace("/commencer");
      return;
    }

    const cache = getAnalysisCache();

    if (!cache || cache.signature !== signature) {
      router.replace("/commencer");
      return;
    }

    setAnalysis(cache.result as IkigaiAnalysisResult);
  }, [ikigaiForm, router, signature]);

  if (!analysis) {
    return (
      <p className="flex min-h-screen items-center justify-center font-mono text-sm uppercase tracking-[0.2em] text-secondary/60">
        Chargement de votre analyse…
      </p>
    );
  }

  return (
    <MainLayout className="gap-16 py-12 md:gap-20 md:py-16">
      <div className="relative">
        <ResultEstampe />

        <div className="relative z-10 flex flex-col gap-16 md:gap-20">
          <ResultHeader confidence={analysis.confidence} />

          <ResultSection index="01" eyebrow="synthèse">
            <IkigaiSummary summary={analysis.summary} tags={analysis.tags} />
          </ResultSection>
        </div>
      </div>

      <ResultSection index="02" eyebrow="orientations">
        <div className="grid gap-5 lg:grid-cols-3">
          {analysis.jobs.map((job, index) => (
            <JobCard key={job.title} job={job} rank={index + 1} />
          ))}
        </div>
      </ResultSection>

      <div className="flex flex-col gap-10">
        <div className="grid gap-10 md:gap-14 lg:grid-cols-2">
          <CrossAnalysis insights={analysis.analysis.insights} />
          <NextSteps actions={analysis.recommendations.actions} />
        </div>

        <VigilancePoint
          warning={analysis.recommendations.warning}
          tensions={analysis.analysis.tensions}
        />
      </div>
    </MainLayout>
  );
}
