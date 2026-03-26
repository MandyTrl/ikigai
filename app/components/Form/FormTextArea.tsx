"use client";
import { useContext, useEffect, useMemo, useState } from "react";
import {
  IkigaiContext,
  IkigaiStepEnum,
  PillarStateEnum,
} from "@/app/context/IkigaiContext";
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
  const isCurrentAnswerEmpty = answers[questionIndex].trim().length === 0;
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

    if (!currentAnswer) {
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
    <div className="flex flex-col gap-6 p-[2.5rem] pt-0">
      <div className="flex flex-col gap-1 text-slate-500">
        <p className="text-lg">{answeredCount}/3 réponses renseignées</p>

        <p className="text-sm">
          Il faut au moins 2 réponses remplies pour valider ce pilier.
        </p>

        {isCurrentPillarComplete && (
          <p className="text-sm text-green-700">
            Ce pilier est prêt pour l’analyse.
          </p>
        )}
      </div>

      <>
        <div key={questionIndex} className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <label className="text-2xl font-medium">{question.question}</label>
            <span>{question.details}</span>
          </div>

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
            className="w-full min-h-1/2 h-full p-5 inset-shadow-lg border border-secondary/80 focus:border-secondary focus:outline-none focus:bg-secondary/10 resize-none mt-5 rounded-2xl duration-200 ease-in-out transition-all selection:bg-secondary/40 active::bg-secondary/40"
          />

          <p
            className={clsx(
              errorMsg
                ? "opacity-100 translate-y-2"
                : "opacity-0 translate-y-0",
              "text-red-600 font-andika text-sm min-h-5 ml-2 transition-all duration-300 ease-out",
            )}
          >
            {errorMsg}
          </p>
        </div>

        {mainstayInfoFound.help[questionIndex] && (
          <Collapse items={[mainstayInfoFound.help[questionIndex]]} />
        )}

        <button
          onClick={handleNext}
          className={
            "mt-4 px-5 py-3 bg-secondary rounded-xl cursor-pointer text-lg disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-auto hover:opacity-85 transition-opacity duration-100 ease-in"
          }
          disabled={isCurrentAnswerEmpty}
        >
          Terminer ce pilier
        </button>
      </>
    </div>
  );
};
