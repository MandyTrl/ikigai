"use client";
import { CheckIcon } from "@phosphor-icons/react/dist/ssr";
import { motion } from "motion/react";
import clsx from "clsx";
import { getFilledAnswersCount, isAnswerFilled } from "@/app/utils/validateForm";

type QuestionStepperProps = {
  answers: string[];
  currentQuestionIndex: number;
  onQuestionChange: (index: number) => void;
  accentColor?: string;
};


export const QuestionStepper = ({
  answers,
  currentQuestionIndex,
  onQuestionChange,
  accentColor = "#d4a574",
}: QuestionStepperProps) => {
  const total = answers.length;
  const done = getFilledAnswersCount(answers);

  return (
    <div className="flex flex-col gap-2.5">
      <nav
        className="flex items-center gap-7 font-mono"
        aria-label="Progression des questions"
      >
        {answers.map((answer, index) => {
          const isActive = index === currentQuestionIndex;
          const isCompleted = isAnswerFilled(answer);
          const number = String(index + 1).padStart(2, "0");

          return (
            <button
              key={index}
              type="button"
              onClick={() => onQuestionChange(index)}
              aria-current={isActive ? "step" : undefined}
              aria-label={`Question ${index + 1}${
                isCompleted ? " (complétée)" : ""
              }`}
              className="group relative flex cursor-pointer items-center gap-1.5 pb-1.5 text-sm"
            >
              <span
                className={clsx(
                  "transition-colors duration-200",
                  !isActive &&
                    !isCompleted &&
                    "text-secondary/35 group-hover:text-secondary/60",
                )}
                style={
                  isActive
                    ? { color: accentColor }
                    : isCompleted
                      ? { color: accentColor, opacity: 0.6 }
                      : undefined
                }
              >
                {number}
              </span>

              {isCompleted && !isActive && (
                <CheckIcon
                  size={11}
                  weight="bold"
                  style={{ color: accentColor, opacity: 0.6 }}
                />
              )}

              {isActive && (
                <motion.span
                  layoutId="stepper-underline"
                  className="absolute bottom-0 left-0 h-[1.5px] w-full rounded-full"
                  style={{ backgroundColor: accentColor }}
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
            </button>
          );
        })}
      </nav>

      <p className="font-mono text-[11px] tracking-wide text-secondary/60">
        {done} / {total} complétées
      </p>
    </div>
  );
};