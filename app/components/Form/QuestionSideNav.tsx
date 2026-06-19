"use client";
import { Fragment } from "react";
import clsx from "clsx";
import { CheckIcon } from "@phosphor-icons/react/dist/ssr";

type QuestionSideNavProps = {
  answers: string[];
  currentQuestionIndex: number;
  onQuestionChange: (index: number) => void;
};

export const QuestionSideNav = ({
  answers,
  currentQuestionIndex,
  onQuestionChange,
}: QuestionSideNavProps) => {
  return (
    <nav className="flex flex-col font-mono w-36">
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
              className={clsx(
                "group flex items-center gap-2.5 cursor-pointer rounded px-2 py-1 -mx-2 transition-colors duration-200",
                isActive ? "bg-accent/50" : "hover:bg-secondary/8",
              )}
            >
              {/* Number */}
              <span
                className={clsx(
                  "w-5 text-right shrink-0 transition-colors duration-200",
                  isActive && "text-neon/80",
                  isCompleted &&
                    !isActive &&
                    "text-emerald-700/70 group-hover:text-emerald-700/90",
                  !isCompleted &&
                    !isActive &&
                    "text-secondary/35 group-hover:text-secondary/50",
                )}
              >
                {number}
              </span>

              {/* Circle indicator */}
              <div className="relative shrink-0 w-2.5 h-2.5">
                <div
                  className={clsx(
                    "w-2.5 h-2.5 rounded-full border transition-all duration-300",
                    isActive && "bg-neon border-transparent",
                    isCompleted &&
                      !isActive &&
                      "bg-emerald-600/60 border-transparent group-hover:bg-emerald-600/80",
                    !isCompleted &&
                      !isActive &&
                      "bg-transparent border-secondary/35 group-hover:border-secondary/55",
                  )}
                />
              </div>

              {/* Status */}
              <span
                className={clsx(
                  "inline-flex text-[10px] tracking-widest uppercase items-center gap-1 whitespace-nowrap transition-colors duration-200",
                  isActive && "text-neon/80",
                  isCompleted &&
                    !isActive &&
                    "text-emerald-700/65 group-hover:text-emerald-700/85",
                  !isCompleted &&
                    !isActive &&
                    "text-secondary/35 group-hover:text-secondary/50",
                )}
              >
                {isActive && "en cours"}
                {isCompleted && !isActive && (
                  <>
                    <CheckIcon size={8} weight="bold" />
                    complété
                  </>
                )}
                {!isCompleted && !isActive && "à faire"}
              </span>
            </button>

            {!isLast && (
              // ml = number(w-5=20px) + gap-2.5(10px) + half circle(5px) = 35px
              <div className="h-16 border-l border-dashed border-secondary/45 ml-[35px]" />
            )}
          </Fragment>
        );
      })}
    </nav>
  );
};
