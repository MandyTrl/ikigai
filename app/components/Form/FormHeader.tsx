"use client";
import { useContext } from "react";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import { IkigaiContext } from "@/app/context/IkigaiContext";
import { IkigaiStepEnum } from "@/app/types";

const PILLAR_ORDER: Partial<Record<IkigaiStepEnum, number>> = {
  [IkigaiStepEnum.LOVE]: 1,
  [IkigaiStepEnum.NEEDS]: 2,
  [IkigaiStepEnum.PAID]: 3,
  [IkigaiStepEnum.TALENT]: 4,
};

export const FormHeader = () => {
  const { setStep, currentStep } = useContext(IkigaiContext);
  const pillarNumber = PILLAR_ORDER[currentStep];

  return (
    <div className="flex items-center justify-between gap-4 pb-8 md:pb-14">
      <button
        type="button"
        onClick={() => setStep(IkigaiStepEnum.INITIAL)}
        aria-label="Revenir aux piliers"
        className="flex shrink-0 items-center gap-2 cursor-pointer text-secondary transition-opacity duration-200 opacity-80 hover:opacity-100 font-mono text-xs tracking-widest uppercase"
      >
        <ArrowLeftIcon size={20} weight="regular" />

        <span>retour</span>
      </button>

      {pillarNumber !== undefined && (
        <span className="text-xs tracking-widest uppercase text-secondary shrink-0">
          pilier {String(pillarNumber).padStart(2, "0")} / 04
        </span>
      )}
    </div>
  );
};