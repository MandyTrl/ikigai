"use client";
import { Fragment } from "react";
import clsx from "clsx";
import { CheckIcon } from "@phosphor-icons/react/dist/ssr";
import { isAnswerFilled } from "@/app/utils/validateForm";

type QuestionSideNavProps = {
  answers: string[];
  currentQuestionIndex: number;
  onQuestionChange: (index: number) => void;
  accentColor?: string;
};

export const QuestionSideNav = ({
  answers,
  currentQuestionIndex,
  onQuestionChange,
  accentColor = "#d4a574",
}: QuestionSideNavProps) => {
  return (
    <nav className="flex flex-col font-mono w-36">
      {answers.map((answer, index) => {
        const isActive = currentQuestionIndex === index;
        const isCompleted = isAnswerFilled(answer);
        const isLast = index === answers.length - 1;
        const number = String(index + 1).padStart(2, "0");

        const onAccent = isActive || isCompleted;
        const accentStyle = onAccent
          ? { color: accentColor, opacity: isActive ? 1 : 0.65 }
          : undefined;

        return (
          <Fragment key={index}>
            <button
              type="button"
              onClick={() => onQuestionChange(index)}
              aria-current={isActive ? "step" : undefined}
              aria-label={`Question ${index + 1}`}
              className="group flex items-center gap-2.5 cursor-pointer rounded px-2 py-1 -mx-2 transition-colors duration-200"
              style={{
                backgroundColor: isActive ? `${accentColor}1f` : undefined,
              }}
            >
              {/* Numéro */}
              <span
                className={clsx(
                  "w-5 text-right shrink-0 transition-colors duration-200",
                  !onAccent &&
                    "text-secondary/35 group-hover:text-secondary/50",
                )}
                style={accentStyle}
              >
                {number}
              </span>

              {/* Pastille */}
              <div className="relative shrink-0 w-4 h-2.5">
                <div
                  className={clsx(
                    "w-4 h-2.5 rounded-full border transition-all duration-300",
                    !onAccent &&
                      "bg-transparent border-secondary/35 group-hover:border-secondary/55",
                  )}
                  style={
                    onAccent
                      ? {
                          backgroundColor: accentColor,
                          borderColor: "transparent",
                          opacity: isActive ? 1 : 0.6,
                        }
                      : undefined
                  }
                />
              </div>

              {/* Statut */}
              <span
                className={clsx(
                  "inline-flex text-[10px] tracking-widest uppercase items-center gap-1 whitespace-nowrap transition-colors duration-200",
                  !onAccent &&
                    "text-secondary/60 group-hover:text-secondary/80",
                )}
                style={accentStyle}
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
              <div className="h-16 border-l border-dashed border-secondary/45 ml-9.5" />
            )}
          </Fragment>
        );
      })}
    </nav>
  );
};
