"use client";
import { useContext, useEffect, useMemo, useState } from "react";
import { IkigaiContext } from "@/app/context/IkigaiContext";
import {
  IkigaiMainstay,
  ikigaiMainstay,
} from "@/app/utils/datas/ikigaiMainstay";
import {
  CheckCircleIcon,
  LightbulbFilamentIcon,
  TrashIcon,
} from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import { Collapse } from "../UI/Collapse";
import {
  getFilledAnswersCount,
  isPillarCompleteForAnalysis,
} from "@/app/utils/validateForm";
import { IkigaiStepEnum, PillarStateEnum } from "@/app/types";
import { Button, ButtonSizeEnum, ButtonVariantEnum } from "../UI/Button";

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

  const [answers, setAnswers] = useState<string[]>(EMPTY_ANSWERS);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const mainstayData = useMemo(
    () => ikigaiForm.find((entry) => entry.mainstay === currentStep),
    [ikigaiForm, currentStep],
  );

  const mainstayInfoFound: IkigaiMainstay | undefined = ikigaiMainstay.find(
    (el) => el.mainstay === currentStep,
  );

  useEffect(() => {
    setAnswers(mainstayData?.answers ?? EMPTY_ANSWERS);
    setErrorMsg(null);
  }, [currentStep]);

  // auto-save after debounce if it's not changed
  useEffect(() => {
    if (!mainstayData) return;

    if (JSON.stringify(mainstayData.answers) === JSON.stringify(answers))
      return;

    const timer = setTimeout(() => {
      updateForm(currentStep, {
        answers,
        progressState:
          getFilledAnswersCount(answers) > 0
            ? PillarStateEnum.IN_PROGRESS
            : PillarStateEnum.NOT_STARTED,
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [answers, currentStep, mainstayData, updateForm]);

  if (!mainstayInfoFound) return null;

  const question = mainstayInfoFound.instructions[questionIndex];
  const answeredCount = getFilledAnswersCount(answers);
  const isLastQuestion =
    questionIndex === mainstayInfoFound.instructions.length - 1;
  const isCurrentPillarComplete = mainstayData
    ? isPillarCompleteForAnalysis(mainstayData)
    : answeredCount >= 2;

  const handleChange = (value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = value;
    setAnswers(updatedAnswers);

    if (errorMsg) {
      setErrorMsg(null);
    }
  };

  const handleNext = () => {
    const currentAnswer = answers[questionIndex].trim();

    if (!currentAnswer && !isCurrentPillarComplete) {
      setErrorMsg("Veuillez écrire une réponse avant de continuer.");
      return;
    }

    setErrorMsg(null);

    if (!isLastQuestion) {
      setQuestionIndex((prev) => prev + 1);
      return;
    }

    savePillar(currentStep, answers);
    setStep(IkigaiStepEnum.INITIAL);
  };

  const handlePrevious = () => {
    if (questionIndex === 0) return;

    setErrorMsg(null);
    setQuestionIndex((prev) => prev - 1);
  };

  return (
    <div className="flex flex-col gap-6">
      <div key={questionIndex} className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <label className="text-xl md:text-2xl font-medium leading-snug">
            {question.question}
          </label>
          <span className="text-sm md:text-base text-slate-600">
            {question.details}
          </span>
        </div>

        {mainstayInfoFound.help[questionIndex] && (
          <Collapse items={[mainstayInfoFound.help[questionIndex]]} />
        )}

        <textarea
          id={mainstayInfoFound.mainstay}
          name={mainstayInfoFound.mainstay}
          value={answers[questionIndex]}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Votre réponse..."
          rows={6}
          autoComplete="off"
          autoCapitalize="sentences"
          wrap="hard"
          className="w-full p-4 inset-shadow-lg border border-secondary/80 rounded-2xl focus:border-secondary focus:outline-none focus:bg-white/70 resize-none mt-2 duration-200 ease-in-out transition-all bg-white/50 selection:bg-white/70 active::bg-white/70"
        />

        <p
          className={clsx(
            errorMsg ? "opacity-100 translate-y-2" : "opacity-0 translate-y-0",
            "text-red-600 font-andika text-sm min-h-5 ml-2 transition-all duration-300 ease-out",
          )}
        >
          {errorMsg}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-secondary/15">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-mono text-xs tracking-widest uppercase text-secondary/85">
            <span className="text-tertiary">{"// "}</span>
            {answeredCount}/3 réponses
          </span>

          {isCurrentPillarComplete && (
            <span className="flex items-center gap-1 text-sm text-emerald-700">
              <CheckCircleIcon size={14} weight="fill" />
              prêt pour l’analyse
            </span>
          )}
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleNext}
            disabled={!isCurrentPillarComplete}
            label="Terminer ce pilier"
            size={ButtonSizeEnum.S}
            variant={ButtonVariantEnum.Outline}
          />
        </div>
      </div>
    </div>
  );
};
