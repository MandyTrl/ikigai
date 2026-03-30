"use client";
import { useContext } from "react";
import { IkigaiContext } from "@/app/context/IkigaiContext";
import {
  IkigaiMainstay,
  ikigaiMainstay,
} from "@/app/utils/datas/ikigaiMainstay";
import { Button, ButtonSizeEnum } from "../UI/Button";
import clsx from "clsx";
import { PillarStateEnum } from "@/app/types";

type PillarIntroductionProps = {
  onClose: () => void;
};

export const PillarIntroduction = ({ onClose }: PillarIntroductionProps) => {
  const { setStep, ikigaiForm, updateForm } = useContext(IkigaiContext);

  const selectedMainstay = ikigaiForm.find(
    (el) => el.progressState === PillarStateEnum.IS_SELECTED,
  );

  const mainstayInfoFound: IkigaiMainstay | undefined = selectedMainstay
    ? ikigaiMainstay.find((el) => el.mainstay === selectedMainstay.mainstay)
    : undefined;

  if (!mainstayInfoFound || !selectedMainstay) return null;

  const isInProgress = selectedMainstay.answers.length > 0;

  const handleClick = () => {
    updateForm(selectedMainstay.mainstay, {
      progressState: PillarStateEnum.IN_PROGRESS,
    });

    setStep(selectedMainstay.mainstay);

    onClose();
  };

  return (
    <div>
      <h2 className="font-bold text-3xl mt-5 mb-4">
        {mainstayInfoFound.title}
      </h2>

      <p className={clsx(ikigaiMainstay && "mb-10", "bg-secondary/30 p-5")}>
        {isInProgress
          ? "Vous avez déjà commencé à remplir cette partie. Vos données ont été sauvegardées, voulez-vous reprendre où vous vous en êtiez arrêté ?"
          : mainstayInfoFound.modalDescription}
      </p>

      {!isInProgress && (
        <div className="mt-3 mb-8">
          <p className="text-lg mb-2">Ce que vous allez faire :</p>
          <ul className="border border-secondary rounded-lg p-5">
            {mainstayInfoFound.modalGuidelines.map((guideline, index) => (
              <li key={index}>
                <span className="mr-2">✓</span>
                {guideline}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Button
        title={isInProgress ? "Continuer l'exploration" : "Explorer ce pilier"}
        onClick={handleClick}
        size={ButtonSizeEnum.S}
      />
    </div>
  );
};
