"use client";
import { useContext } from "react";
import clsx from "clsx";
import { HoverContext } from "@/app/context/HoverContext";
import { IkigaiStepEnum } from "@/app/types";

type CircleProps = {
  id: IkigaiStepEnum;
  cx: string;
  cy: string;
  r?: string;
  fill: string;
  defaultCxLabel: string;
  hoveredCxLabel?: string;
  defaultCyLabel: string;
  hoveredCyLabel?: string;
  label: string;
  labelSecondPart?: string;
  /** Le pilier a assez de réponses → bordure de complétion. */
  isComplete?: boolean;
  /** Les 4 piliers sont complets → tracé fin de la bordure (gamification). */
  allComplete?: boolean;
  /** Décalage du tracé pour l'effet en cascade. */
  traceDelay?: number;
  /** Sélection d'un pilier directement depuis le diagramme. */
  onSelect?: (id: IkigaiStepEnum) => void;
};

export const Circle = ({
  id,
  cx,
  cy,
  r,
  fill,
  defaultCxLabel,
  hoveredCxLabel,
  defaultCyLabel,
  hoveredCyLabel,
  label,
  labelSecondPart,
  isComplete = false,
  allComplete = false,
  traceDelay = 0,
  onSelect,
}: CircleProps) => {
  const { hoveredMainstay, setHoveredMainstay } = useContext(HoverContext);
  const isHovered = hoveredMainstay === id;

  const cxLabel = isHovered ? hoveredCxLabel : defaultCxLabel;
  const cyLabel = isHovered ? hoveredCyLabel : defaultCyLabel;

  const scaleValue = isHovered ? 1.04 : 1;

  const isAnyHovered = hoveredMainstay !== null;

  // On garde le mélange aquarelle (multiply) en permanence : pas d'aplat blanc.
  const circleStyle =
    "transition-all duration-500 ease-in-out mix-blend-multiply";

  // Survol = la teinte se densifie + les AUTRES s'estompent (bordures + labels)
  // → l'œil va direct au pilier visé, sans aplat blanc ni flou.
  const fillOpacity = isHovered ? 0.4 : isAnyHovered ? 0.3 : 0.3;
  const strokeWidth = isHovered ? 0.4 : isComplete ? 0.35 : 0;
  const strokeOpacity = isHovered
    ? 1
    : isAnyHovered
      ? 0.5
      : isComplete
        ? 1
        : 0.6;
  const labelOpacity = isHovered
    ? 1
    : isAnyHovered
      ? 0.4
      : isComplete
        ? 0.9
        : 0.8;

  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={`Pilier : ${label}${labelSecondPart ? ` ${labelSecondPart}` : ""}`}
      onClick={() => onSelect?.(id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect?.(id);
        }
      }}
      onMouseEnter={() => setHoveredMainstay(id)}
      onMouseLeave={() => setHoveredMainstay(null)}
      transform={`scale(${scaleValue})`}
      className="cursor-pointer focus:outline-none"
      style={{
        transformOrigin: `${cx} ${cy}`,
        transition: "transform 0.4s cubic-bezier(0.33, 1, 0.68, 1)",
      }}
    >
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={fill}
        stroke={fill}
        strokeWidth={strokeWidth}
        strokeOpacity={strokeOpacity}
        fillOpacity={fillOpacity}
        className={clsx(circleStyle, allComplete && !isHovered && "venn-trace")}
        style={
          allComplete && !isHovered
            ? { animationDelay: `${traceDelay}s` }
            : undefined
        }
      />

      <text
        x={cxLabel}
        y={cyLabel}
        textAnchor="middle"
        dy=".3em"
        fill={"#091C34"}
        fontSize={isHovered ? 3.6 : 3.2}
        opacity={labelOpacity}
        style={{
          fontFamily: "var(--font-andika)",
          transition: "opacity 0.3s ease, font-size 0.3s ease",
        }}
        className={clsx(
          "cursor-pointer select-none",
          isHovered ? "font-regular" : "font-light",
        )}
      >
        <tspan x={cxLabel} dy="-0.5em">
          {label}
        </tspan>

        {labelSecondPart && (
          <tspan x={cxLabel} dy="1.2em">
            {labelSecondPart}
          </tspan>
        )}
      </text>
    </g>
  );
};
