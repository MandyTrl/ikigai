"use client";
import { Fragment } from "react";
import clsx from "clsx";
import { isAnswerFilled } from "@/app/utils/validateForm";

type QuestionNavMobileProps = {
  answers: string[];
  currentQuestionIndex: number;
  onQuestionChange: (index: number) => void;
  accentColor?: string;
};

export const QuestionNavMobile = ({
  answers,
  currentQuestionIndex,
  onQuestionChange,
  accentColor = "#d4a574",
}: QuestionNavMobileProps) => {
  return (
    <nav className="flex items-center gap-2 lg:hidden" aria-label="Progression">
      {answers.map((answer, index) => {
        const isActive = currentQuestionIndex === index;
        const isCompleted = isAnswerFilled(answer);
        const isLast = index === answers.length - 1;
        const onAccent = isActive || isCompleted;

        return (
          <Fragment key={index}>
            <button
              type="button"
              onClick={() => onQuestionChange(index)}
              aria-current={isActive ? "step" : undefined}
              aria-label={`Question ${index + 1}`}
              className="shrink-0 cursor-pointer py-1"
            >
              <span
                className={clsx(
                  "block h-2.5 rounded-full transition-all duration-300",
                  isActive ? "w-7" : "w-4",
                  !onAccent && "bg-secondary/25",
                )}
                style={
                  onAccent
                    ? { backgroundColor: accentColor, opacity: isActive ? 1 : 0.6 }
                    : undefined
                }
              />
            </button>

            {!isLast && <span className="h-px w-3 bg-secondary/25" />}
          </Fragment>
        );
      })}
    </nav>
  );
};