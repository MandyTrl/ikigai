"use client";
import { useMemo, useRef } from "react";
import clsx from "clsx";
import { motion, useInView } from "motion/react";
import { ikigaiMainstay } from "@/app/utils/datas/ikigaiMainstay";
import type { PillarKey } from "@/app/api/analyze/types/response";
import {
  BOTTOM_OVERFLOW,
  TOP,
  buildNodes,
  threadPaths,
  threadX,
} from "./musubiGeometry";

const DRAW = 2.8;
const STAGGER = 0.25;
const PILLAR_ORDER = ikigaiMainstay.map((m) => m.mainstay as PillarKey);

// La géométrie est toujours calculée à la verticale : cross = largeur de la tresse,
// main = sens de lecture. En horizontal (< lg), on échange simplement x et y au rendu.
const SIZES = {
  vertical: {
    top: TOP,
    kanji: TOP - 22,
    overflow: BOTTOM_OVERFLOW,
    stroke: 2.3,
    strokeLit: 3,
    ring: 11,
    ringLit: 15,
    dot: 3.4,
    hit: 22,
    label: 26,
  },
  horizontal: {
    top: 32,
    kanji: 10,
    overflow: 0,
    stroke: 2,
    strokeLit: 2.6,
    ring: 9,
    ringLit: 12,
    dot: 3,
    hit: 18,
    label: 22,
  },
};

const SWAP = "matrix(0 1 1 0 0 0)";

type MusubiIllustrationProps = {
  width: number;
  height: number;
  nodeYs: number[];
  crossings: PillarKey[][];
  active: number | null;
  onActiveChange: (index: number | null) => void;
  horizontal?: boolean;
};

export const MusubiIllustration = ({
  width,
  height,
  nodeYs,
  crossings,
  active,
  onActiveChange,
  horizontal = false,
}: MusubiIllustrationProps) => {
  const size = horizontal ? SIZES.horizontal : SIZES.vertical;
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const nodes = useMemo(
    () => buildNodes(width, nodeYs, crossings, PILLAR_ORDER),
    [width, nodeYs, crossings],
  );
  const threads = useMemo(
    () =>
      threadPaths(width, height, nodes, size.top, size.overflow, !horizontal),
    [width, height, nodes, size, horizontal],
  );
  const activeThreads = active === null ? null : nodes[active]?.threads;

  // Position d'un texte (jamais transformé, pour rester lisible)
  const at = (cross: number, main: number) =>
    horizontal ? { x: main, y: cross } : { x: cross, y: main };
  const [svgW, svgH] = horizontal ? [height, width] : [width, height];

  const nodeHandlers = (i: number) => ({
    onPointerEnter: (e: React.PointerEvent) =>
      e.pointerType === "mouse" && onActiveChange(i),
    onPointerLeave: (e: React.PointerEvent) =>
      e.pointerType === "mouse" && onActiveChange(null),
    onPointerUp: (e: React.PointerEvent) =>
      e.pointerType !== "mouse" && onActiveChange(active === i ? null : i),
  });

  return (
    <figure ref={ref} className="relative h-full">
      <svg
        width={svgW}
        height={svgH}
        viewBox={`0 0 ${svgW} ${svgH}`}
        className="overflow-visible"
        aria-hidden
      >
        {threads.map((d, t) => {
          const pillar = ikigaiMainstay[t];
          const isLit = !activeThreads || activeThreads.includes(t);
          return (
            <g
              key={pillar.kanji}
              className="transition-opacity duration-300 ease-in-out"
              style={{ opacity: isLit ? 1 : 0.15 }}
            >
              <motion.text
                {...at(threadX(width, t), size.kanji)}
                textAnchor="middle"
                dominantBaseline={horizontal ? "central" : undefined}
                className={clsx(
                  "font-arima",
                  horizontal ? "text-base" : "text-xl",
                )}
                fill={pillar.accent}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: t * STAGGER }}
              >
                {pillar.kanji}
              </motion.text>

              <motion.path
                d={d}
                transform={horizontal ? SWAP : undefined}
                fill="none"
                stroke={pillar.accent}
                strokeLinecap="round"
                strokeWidth={
                  activeThreads && isLit ? size.strokeLit : size.stroke
                }
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{
                  duration: DRAW,
                  delay: 0.3 + t * STAGGER,
                  ease: [0.45, 0, 0.25, 1],
                }}
              />
            </g>
          );
        })}

        {nodes.map((node, i) => {
          const isActive = active === i;
          const isBefore = node.x < width / 2;
          const { x, y } = at(node.x, node.y);
          const label = at(
            node.x + (isBefore ? -size.label : size.label),
            node.y,
          );
          // Le nœud se noue quand les fils l'ont atteint
          const delay = 0.7 + (node.y / height) * DRAW + 0.4;
          return (
            <g key={i} {...nodeHandlers(i)}>
              <circle cx={x} cy={y} r={size.hit} fill="transparent" />

              <motion.circle
                cx={x}
                cy={y}
                r={isActive ? size.ringLit : size.ring}
                fill="none"
                strokeWidth={1}
                className={clsx(
                  "transition-[r,stroke] duration-300 ease-in-out",
                  isActive ? "stroke-primary" : "stroke-secondary/50",
                )}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 0.9, delay, ease: "easeOut" }}
              />

              <motion.circle
                cx={x}
                cy={y}
                r={size.dot}
                className="fill-primary"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{
                  duration: 0.4,
                  delay: delay + 0.5,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                style={{ transformOrigin: `${x}px ${y}px` }}
              />

              <motion.text
                {...label}
                textAnchor={horizontal ? "middle" : isBefore ? "end" : "start"}
                dominantBaseline="central"
                className={clsx(
                  "font-mono text-xs tracking-[0.2em] transition-[fill] duration-300",
                  isActive ? "fill-primary" : "fill-secondary/60",
                )}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: delay + 0.6 }}
              >
                {i + 1}
              </motion.text>
            </g>
          );
        })}
      </svg>

      {!horizontal && (
        <motion.figcaption
          className="absolute inset-x-0 -bottom-24 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-secondary/60"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 + DRAW + 1 }}
        >
          結び · 4 piliers · {nodes.length} croisements
        </motion.figcaption>
      )}
    </figure>
  );
};
