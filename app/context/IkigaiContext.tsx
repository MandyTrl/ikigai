import { createContext } from "react";

export enum IkigaiStepEnum {
  INITIAL = "initial",
  LOVE = "love",
  NEEDS = "needs",
  PAID = "paid",
  TALENT = "talent",
  RESUME = "resume",
}

export type IkigaiPillarStep = Exclude<
  IkigaiStepEnum,
  IkigaiStepEnum.INITIAL | IkigaiStepEnum.RESUME
>;

export const colorMap: Record<IkigaiPillarStep, string> = {
  [IkigaiStepEnum.LOVE]: "#b6d4db",
  [IkigaiStepEnum.NEEDS]: "#ffefe5",
  [IkigaiStepEnum.PAID]: "#c9def7",
  [IkigaiStepEnum.TALENT]: "#eed2d7",
};

// <Record<Clé, Valeur>
// Partial<T> rend les attributs obsolètes

export enum PillarStateEnum {
  NOT_STARTED = "not_started",
  IS_SELECTED = "is_selected",
  IN_PROGRESS = "in_progress",
  IS_SAVED = "is_saved",
  FINISHED = "finished",
}

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
  setStep: () => {},
  updateForm: () => {},
  savePillar: () => {},
  resetIkigai: () => {},
});
