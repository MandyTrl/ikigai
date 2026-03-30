"use client";

import { useContext } from "react";
import clsx from "clsx";
import { CheckIcon, ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import { IkigaiContext } from "@/app/context/IkigaiContext";
import { IkigaiStepEnum } from "@/app/types";

type QuestionTabsProps = {
  answers: string[];
  currentQuestionIndex: number;
  onQuestionChange: (index: number) => void;
};

export const QuestionTabs = ({
  answers,
  currentQuestionIndex,
  onQuestionChange,
}: QuestionTabsProps) => {
  const { setStep } = useContext(IkigaiContext);

  return (
    <div className="flex items-center gap-3 px-2">
      <button
        type="button"
        onClick={() => setStep(IkigaiStepEnum.INITIAL)}
        aria-label="Revenir aux piliers"
        className="group flex shrink-0 items-center justify-center cursor-pointer"
      >
        <ArrowLeftIcon
          size={22}
          weight="regular"
          className="text-primary/45 transition-colors duration-200 group-hover:text-primary"
        />
      </button>

      <div className="flex items-end gap-2 overflow-x-auto pb-0.5">
        {answers.map((answer, index) => {
          const isActive = currentQuestionIndex === index;
          const isCompleted = answer.trim().length > 0;
          const questionTabTitle = isActive
            ? `[ Question ${index + 1} ]`
            : `Question ${index + 1}`;

          return (
            <button
              key={index}
              type="button"
              onClick={() => onQuestionChange(index)}
              aria-current={isActive ? "step" : undefined}
              className={clsx(
                "relative flex shrink-0 items-center gap-2 mx-2 my-3 text-base md:text-lg transition-all duration-200 ease-out cursor-pointer",
                isActive
                  ? "text-primary"
                  : " text-slate-400 hover:text-primary",
              )}
            >
              <span>{questionTabTitle}</span>

              {isCompleted && (
                <CheckIcon
                  size={18}
                  weight="bold"
                  className={clsx(
                    "transition-transform duration-200",
                    isActive ? "text-emerald-700" : "text-emerald-700/90",
                  )}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
