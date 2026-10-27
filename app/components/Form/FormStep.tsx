"use client";
import { CSSProperties, useEffect, useRef } from "react";
import { motion, useAnimationControls } from "motion/react";
import clsx from "clsx";

type FormStepProps = {
  index: number;
  isActive: boolean;
  isCompleted: boolean;
  isStarted: boolean;
  accentColor: string;
  onClick: () => void;
};

const LAYOUT_TRANSITION = {
  layout: { duration: 0.28, ease: [0.4, 0, 0.2, 1] as const },
};

export const FormStep = ({
  index,
  isActive,
  isCompleted,
  isStarted,
  accentColor,
  onClick,
}: FormStepProps) => {
  const controls = useAnimationControls();
  const prevCompleted = useRef(isCompleted);

  useEffect(() => {
    if (isCompleted && !prevCompleted.current) {
      controls.start({
        scale: [1, 1.14, 1],
        transition: { duration: 0.42, ease: [0.34, 1.56, 0.64, 1] },
      });
    }
    prevCompleted.current = isCompleted;
  }, [isCompleted, controls]);

  const status = isCompleted ? "complétée" : isStarted ? "en cours" : "à faire";

  return (
    <motion.button
      layout
      transition={LAYOUT_TRANSITION}
      type="button"
      onClick={onClick}
      aria-current={isActive ? "step" : undefined}
      aria-label={`Question ${index + 1} — ${status}${
        isActive ? ", sélectionnée" : ""
      }`}
      style={{ "--accent": accentColor } as CSSProperties}
      className={clsx(
        "flex h-14 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-xl border text-sm transition-[color,background-color,border-color,box-shadow] duration-200 ease-in-out hover:shadow-offset active:shadow-none",
        isActive ? "px-6 border-accent bg-accent text-support" : "w-14",
        isCompleted &&
          !isActive &&
          "border-[1.5px] border-accent/60 bg-accent/10 text-accent",
        isStarted &&
          !isActive &&
          "border-dashed border-accent/40 bg-accent/8 text-accent",
        !isActive &&
          !isCompleted &&
          !isStarted &&
          "border-secondary/25 text-secondary/45 hover:text-secondary/80",
      )}
    >
      <motion.span animate={controls} className="flex items-center gap-2">
        {isActive && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="whitespace-nowrap"
          >
            Question
          </motion.span>
        )}
        <span>{index + 1}</span>
      </motion.span>
    </motion.button>
  );
};
