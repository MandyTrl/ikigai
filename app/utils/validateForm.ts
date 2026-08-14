import { IkigaiForm } from "../context/IkigaiContext";

const MIN_ANSWERS_REQUIRED_PER_PILLAR = 2;

export const MIN_ANSWER_LENGTH = 60;

export const isAnswerFilled = (answer: string) =>
  answer.trim().length >= MIN_ANSWER_LENGTH;

export const getFilledAnswersCount = (answers: string[]) => {
  return answers.filter(isAnswerFilled).length;
};

export const isPillarCompleteForAnalysis = (pillar: IkigaiForm) => {
  return (
    getFilledAnswersCount(pillar.answers) >= MIN_ANSWERS_REQUIRED_PER_PILLAR
  );
};

export const canAnalyzeIkigai = (ikigaiForm: IkigaiForm[]) => {
  return ikigaiForm.every(isPillarCompleteForAnalysis);
};