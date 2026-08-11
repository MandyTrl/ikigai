"use client";
import { motion } from "motion/react";
import { Eyebrow } from "../../UI/Eyebrow";

type IntroDefinitionProps = {
  isInView: boolean;
};

const fadeIn = (isInView: boolean, delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
  transition: { duration: 0.55, delay, ease: "easeOut" as const },
});

export const IntroDefinition = ({ isInView }: IntroDefinitionProps) => (
  <div className="w-full max-w-3xl mx-auto flex flex-col gap-5 md:gap-6 text-base md:text-xl rounded-2xl border border-line bg-surface/70 px-7 py-9 md:px-12 md:py-12 shadow-(--shadow-soft)">
    <Eyebrow text="哲学 — la philosophie" withDot />

    <motion.p {...fadeIn(isInView, 0.9)} className="leading-relaxed">
      L&apos;ikigai est une philosophie japonaise qui repose sur
      l&apos;alignement avec soi-même en identifiant ce qui compte vraiment pour
      vous. Une fois trouvé, il procure clarté et joie au quotidien.
    </motion.p>

    <motion.p {...fadeIn(isInView, 1.05)} className="leading-relaxed">
      <strong>Ikig-</strong>
      <span className="text-secondary font-bold font-andika">ai</span> est un
      outil conçu pour aider à clarifier votre réflexion, en combinant cette{" "}
      <span className="underline decoration-tertiary font-medium">
        philosophie japonaise
      </span>{" "}
      à{" "}
      <span className="underline decoration-accentbis font-medium">
        l&apos;intelligence artificielle
      </span>
      .
    </motion.p>
  </div>
);
