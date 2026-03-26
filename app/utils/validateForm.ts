import { IkigaiForm } from "../context/IkigaiContext";

const MIN_ANSWERS_REQUIRED_PER_PILLAR = 2;

export const getFilledAnswersCount = (answers: string[]) => {
  return answers.filter((answer) => answer.trim().length > 0).length;
};

export const isPillarCompleteForAnalysis = (pillar: IkigaiForm) => {
  return (
    getFilledAnswersCount(pillar.answers) >= MIN_ANSWERS_REQUIRED_PER_PILLAR
  );
};

export const canAnalyzeIkigai = (ikigaiForm: IkigaiForm[]) => {
  return ikigaiForm.every(isPillarCompleteForAnalysis);
};
