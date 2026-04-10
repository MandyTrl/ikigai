"use client";

import { motion, useAnimation } from "motion/react";
import { useEffect } from "react";

type KanjiRevealWordProps = {
  word: string;
  kanji: string;
  delay?: number;
  className?: string;
};

export const KanjiRevealWord = ({
  word,
  kanji,
  delay = 0,
  className = "",
}: KanjiRevealWordProps) => {
  const kanjiControls = useAnimation();
  const wordControls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await new Promise((resolve) => setTimeout(resolve, delay));
      // Phase 1 : kanji apparaît
      await kanjiControls.start({ opacity: 1, transition: { duration: 0.15 } });
      // Phase 2 : kanji reste visible
      await new Promise((resolve) => setTimeout(resolve, 250));
      // Phase 3 : crossfade
      kanjiControls.start({ opacity: 0, transition: { duration: 0.3 } });
      await wordControls.start({ opacity: 1, transition: { duration: 0.3 } });
    };
    sequence();
  }, [delay, kanjiControls, wordControls]);

  return (
    <span className={`relative inline-block ${className}`}>
      <motion.span
        initial={{ opacity: 0 }}
        animate={kanjiControls}
        className="absolute inset-0 flex items-center justify-center text-5xl"
        aria-hidden="true"
      >
        {kanji}
      </motion.span>
      <motion.span
        initial={{ opacity: 0 }}
        animate={wordControls}
        className="relative"
      >
        {word}
      </motion.span>
    </span>
  );
};
