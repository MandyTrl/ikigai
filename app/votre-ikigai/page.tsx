"use client";
import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { IkigaiContext } from "../context/IkigaiContext";
import { MainLayout } from "../components/Layouts/MainLayout";
import { canAnalyzeIkigai } from "../utils/validateForm";

export default function YourIkigai() {
  const router = useRouter();
  const { ikigaiForm } = useContext(IkigaiContext);

  //redirection
  useEffect(() => {
    const isValid = canAnalyzeIkigai(ikigaiForm);
    if (!isValid) {
      router.push("/commencer");
    }
  }, [ikigaiForm, router]);

  if (!canAnalyzeIkigai(ikigaiForm)) {
    return <p content={"Redirection en cours..."} />;
  }

  return (
    <MainLayout>
      <h1>Votre Ikigai</h1>
    </MainLayout>
  );
}
