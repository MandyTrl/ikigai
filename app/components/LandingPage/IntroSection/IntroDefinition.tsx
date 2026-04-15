"use client";
import { motion } from "motion/react";

type IntroDefinitionProps = {
  isInView: boolean;
};

const fadeIn = (isInView: boolean, delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
  transition: { duration: 0.55, delay, ease: "easeOut" as const },
});

export const IntroDefinition = ({ isInView }: IntroDefinitionProps) => (
  <div className="w-full flex gap-14 text-xl leading-relaxed">
    <motion.p {...fadeIn(isInView, 0.9)} className="leading-snug">
      L&apos;ikigai est une <strong>philosophie japonaise</strong> qui repose
      sur l&apos;alignement avec soi-même en identifiant ce qui vous anime
      réellement. Une fois trouvé, il procure clarté et joie au quotidien.
    </motion.p>

    <motion.p {...fadeIn(isInView, 1.05)} className="leading-snug">
      <strong>Ikig-</strong>
      <span className="text-secondary font-bold font-andika">ai</span> est un
      outil conçu pour aider à clarifier votre réflexion, en combinant cette{" "}
      <span className="inline-block bg-accent px-2 py-1 my-1 rounded-xl border-primary">
        philosophie japonaise
      </span>{" "}
      à l&apos;{" "}
      <span className="inline-block text-white bg-accentbis px-2 py-1 my-1 rounded-xl border-primary">
        intelligence artificielle
      </span>
      .
    </motion.p>
  </div>
);