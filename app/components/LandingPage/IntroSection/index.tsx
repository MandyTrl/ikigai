"use client";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { IntroHighlights } from "./IntroHighlights";
import { IntroDefinition } from "./IntroDefinition";

export const IntroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
      className="w-full flex flex-col items-center gap-10 md:gap-12 xl:gap-28"
    >
      <IntroHighlights isInView={isInView} />

      <IntroDefinition isInView={isInView} />
    </motion.section>
  );
};
