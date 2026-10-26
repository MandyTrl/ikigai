import { ikigaiMainstay } from "@/app/utils/datas/ikigaiMainstay";
import type { PillarKey } from "@/app/api/analyze/types/response";
import {
  BOTTOM_OVERFLOW,
  buildNodes,
  threadPaths,
  threadX,
} from "./musubiGeometry";

// Largeur réelle en px (la colonne est fixée à cette valeur), hauteur virtuelle étirée à celle de la liste
export const PRINT_WIDTH = 140;
const HEIGHT = 400;
const PILLAR_ORDER = ikigaiMainstay.map((m) => m.mainstay as PillarKey);

type MusubiPrintProps = {
  crossings: PillarKey[][];
};

/**
 * La tresse du PDF. Rien ne peut être mesuré dans la mise en page du papier, alors on la rend
 * exacte autrement : en print, la liste a des lignes de hauteur égale et chaque phrase y est
 * centrée. Le nœud i tombe donc au milieu de la ligne i, soit à (i + 0.5) / n de la hauteur.
 * Les fils s'étirent avec la liste (preserveAspectRatio none, trait non déformé) ; nœuds,
 * kanji et numéros sont placés en % pour rester ronds et lisibles.
 */
export const MusubiPrint = ({ crossings }: MusubiPrintProps) => {
  const nodeYs = crossings.map((_, i) => (HEIGHT * (i + 0.5)) / crossings.length);
  const nodes = buildNodes(PRINT_WIDTH, nodeYs, crossings, PILLAR_ORDER);
  const threads = threadPaths(PRINT_WIDTH, HEIGHT, nodes);
  const pct = (y: number) => `${(y / HEIGHT) * 100}%`;

  return (
    <figure className="relative h-full" style={{ width: PRINT_WIDTH }} aria-hidden>
      <svg
        viewBox={`0 0 ${PRINT_WIDTH} ${HEIGHT}`}
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        {threads.map((d, t) => (
          <path
            key={t}
            d={d}
            fill="none"
            stroke={ikigaiMainstay[t].accent}
            strokeWidth={2}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      <svg className="absolute inset-0 h-full w-full overflow-visible">
        {ikigaiMainstay.map((pillar, t) => (
          <text
            key={pillar.kanji}
            x={threadX(PRINT_WIDTH, t)}
            y={-10}
            textAnchor="middle"
            className="font-arima text-base"
            fill={pillar.accent}
          >
            {pillar.kanji}
          </text>
        ))}

        {nodes.map((node, i) => {
          const isBefore = node.x < PRINT_WIDTH / 2;
          return (
            <g key={i}>
              <circle
                cx={node.x}
                cy={pct(node.y)}
                r={9}
                fill="none"
                strokeWidth={1}
                className="stroke-secondary/50"
              />
              <circle cx={node.x} cy={pct(node.y)} r={3} className="fill-primary" />
              <text
                x={node.x + (isBefore ? -20 : 20)}
                y={pct(node.y)}
                textAnchor={isBefore ? "end" : "start"}
                dominantBaseline="central"
                className="fill-secondary/60 font-mono text-[10px]"
              >
                {i + 1}
              </text>
            </g>
          );
        })}
      </svg>

      <figcaption
        className="absolute inset-x-0 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-secondary/60"
        style={{ top: `calc(100% + ${BOTTOM_OVERFLOW + 12}px)` }}
      >
        結び · {nodes.length} croisements
      </figcaption>
    </figure>
  );
};
