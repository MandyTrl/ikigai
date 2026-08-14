"use client";
import { useContext, useEffect, useRef } from "react";
import { motion, useAnimationControls } from "motion/react";
import { IkigaiContext } from "@/app/context/IkigaiContext";
import { ikigaiMainstay } from "@/app/utils/datas/ikigaiMainstay";
import { isPillarCompleteForAnalysis } from "@/app/utils/validateForm";
import { PillarAbout } from "./PillarAbout";

const BRUSH_PATH =
  "M4,13 C22,8 44,5 74,7 C104,9 132,6 160,8 C176,9 190,11 197,12 C190,14 176,15 160,15 C132,17 104,15 74,17 C44,19 22,17 4,13 Z";

export const PillarIdentity = () => {
  const { currentStep, ikigaiForm } = useContext(IkigaiContext);
  const pillar = ikigaiMainstay.find((m) => m.mainstay === currentStep);

  const entry = ikigaiForm.find((el) => el.mainstay === currentStep);
  const isComplete = entry ? isPillarCompleteForAnalysis(entry) : false;

  const prevComplete = useRef(isComplete);
  const kanjiControls = useAnimationControls();

  useEffect(() => {
    prevComplete.current = isComplete;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  useEffect(() => {
    if (isComplete && !prevComplete.current) {
      kanjiControls.start({
        scale: [1, 1.15, 1],
        transition: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] },
      });
    }
    prevComplete.current = isComplete;
  }, [isComplete, kanjiControls]);

  if (!pillar) return null;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-4">
        <p className="flex items-baseline gap-2.5 text-secondary">
          <motion.span
            aria-hidden
            animate={kanjiControls}
            className="font-arima text-3xl leading-none"
            style={{ color: pillar.accent, transformOrigin: "center" }}
          >
            {pillar.kanji}
          </motion.span>

          <span className="font-mono text-[0.72rem] uppercase tracking-[0.3em]">
            {pillar.title}
          </span>
        </p>

        <PillarAbout
          description={pillar.sectionDescription}
          accentColor={pillar.accent}
        />
      </div>

      {isComplete && (
        <motion.div
          aria-hidden
          className="overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: 120 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg
            width="120"
            height="12"
            viewBox="0 0 200 20"
            fill="none"
            className="block"
          >
            <path d={BRUSH_PATH} fill={pillar.accent} fillOpacity={0.9} />
          </svg>
        </motion.div>
      )}
    </div>
  );
};