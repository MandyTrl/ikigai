"use client";
import { useContext } from "react";
import { motion } from "motion/react";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import { IkigaiContext } from "@/app/context/IkigaiContext";
import { IkigaiStepEnum } from "@/app/types";
import {
  getFilledAnswersCount,
  isAnswerFilled,
  MIN_ANSWERS_REQUIRED_PER_PILLAR,
} from "@/app/utils/validateForm";
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
  const isSealed =
    getFilledAnswersCount(answers) >= MIN_ANSWERS_REQUIRED_PER_PILLAR;

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
          className="flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-secondary/25 text-secondary/70 transition-all duration-200 hover:border-secondary/40 hover:text-secondary hover:shadow-offset active:shadow-none"
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

      <motion.p
        key={String(isSealed)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="pl-1 font-mono text-[10px] tracking-wide text-secondary/50"
      >
        {isSealed
          ? "pilier scellé · vos réponses sont gardées"
          : "ordre libre · 2 réponses suffisent"}
      </motion.p>
    </div>
  );
};
