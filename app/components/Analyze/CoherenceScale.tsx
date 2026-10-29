"use client";
import clsx from "clsx";
import { motion } from "motion/react";
import type {
  CoherenceLevel,
  IkigaiCoherence,
} from "@/app/api/analyze/types/response";
import { Eyebrow } from "../UI/Eyebrow";
import { CoherenceAbout } from "./CoherenceAbout";

type CoherenceScaleProps = {
  model: string;
  confidence: number;
  coherence?: IkigaiCoherence;
};

const LEVELS: CoherenceLevel[] = ["faible", "moyenne", "bonne", "forte"];

const LEVEL_LABELS: Record<CoherenceLevel, string> = {
  faible: "faible",
  moyenne: "modérée",
  bonne: "bonne",
  forte: "forte",
};

const levelFromConfidence = (confidence: number): CoherenceLevel => {
  if (confidence >= 90) return "forte";
  if (confidence >= 75) return "bonne";
  if (confidence >= 65) return "moyenne";
  return "faible";
};

export const CoherenceScale = ({
  model,
  confidence,
  coherence,
}: CoherenceScaleProps) => {
  const level = coherence?.level ?? levelFromConfidence(confidence);
  const reachedIndex = LEVELS.indexOf(level);

  return (
    <div className="flex w-fit max-w-full flex-col gap-6 rounded-2xl border border-line p-5">
      <div className="flex items-start gap-6">
        <p className="flex items-baseline gap-1 font-arima font-thin leading-none tracking-[-0.04em] text-primary text-5xl">
          {confidence}
          <span className="font-mono text-xl font-semibold tracking-normal text-tertiary">
            %
          </span>
        </p>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Eyebrow text="cohérence de l'analyse" />

            <CoherenceAbout level={level} signals={coherence?.signals ?? []} />
          </div>

          <span className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-secondary/70">
            {model}
          </span>
        </div>
      </div>

      <div className="grid w-full grid-cols-4 gap-1">
        {LEVELS.map((step, index) => {
          const isActive = index === reachedIndex;

          return (
            <div key={step} className="flex flex-col gap-2">
              <span className="flex h-0.75 w-full items-center">
                {isActive ? (
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.4, 0, 0.2, 1],
                      delay: 0.2,
                    }}
                    style={{ transformOrigin: "left" }}
                    className="h-0.75 w-full rounded-full bg-tertiary"
                  />
                ) : (
                  <span
                    className={clsx(
                      "h-px w-full rounded-full",
                      index < reachedIndex ? "bg-tertiary/35" : "bg-line",
                    )}
                  />
                )}
              </span>

              <span
                className={clsx(
                  "font-mono text-[0.6rem] lowercase tracking-widest transition-colors duration-300",
                  isActive ? "text-primary" : "text-secondary/35",
                )}
              >
                {LEVEL_LABELS[step]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
