"use client";

import { useContext, Fragment } from "react";
import clsx from "clsx";
import { ArrowLeftIcon, CheckIcon } from "@phosphor-icons/react/dist/ssr";
import { IkigaiContext } from "@/app/context/IkigaiContext";
import { IkigaiStepEnum } from "@/app/types";

const PILLAR_ORDER: Partial<Record<IkigaiStepEnum, number>> = {
  [IkigaiStepEnum.LOVE]: 1,
  [IkigaiStepEnum.NEEDS]: 2,
  [IkigaiStepEnum.PAID]: 3,
  [IkigaiStepEnum.TALENT]: 4,
};

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
  const { setStep, currentStep } = useContext(IkigaiContext);
  const pillarNumber = PILLAR_ORDER[currentStep];

  return (
    <div className="flex flex-col gap-5 pb-8 md:pb-10">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setStep(IkigaiStepEnum.INITIAL)}
          aria-label="Revenir aux piliers"
          className="group flex shrink-0 items-center gap-2 cursor-pointer"
        >
          <ArrowLeftIcon
            size={20}
            weight="regular"
            className="text-primary/45 transition-colors duration-200 group-hover:text-primary"
          />
          <span className="font-mono text-xs tracking-widest uppercase text-secondary/55 group-hover:text-secondary transition-colors duration-200">
            retour
          </span>
        </button>

        {pillarNumber !== undefined && (
          <span className="font-mono text-xs tracking-widest uppercase text-secondary/55">
            pilier {String(pillarNumber).padStart(2, "0")} / 04
          </span>
        )}
      </div>

      <div className="flex items-start w-full">
        {answers.map((answer, index) => {
          const isActive = currentQuestionIndex === index;
          const isCompleted = answer.trim().length > 0;
          const isLast = index === answers.length - 1;
          const number = String(index + 1).padStart(2, "0");

          return (
            <Fragment key={index}>
              <button
                type="button"
                onClick={() => onQuestionChange(index)}
                aria-current={isActive ? "step" : undefined}
                aria-label={`Question ${index + 1}`}
                className="group flex flex-col items-center gap-2 shrink-0 cursor-pointer"
              >
                <span
                  className={clsx(
                    "font-mono text-sm tracking-wider flex items-center justify-center w-12 h-10 border rounded-xs transition-all duration-200",
                    isActive &&
                      "border-primary text-primary bg-white shadow-[3px_3px_0px_var(--tertiary)] -translate-y-0.5",
                    isCompleted &&
                      !isActive &&
                      "border-emerald-700/45 text-emerald-700 bg-emerald-50/30 group-hover:border-emerald-700/80",
                    !isCompleted &&
                      !isActive &&
                      "border-secondary/25 text-secondary/45 group-hover:border-secondary/60 group-hover:text-secondary/80",
                  )}
                >
                  {number}
                </span>

                <span
                  className={clsx(
                    "font-mono text-[10px] tracking-widest uppercase flex items-center gap-1 h-3 transition-colors duration-200",
                    isActive && "text-primary",
                    isCompleted && !isActive && "text-emerald-700/80",
                    !isCompleted && !isActive && "text-secondary/40",
                  )}
                >
                  {isActive && <span>en cours</span>}
                  {isCompleted && !isActive && (
                    <>
                      <CheckIcon size={11} weight="bold" />
                      <span className="hidden sm:inline">remplie</span>
                    </>
                  )}
                  {!isCompleted && !isActive && (
                    <span className="hidden sm:inline">à venir</span>
                  )}
                  {!isCompleted && !isActive && (
                    <span className="sm:hidden">·</span>
                  )}
                </span>
              </button>

              {!isLast && (
                <div
                  className={clsx(
                    "flex-1 border-t mx-2 md:mx-3 mt-5 transition-colors duration-300",
                    isCompleted
                      ? "border-emerald-700/40 border-solid"
                      : "border-secondary/25 border-dashed",
                  )}
                />
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};