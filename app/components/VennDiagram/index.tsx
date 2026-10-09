"use client";
import React, { useContext } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Circle } from "./Circle";
import { VennProgress } from "./VennProgress";
import { ikigaiMainstay } from "@/app/utils/datas/ikigaiMainstay";
import { HoverContext } from "@/app/context/HoverContext";
import { IkigaiContext } from "@/app/context/IkigaiContext";
import { IkigaiStepEnum, PillarStateEnum } from "@/app/types";
import {
  canAnalyzeIkigai,
  isPillarCompleteForAnalysis,
} from "@/app/utils/validateForm";
import { Button, ButtonSizeEnum, ButtonVariantEnum } from "../UI/Button";
import { useIkigaiAnalyze } from "@/app/hooks/useIkigaiAnalyze";

const radius = "26%";

const VennDiagram: React.FC = () => {
  const { hoveredMainstay, setHoveredMainstay } = useContext(HoverContext);
  const { ikigaiForm, updateForm, setStep } = useContext(IkigaiContext);
  const { handleAnalyze, isAnalyzing, error, hasCachedCurrentAnalysis } =
    useIkigaiAnalyze();

  const handleSelect = (id: IkigaiStepEnum) => {
    setHoveredMainstay(null);
    updateForm(id, { progressState: PillarStateEnum.IN_PROGRESS });
    setStep(id);
  };

  const completionByMainstay = ikigaiForm.reduce<Record<string, boolean>>(
    (acc, pillar) => {
      acc[pillar.mainstay] = isPillarCompleteForAnalysis(pillar);
      return acc;
    },
    {},
  );
  const allComplete = canAnalyzeIkigai(ikigaiForm);
  const completeCount =
    Object.values(completionByMainstay).filter(Boolean).length;

  const baseCircles = [
    {
      id: IkigaiStepEnum.LOVE,
      cx: "50%",
      cy: "30%",
      fill: "#d7defb",
      label: "Ce que vous aimez",
      defaultCyLabel: "19%",
      hoveredCyLabel: "33%",
      defaultCxLabel: "50%",
      hoveredCxLabel: "50%",
    },
    {
      id: IkigaiStepEnum.NEEDS,
      cx: "70%",
      cy: "51%",
      fill: "#ffe2ce",
      label: "Ce dont le",
      labelSecondPart: "monde a besoin",
      defaultCxLabel: "82%",
      hoveredCxLabel: "71%",
      defaultCyLabel: "51%",
      hoveredCyLabel: "51%",
    },
    {
      id: IkigaiStepEnum.PAID,
      cx: "50%",
      cy: "72%",
      fill: "#c9def7",
      label: "Ce pourquoi vous",
      labelSecondPart: "pouvez être payé",
      defaultCxLabel: "50%",
      hoveredCxLabel: "50%",
      defaultCyLabel: "86%",
      hoveredCyLabel: "73%",
    },
    {
      id: IkigaiStepEnum.TALENT,
      cx: "30%",
      cy: "51%",
      fill: "#c9eadd",
      label: "Ce pourquoi",
      labelSecondPart: "vous êtes doué",
      defaultCxLabel: "18%",
      hoveredCxLabel: "29%",
      defaultCyLabel: "50%",
      hoveredCyLabel: "51%",
    },
  ];

  const orderedCircles = [...baseCircles].sort((a, b) => {
    if (a.id === hoveredMainstay) return 1;
    if (b.id === hoveredMainstay) return -1;
    return 0;
  });

  return (
    <div className="flex w-full flex-col items-center gap-5 md:gap-10 lg:gap-14">
      <div className="w-full flex justify-center items-center max-w-[600px] aspect-square">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-auto"
        >
          {orderedCircles.map((circle, index) => (
            <Circle
              key={circle.id}
              {...circle}
              kanji={
                ikigaiMainstay.find((m) => m.mainstay === circle.id)?.kanji
              }
              sealColor={
                ikigaiMainstay.find((m) => m.mainstay === circle.id)?.accent
              }
              r={radius}
              isComplete={completionByMainstay[circle.id] ?? false}
              allComplete={allComplete}
              isAnalyzing={isAnalyzing}
              traceDelay={index * 0.18}
              onSelect={handleSelect}
            />
          ))}

          {!hoveredMainstay && (
            <>
              <text
                x="50%"
                y="52.5%"
                textAnchor="middle"
                fontSize={3}
                fontWeight="bold"
                fill="#091C34"
                opacity={allComplete ? 0 : 0.6}
                style={{ transition: "opacity 0.4s ease" }}
                className="select-none"
              >
                Ikigai
              </text>

              {/* Capstone : une fois les 4 piliers remplis, le cœur du
                  diagramme se révèle en kanji, après le tracé. */}
              <text
                x="50%"
                y="52.5%"
                textAnchor="middle"
                fontSize={4}
                fontWeight="bold"
                fill="#091C34"
                opacity={allComplete ? 0.82 : 0}
                style={{
                  transition: "opacity 0.6s ease",
                  transitionDelay: allComplete ? "1.8s" : "0s",
                }}
                className="select-none"
              >
                生き甲斐
              </text>
            </>
          )}
        </svg>
      </div>

      {/* Hauteur fixe : évite tout layout shift pendant le swap */}
      <div className="relative flex h-14 w-full items-start justify-center">
        <AnimatePresence>
          {!allComplete && (
            <motion.div
              key="progress"
              className="absolute flex flex-col items-center"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              <VennProgress
                completeCount={completeCount}
                allComplete={allComplete}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {allComplete && (
            <motion.div
              key="button"
              className="absolute flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.8,
                duration: 0.5,
                ease: [0.33, 1, 0.68, 1],
              }}
            >
              <Button
                label={
                  hasCachedCurrentAnalysis
                    ? "Voir mon analyse"
                    : isAnalyzing
                      ? "Analyse en cours..."
                      : "Analyser mes réponses"
                }
                variant={ButtonVariantEnum.Outline}
                onClick={handleAnalyze}
                size={ButtonSizeEnum.M}
                disabled={isAnalyzing}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {allComplete && error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-red-600"
          role="alert"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default VennDiagram;
