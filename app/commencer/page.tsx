"use client";
import { useContext, useEffect } from "react";
import { YourIkigaiLayout } from "../components/Layouts/YourIkigaiLayout";
import { IkigaiContext } from "../context/IkigaiContext";
import { FormLayout } from "../components/Layouts/FormLayout";
import { IkigaiStepEnum, PillarStateEnum } from "../types";

export default function YourIkigai() {
  const { currentStep, ikigaiForm } = useContext(IkigaiContext);

  const selectedMainstay = ikigaiForm.find((el) => el.mainstay === currentStep);

  const isMainstaySelectionPending =
    selectedMainstay?.progressState === PillarStateEnum.IS_SELECTED;

  //génère une transition à chaque changement d'étape
  useEffect(() => {
    if ("startViewTransition" in document) {
      document.startViewTransition(() => {});
    }
  }, [currentStep]);

  return (
    <div className="w-full min-h-[calc(100svh-40px)] flex flex-col md:flex-row gap-10 p-10 bg-secondary/20">
      {currentStep === IkigaiStepEnum.INITIAL ? (
        <YourIkigaiLayout />
      ) : selectedMainstay && !isMainstaySelectionPending ? (
        <FormLayout />
      ) : null}
    </div>
  );
}
