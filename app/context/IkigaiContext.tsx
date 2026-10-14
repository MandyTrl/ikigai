import { createContext } from "react";
import { IkigaiPillarStep, IkigaiStepEnum, PillarStateEnum } from "../types";

export const colorMap: Record<IkigaiPillarStep, string> = {
  [IkigaiStepEnum.LOVE]: "#b6d4db",
  [IkigaiStepEnum.NEEDS]: "#ffefe5",
  [IkigaiStepEnum.PAID]: "#c9def7",
  [IkigaiStepEnum.TALENT]: "#eed2d7",
};

export const isIkigaiPillarStep = (
  step: IkigaiStepEnum,
): step is IkigaiPillarStep => {
  return (
    step === IkigaiStepEnum.LOVE ||
    step === IkigaiStepEnum.TALENT ||
    step === IkigaiStepEnum.PAID ||
    step === IkigaiStepEnum.NEEDS
  );
};

export type IkigaiForm = {
  mainstay: IkigaiStepEnum;
  progressState: PillarStateEnum;
  answers: string[];
};

export type IkigaiContextProps = {
  ikigaiForm: IkigaiForm[];
  currentStep: IkigaiStepEnum;
  /** false tant que le localStorage n'a pas été lu — évite de rediriger avant d'avoir restauré les réponses. */
  isHydrated: boolean;
  setStep: (step: IkigaiStepEnum) => void;
  updateForm: (
    mainstay: IkigaiStepEnum,
    field: Partial<Omit<IkigaiForm, "mainstay">>,
  ) => void;
  savePillar: (mainstay: IkigaiStepEnum, answers: string[]) => void;
  resetIkigai: () => void;
};

export const initialIkigaiForm = [
  {
    mainstay: IkigaiStepEnum.LOVE,
    progressState: PillarStateEnum.NOT_STARTED,
    answers: ["", "", ""],
  },
  {
    mainstay: IkigaiStepEnum.NEEDS,
    progressState: PillarStateEnum.NOT_STARTED,
    answers: ["", "", ""],
  },
  {
    mainstay: IkigaiStepEnum.PAID,
    progressState: PillarStateEnum.NOT_STARTED,
    answers: ["", "", ""],
  },
  {
    mainstay: IkigaiStepEnum.TALENT,
    progressState: PillarStateEnum.NOT_STARTED,
    answers: ["", "", ""],
  },
];

export const IkigaiContext = createContext<IkigaiContextProps>({
  ikigaiForm: initialIkigaiForm,
  currentStep: IkigaiStepEnum.INITIAL,
  isHydrated: true,
  setStep: () => {},
  updateForm: () => {},
  savePillar: () => {},
  resetIkigai: () => {},
});
