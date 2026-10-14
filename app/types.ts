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

// <Record<Clé, Valeur>
// Partial<T> rend les attributs obsolètes

export enum PillarStateEnum {
  NOT_STARTED = "not_started",
  IS_SELECTED = "is_selected",
  IN_PROGRESS = "in_progress",
  IS_SAVED = "is_saved",
  FINISHED = "finished",
}

export type MbtiType =
  | "INTJ"
  | "INTP"
  | "ENTJ"
  | "ENTP"
  | "INFJ"
  | "INFP"
  | "ENFJ"
  | "ENFP"
  | "ISTJ"
  | "ISFJ"
  | "ESTJ"
  | "ESFJ"
  | "ISTP"
  | "ISFP"
  | "ESTP"
  | "ESFP";

export type DiscColor = "red" | "yellow" | "green" | "blue";
