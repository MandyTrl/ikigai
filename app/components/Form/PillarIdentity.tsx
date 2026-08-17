"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { motion, useAnimationControls } from "motion/react";
import { IkigaiContext } from "@/app/context/IkigaiContext";
import { ikigaiMainstay } from "@/app/utils/datas/ikigaiMainstay";
import {
  getFilledAnswersCount,
  isPillarCompleteForAnalysis,
} from "@/app/utils/validateForm";
import { PillarAbout } from "./PillarAbout";

const BRUSH_PATH =
  "M4,13 C22,8 44,5 74,7 C104,9 132,6 160,8 C176,9 190,11 197,12 C190,14 176,15 160,15 C132,17 104,15 74,17 C44,19 22,17 4,13 Z";


const STROKE_FRACTION: Record<number, number> = { 1: 0.45, 2: 0.72, 3: 1 };

export const PillarIdentity = () => {
  const { currentStep, ikigaiForm } = useContext(IkigaiContext);
  const pillar = ikigaiMainstay.find((m) => m.mainstay === currentStep);

  const entry = ikigaiForm.find((el) => el.mainstay === currentStep);
  const isComplete = entry ? isPillarCompleteForAnalysis(entry) : false;
  const filledCount = entry ? getFilledAnswersCount(entry.answers) : 0;

  const titleRef = useRef<HTMLParagraphElement>(null);
  const [titleWidth, setTitleWidth] = useState(0);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const measure = () => setTitleWidth(el.offsetWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [currentStep]);

  const strokeWidth = titleWidth * (STROKE_FRACTION[filledCount] ?? 0);

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
        <p
          ref={titleRef}
          className="flex w-fit items-baseline gap-2.5 text-secondary"
        >
          <motion.span
            aria-hidden
            animate={kanjiControls}
            className="font-arima text-3xl leading-none"
            style={{ color: pillar.accent, transformOrigin: "center" }}
          >
            {pillar.kanji}
          </motion.span>

          <span className="font-mono text-sm uppercase tracking-[0.3em]">
            {pillar.title}
          </span>
        </p>

        <PillarAbout
          description={pillar.sectionDescription}
          accentColor={pillar.accent}
        />
      </div>

      {filledCount >= 1 && titleWidth > 0 && (
        <motion.div
          aria-hidden
          className="overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: strokeWidth }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.svg
            width={titleWidth}
            height="12"
            viewBox="0 0 200 20"
            fill="none"
            preserveAspectRatio="none"
            className="block"
            style={{ transformOrigin: "center" }}
            animate={{ scaleY: filledCount >= 3 ? 1.4 : 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.path
              d={BRUSH_PATH}
              fill={pillar.accent}
              animate={{ fillOpacity: filledCount >= 3 ? 1 : 0.82 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.svg>
        </motion.div>
      )}
    </div>
  );
};
