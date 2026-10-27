"use client";
import { CSSProperties, useContext, useEffect, useMemo, useRef, useState } from "react";
import { IkigaiContext } from "@/app/context/IkigaiContext";
import {
  IkigaiMainstay,
  ikigaiMainstay,
} from "@/app/utils/datas/ikigaiMainstay";
import {
  getFilledAnswersCount,
  isAnswerFilled,
  MIN_ANSWER_LENGTH,
} from "@/app/utils/validateForm";
import { IkigaiStepEnum, PillarStateEnum } from "@/app/types";
import { Button, ButtonSizeEnum, ButtonVariantEnum } from "../UI/Button";
import { AnswerCounter } from "./AnswerCounter";

export const EMPTY_ANSWERS = ["", "", ""];

type FormTextAreaProps = {
  questionIndex: number;
  setQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
};

export const FormTextArea = ({
  questionIndex,
  setQuestionIndex,
}: FormTextAreaProps) => {
  const { currentStep, ikigaiForm, updateForm, savePillar, setStep } =
    useContext(IkigaiContext);

  const mainstayData = useMemo(
    () => ikigaiForm.find((entry) => entry.mainstay === currentStep),
    [ikigaiForm, currentStep],
  );

  const [answers, setAnswers] = useState<string[]>(
    () => mainstayData?.answers ?? EMPTY_ANSWERS,
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const mainstayInfoFound: IkigaiMainstay | undefined = ikigaiMainstay.find(
    (el) => el.mainstay === currentStep,
  );

 
  useEffect(() => {
    textareaRef.current?.focus({ preventScroll: true });
  }, [questionIndex, currentStep]);

  // Réponses tapées mais pas encore sauvées par le debounce.
  const pendingAnswersRef = useRef<string[] | null>(null);

  // Auto-save après un court debounce si la réponse a changé.
  useEffect(() => {
    if (!mainstayData) return;
    if (JSON.stringify(mainstayData.answers) === JSON.stringify(answers)) {
      pendingAnswersRef.current = null;
      return;
    }

    pendingAnswersRef.current = answers;
    const timer = setTimeout(() => {
      updateForm(currentStep, {
        answers,
        progressState:
          getFilledAnswersCount(answers) > 0
            ? PillarStateEnum.IN_PROGRESS
            : PillarStateEnum.NOT_STARTED,
      });
      pendingAnswersRef.current = null;
    }, 500);

    return () => clearTimeout(timer);
  }, [answers, currentStep, mainstayData, updateForm]);

  // Quitter le formulaire (flèche ←) annule le debounce en cours : on sauve ce
  // qui reste, sinon les derniers caractères tapés étaient perdus.
  useEffect(
    () => () => {
      const pendingAnswers = pendingAnswersRef.current;
      if (pendingAnswers) savePillar(currentStep, pendingAnswers);
    },
    [currentStep, savePillar],
  );

  if (!mainstayInfoFound) return null;

  // Prochaine question encore à remplir après la courante (en bouclant).
  const nextQuestionIndex = answers
    .map((_, offset) => (questionIndex + 1 + offset) % answers.length)
    .find((index) => index !== questionIndex && !isAnswerFilled(answers[index]));
  const hasNextQuestion = nextQuestionIndex !== undefined;

  const currentLength = answers[questionIndex].trim().length;

  const handleChange = (value: string) => {
    const updated = [...answers];
    updated[questionIndex] = value;
    setAnswers(updated);
  };

  const handleFinish = () => {
    savePillar(currentStep, answers);
    setStep(IkigaiStepEnum.INITIAL);
  };

  const handleContinue = () => {
    if (hasNextQuestion) setQuestionIndex(nextQuestionIndex);
  };

  return (
    <div className="flex flex-col gap-3">
      <textarea
        key={questionIndex}
        ref={textareaRef}
        id={mainstayInfoFound.mainstay}
        name={mainstayInfoFound.mainstay}
        value={answers[questionIndex]}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Votre réponse..."
        rows={6}
        autoComplete="off"
        autoCapitalize="sentences"
        wrap="hard"
        style={
          {
            "--pillar": mainstayInfoFound.accent,
            "--pillar-soft": `${mainstayInfoFound.accent}2e`,
          } as CSSProperties
        }
        className="w-full p-4 rounded-2xl border border-line bg-surface resize-none md:min-h-[13.5rem] transition-all duration-200 ease-in-out font-mono text-sm leading-relaxed placeholder:text-secondary/35 focus:outline-none focus:border-[var(--pillar)] focus:ring-4 focus:ring-[var(--pillar-soft)]"
      />

      <AnswerCounter
        length={currentLength}
        min={MIN_ANSWER_LENGTH}
        accentColor={mainstayInfoFound.accent}
      />

   
      <div className="flex items-center justify-end gap-4">
        <Button
          onClick={hasNextQuestion ? handleContinue : handleFinish}
          label={hasNextQuestion ? "Question suivante" : "Terminer ce pilier"}
          size={ButtonSizeEnum.S}
          fullWidth
          variant={
            hasNextQuestion
              ? ButtonVariantEnum.Outline
              : ButtonVariantEnum.Primary
          }
        />
      </div>
    </div>
  );
};