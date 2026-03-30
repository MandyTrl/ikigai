"use client";

import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { IkigaiContext } from "../context/IkigaiContext";
import { MainLayout } from "../components/Layouts/MainLayout";
import { canAnalyzeIkigai } from "../utils/validateForm";

export default function YourIkigai() {
  const router = useRouter();
  const { ikigaiForm } = useContext(IkigaiContext);
  const [analysis, setAnalysis] = useState<unknown>(null);

  useEffect(() => {
    if (!canAnalyzeIkigai(ikigaiForm)) {
      router.push("/commencer");
    }
  }, [ikigaiForm, router]);

  useEffect(() => {
    const stored = sessionStorage.getItem("ikigai-analysis-result");

    if (stored) {
      setAnalysis(JSON.parse(stored));
    }
  }, []);

  if (!canAnalyzeIkigai(ikigaiForm)) {
    return <p>Redirection en cours...</p>;
  }

  if (!analysis) {
    return <p>Aucune analyse disponible.</p>;
  }

  return (
    <MainLayout>
      <h1>Votre Ikigai</h1>

      <pre className="whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm">
        {JSON.stringify(analysis, null, 2)}
      </pre>
    </MainLayout>
  );
}
