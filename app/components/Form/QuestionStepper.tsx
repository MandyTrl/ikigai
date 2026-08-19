"use client";
import { CheckIcon } from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import {
  getFilledAnswersCount,
  isAnswerFilled,
} from "@/app/utils/validateForm";

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
    <div className="flex flex-col gap-3">
      <nav
        className="flex items-center gap-2.5 font-mono"
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
              className={clsx(
                "group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border text-sm transition-all duration-200 hover:-translate-y-0.5",
                !isActive &&
                  !isCompleted &&
                  "border-secondary/25 text-secondary/40 hover:text-secondary/80",
                isActive && "hover:brightness-105",
              )}
              style={
                isActive
                  ? {
                      backgroundColor: accentColor,
                      borderColor: accentColor,
                      color: "#faf7f2",
                    }
                  : isCompleted
                    ? {
                        backgroundColor: `${accentColor}1f`,
                        borderColor: `${accentColor}66`,
                        color: accentColor,
                      }
                    : undefined
              }
            >
              {!isActive && (
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  style={{ backgroundColor: `${accentColor}1f` }}
                />
              )}
              <span className="relative">{number}</span>
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
