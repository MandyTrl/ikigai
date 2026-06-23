"use client";
import React, { useContext } from "react";
import { Circle } from "./Circle";
import { VennProgress } from "./VennProgress";
import { HoverContext } from "@/app/context/HoverContext";
import { IkigaiContext } from "@/app/context/IkigaiContext";
import { IkigaiStepEnum, PillarStateEnum } from "@/app/types";
import {
  canAnalyzeIkigai,
  isPillarCompleteForAnalysis,
} from "@/app/utils/validateForm";

const radius = "26%"; //rayon en % pour le responsive

const VennDiagram: React.FC = () => {
  const { hoveredMainstay } = useContext(HoverContext);
  const { ikigaiForm, updateForm, setStep } = useContext(IkigaiContext);

  // Sélection directe d'un pilier depuis le diagramme (même action que la liste).
  const handleSelect = (id: IkigaiStepEnum) => {
    updateForm(id, { progressState: PillarStateEnum.IN_PROGRESS });
    setStep(id);
  };

  // Carte de progression : un cercle se remplit dès que son pilier est complété.
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

  // réorganise les cercles pour que le survolé soit en dernier
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
              r={radius}
              isComplete={completionByMainstay[circle.id] ?? false}
              allComplete={allComplete}
              traceDelay={index * 0.18}
              onSelect={handleSelect}
            />
          ))}

          {!hoveredMainstay && (
            <text
              x="50%"
              y="52.5%"
              textAnchor="middle"
              fontSize="0.35vw"
              fontWeight="bold"
              fill="#091C34"
              opacity={0.6}
              className="select-none"
            >
              Ikigai
            </text>
          )}
        </svg>
      </div>

      {/* Progression : le diagramme se complète à mesure */}
      <VennProgress completeCount={completeCount} allComplete={allComplete} />
    </div>
  );
};

export default VennDiagram;
