"use client";
import { useContext, useEffect, useMemo, useState } from "react";
import { IkigaiContext } from "@/app/context/IkigaiContext";
import {
  IkigaiMainstay,
  ikigaiMainstay,
} from "@/app/utils/datas/ikigaiMainstay";
import clsx from "clsx";
import {
  getFilledAnswersCount,
  isPillarCompleteForAnalysis,
} from "@/app/utils/validateForm";
import { IkigaiStepEnum, PillarStateEnum } from "@/app/types";
import { Button, ButtonSizeEnum, ButtonVariantEnum } from "../UI/Button";
import { Title } from "../UI/Title";
import { FormHelp } from "./FormHelp";
import { Collapse } from "../UI/Collapse";

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
      <div key={questionIndex} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <Title variant="h3" as="h2" text={question.question} />

          <span className="text-sm md:text-base">{question.details}</span>
        </div>

        {mainstayInfoFound.help[questionIndex] && (
          <FormHelp help={mainstayInfoFound.help[questionIndex]} />
        )}

        <Collapse
          label="à propos de ce pilier"
          content={mainstayInfoFound.sectionDescription}
        />

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
          className="w-full p-4 border border-secondary/25 rounded-sm focus:border-neon/50 focus:ring-1 focus:ring-tertiary/5 focus:outline-none focus:bg-white/50 resize-none mt-2 duration-200 ease-in-out transition-all bg-white/40 font-mono text-sm leading-relaxed placeholder:text-secondary/35 placeholder:font-mono placeholder:text-sm"
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
  );
};
