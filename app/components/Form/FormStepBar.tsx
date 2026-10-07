"use client";
import { useContext } from "react";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import { IkigaiContext } from "@/app/context/IkigaiContext";
import { IkigaiStepEnum } from "@/app/types";
import { isAnswerFilled } from "@/app/utils/validateForm";
import { FormStep } from "./FormStep";

type FormStepBarProps = {
  answers: string[];
  currentQuestionIndex: number;
  onQuestionChange: (index: number) => void;
  accentColor?: string;
};

export const FormStepBar = ({
  answers,
  currentQuestionIndex,
  onQuestionChange,
  accentColor = "#d4a574",
}: FormStepBarProps) => {
  const { setStep } = useContext(IkigaiContext);

  return (
    <div className="flex flex-col gap-2.5">
      <nav
        className="flex items-center gap-4 font-mono"
        aria-label="Navigation des questions"
      >
        <button
          type="button"
          onClick={() => setStep(IkigaiStepEnum.INITIAL)}
          aria-label="Revenir aux piliers"
          className="flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-secondary/25 text-secondary/70 transition-all duration-200 hover:border-secondary/40 hover:text-secondary hover:shadow-[4px_4px_0px_rgba(9,28,52,0.1)] active:shadow-none"
        >
          <ArrowLeftIcon size={18} weight="regular" />
        </button>

        <div className="flex items-center gap-1.5">
          {answers.map((answer, index) => {
            const isCompleted = isAnswerFilled(answer);
            const isStarted = answer.trim().length > 0 && !isCompleted;

            return (
              <FormStep
                key={index}
                index={index}
                isActive={index === currentQuestionIndex}
                isCompleted={isCompleted}
                isStarted={isStarted}
                accentColor={accentColor}
                onClick={() => onQuestionChange(index)}
              />
            );
          })}
        </div>
      </nav>

      <p className="pl-1 font-mono text-[10px] tracking-wide text-secondary/50">
        ordre libre · 2 réponses suffisent
      </p>
    </div>
  );
};
