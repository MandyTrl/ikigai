"use client";
import { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import { HoverContext } from "@/app/context/HoverContext";
import { IkigaiStepEnum } from "@/app/types";

type CircleProps = {
  id: IkigaiStepEnum;
  cx: string;
  cy: string;
  r?: string;
  fill: string;
  /** Teinte foncée du pilier — « encre » du sceau kanji (lisible sur crème). */
  sealColor?: string;
  defaultCxLabel: string;
  hoveredCxLabel?: string;
  defaultCyLabel: string;
  hoveredCyLabel?: string;
  label: string;
  labelSecondPart?: string;
  /** Kanji du pilier — scelle le cercle une fois le pilier validé. */
  kanji?: string;
  /** Le pilier a assez de réponses → bordure de complétion. */
  isComplete?: boolean;
  /** Les 4 piliers sont complets → tracé fin de la bordure (gamification). */
  allComplete?: boolean;
  /** Décalage du tracé pour l'effet en cascade. */
  traceDelay?: number;
  /** Analyse en cours → bordures animées en boucle, de cercle en cercle. */
  isAnalyzing?: boolean;
  /** Sélection d'un pilier directement depuis le diagramme. */
  onSelect?: (id: IkigaiStepEnum) => void;
};

export const Circle = ({
  id,
  cx,
  cy,
  r,
  fill,
  sealColor,
  defaultCxLabel,
  hoveredCxLabel,
  defaultCyLabel,
  hoveredCyLabel,
  label,
  labelSecondPart,
  kanji,
  isComplete = false,
  allComplete = false,
  traceDelay = 0,
  isAnalyzing = false,
  onSelect,
}: CircleProps) => {
  const { hoveredMainstay, setHoveredMainstay } = useContext(HoverContext);
  const isHovered = hoveredMainstay === id;

  // Une fois le tracé terminé, on verrouille l'état final et retire la classe
  // d'animation pour qu'aucun re-render (hover, réordonnancement SVG) ne la relance.
  const [strokeDrawn, setStrokeDrawn] = useState(false);

  useEffect(() => {
    if (!allComplete) setStrokeDrawn(false);
  }, [allComplete]);

  const cxLabel = isHovered ? hoveredCxLabel : defaultCxLabel;
  const cyLabel = isHovered ? hoveredCyLabel : defaultCyLabel;

  const scaleValue = isHovered ? 1.04 : 1;

  const isAnyHovered = hoveredMainstay !== null;

  const circleStyle =
    "transition-all duration-500 ease-in-out mix-blend-multiply";

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

  // Une fois le pilier validé, le libellé FR se fond en son sceau kanji.
  // Au survol, on redonne le français pour la lisibilité.
  const isSealed = isComplete && !!kanji;
  const showKanji = isSealed && !isHovered;

  // CSS transform sur le <g> (pas l'attribut SVG transform) pour éviter que
  // le recalcul de styles SVG ne redémarre l'animation CSS des enfants.
  const gStyle = {
    transform: `scale(${scaleValue})`,
    transformOrigin: `${cx} ${cy}`,
    transformBox: "fill-box" as const,
    transition: "transform 0.4s cubic-bezier(0.33, 1, 0.68, 1)",
  };

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
      className="cursor-pointer focus:outline-none"
      style={gStyle}
    >
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={fill}
        stroke={isAnalyzing ? (sealColor ?? fill) : fill}
        strokeWidth={isAnalyzing ? 0.6 : strokeWidth}
        strokeOpacity={isAnalyzing ? undefined : strokeOpacity}
        fillOpacity={fillOpacity}
        className={clsx(
          circleStyle,
          isAnalyzing && "venn-loading",
          !isAnalyzing && allComplete && !strokeDrawn && "venn-trace",
        )}
        style={
          isAnalyzing
            ? { animationDelay: `${traceDelay * 3}s` }
            : allComplete && !strokeDrawn
              ? { animationDelay: `${0.35 + traceDelay}s` }
              : undefined
        }
        onAnimationEnd={() => setStrokeDrawn(true)}
      />

      {/* Libellé FR — présent tant que le pilier n'est pas validé */}
      <text
        x={cxLabel}
        y={cyLabel}
        textAnchor="middle"
        dy=".3em"
        fill={"#091C34"}
        fontSize={isHovered ? 3.6 : 3.2}
        opacity={showKanji ? 0 : labelOpacity}
        style={{
          fontFamily: "var(--font-andika)",
          transition: "opacity 0.35s ease, font-size 0.3s ease",
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

      {/* Sceau kanji — se pose à la validation du pilier (petit « pop » de tampon) */}
      {kanji && (
        <text
          x={cxLabel}
          y={cyLabel}
          textAnchor="middle"
          dy=".35em"
          fill={sealColor ?? fill}
          fontSize={isHovered ? 6.4 : 6}
          opacity={showKanji ? 1 : 0}
          style={{
            transform: showKanji ? "scale(1)" : "scale(0.8)",
            transformBox: "fill-box",
            transformOrigin: "center",
            transition:
              "opacity 0.35s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            pointerEvents: showKanji ? "auto" : "none",
          }}
          className="cursor-pointer select-none font-normal"
        >
          {kanji}
        </text>
      )}
    </g>
  );
};