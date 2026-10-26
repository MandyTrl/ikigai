"use client";
import { useContext } from "react";
import { YourIkigaiLayout } from "../components/Layouts/YourIkigaiLayout";
import { IkigaiContext } from "../context/IkigaiContext";
import { FormLayout } from "../components/Layouts/FormLayout";
import { IkigaiStepEnum, PillarStateEnum } from "../types";

// La transition entre étapes est déclenchée par setStep (AppProviders)
export default function YourIkigai() {
  const { currentStep, ikigaiForm } = useContext(IkigaiContext);

  const selectedMainstay = ikigaiForm.find((el) => el.mainstay === currentStep);

  const isMainstaySelectionPending =
    selectedMainstay?.progressState === PillarStateEnum.IS_SELECTED;

  return (
    <div className="w-full min-h-[calc(100svh-40px)]">
      {currentStep === IkigaiStepEnum.INITIAL ? (
        <YourIkigaiLayout />
      ) : selectedMainstay && !isMainstaySelectionPending ? (
        <FormLayout />
      ) : null}
    </div>
  );
}
