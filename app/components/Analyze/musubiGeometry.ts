import type { PillarKey } from "@/app/api/analyze/types/response";

export const TOP = 0;
export const BOTTOM_OVERFLOW = 56;

type Point = [number, number];

export type MusubiNode = { x: number; y: number; threads: number[] };

// Les fils partent à intervalles réguliers et s'inversent en bas, comme un cordon kumihimo
export const threadX = (width: number, t: number) => (width * (t + 0.5)) / 4;

// Les nœuds alternent entre deux couloirs pour garder la tresse aérée ;
// les fils qui s'y nouent viennent des piliers que Gemini associe à chaque insight.
export const buildNodes = (
  width: number,
  nodeYs: number[],
  crossings: PillarKey[][],
  order: PillarKey[],
): MusubiNode[] =>
  nodeYs.map((y, i) => ({
    x: width / 2 + (i % 2 ? 1 : -1) * width * 0.16,
    y,
    threads: [...new Set(crossings[i] ?? [])]
      .map((key) => order.indexOf(key))
      .filter((t) => t >= 0),
  }));

// Catmull-Rom → Bézier : une courbe souple qui passe exactement par chaque nœud
const smoothPath = (points: Point[]) => {
  let d = `M${points[0][0]} ${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const [p1, p2] = [points[i], points[i + 1]];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    const c1: Point = [
      p1[0] + (p2[0] - p0[0]) / 6,
      p1[1] + (p2[1] - p0[1]) / 6,
    ];
    const c2: Point = [
      p2[0] - (p3[0] - p1[0]) / 6,
      p2[1] - (p3[1] - p1[1]) / 6,
    ];
    d += `C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
};

// Part du couloir propre au fil entre deux nœuds : 0 = brins confondus, 1 = fil qui ne dévie pas
const BREATH = 0.6;

const endT = (t: number, invert: boolean) => (invert ? 3 - t : t);

const homeX = (
  width: number,
  bottom: number,
  t: number,
  y: number,
  invert: boolean,
) =>
  threadX(width, t) +
  (threadX(width, endT(t, invert)) - threadX(width, t)) * (y / bottom);

// Entre deux nœuds, le fil repasse par son propre couloir : deux fils qui partagent
// plusieurs nœuds s'écartent entre eux au lieu de se fondre en un seul brin.
const breathe = (
  width: number,
  bottom: number,
  t: number,
  invert: boolean,
  points: Point[],
) =>
  points.flatMap((point, i): Point[] => {
    const next = points[i + 1];
    if (!next) return [point];
    const y = (point[1] + next[1]) / 2;
    const x = (point[0] + next[0]) / 2;
    return [point, [x + (homeX(width, bottom, t, y, invert) - x) * BREATH, y]];
  });

export const threadPaths = (
  width: number,
  height: number,
  nodes: MusubiNode[],
  top = TOP,
  overflow = BOTTOM_OVERFLOW,
  // false : chaque fil finit dans son couloir (bandeau, trop court pour s'inverser après le dernier nœud)
  invert = true,
) =>
  [0, 1, 2, 3].map((t) => {
    const bottom = height + overflow;
    const through = nodes
      .filter((n) => n.threads.includes(t))
      .map((n): Point => [n.x, n.y]);
    return smoothPath(
      breathe(width, bottom, t, invert, [
        [threadX(width, t), top],
        ...through,
        [threadX(width, endT(t, invert)), bottom],
      ]),
    );
  });
