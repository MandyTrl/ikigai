"use client";
import { useContext } from "react";
import { IkigaiContext } from "@/app/context/IkigaiContext";
import { ikigaiMainstay } from "@/app/utils/datas/ikigaiMainstay";

export const PillarIdentity = () => {
  const { currentStep } = useContext(IkigaiContext);

  const pillar = ikigaiMainstay.find((m) => m.mainstay === currentStep);

  if (!pillar) return null;

  return (
    <p className="flex items-baseline gap-2.5 text-secondary">
      <span
        aria-hidden
        className="font-arima text-3xl leading-none text-tertiary"
      >
        {pillar.kanji}
      </span>

      <span className="font-mono text-[0.72rem] uppercase tracking-[0.3em]">
        {pillar.title}
      </span>
    </p>
  );
};
