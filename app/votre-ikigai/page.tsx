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
import { IkigaiSummary } from "../components/Analyze/IkigaiSummary";
import { JobCard } from "../components/Analyze/JobCard";
import { PillarAnalysis } from "../components/Analyze/PillarAnalysis";
import { Title } from "../components/UI/Title";

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
      router.replace("/votre-ikigai");
      return;
    }

    setAnalysis(cache.result as IkigaiAnalysisResult);
  }, [ikigaiForm, router, signature]);

  if (!analysis) {
    return <p>Chargement de votre analyse...</p>;
  }

  return (
    <MainLayout>
      <section className="flex flex-col gap-8 px-4 py-10">
        <header className="space-y-3">
          <Title text="Votre Ikigai" />
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
            Une synthèse de votre profil et de vos pistes métiers
          </p>
        </header>

        <IkigaiSummary
          summary={analysis.summary}
          recommendations={analysis.recommendations}
          confidence={analysis.confidence}
          tags={analysis.tags}
        />

        <section id="top-3-job" className="space-y-4">
          <Title as="h2" text="Top 3 métiers" />

          <div className="grid gap-4 lg:grid-cols-3">
            {analysis.jobs.map((job, index) => (
              <JobCard key={job.title} job={job} rank={index + 1} />
            ))}
          </div>
        </section>

        <PillarAnalysis analysis={analysis.analysis} />
      </section>
    </MainLayout>
  );
}
