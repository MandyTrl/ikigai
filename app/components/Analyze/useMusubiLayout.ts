import { type RefObject, useLayoutEffect, useState } from "react";

// Milieu de la première ligne d'un insight (leading-relaxed sur text-base)
const FIRST_LINE = 13;

export type MusubiLayout = { width: number; height: number; nodeYs: number[] };

// Mesure le conteneur de la tresse et la première ligne de chaque phrase, relativement à lui.
// Un conteneur masqué (display: none à ce breakpoint) renvoie null : rien n'est dessiné.
export const useMusubiLayout = (
  containerRef: RefObject<HTMLElement | null>,
  itemRefs: RefObject<(HTMLElement | null)[]>,
  count: number,
) => {
  const [layout, setLayout] = useState<MusubiLayout | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const measure = () => {
      if (!container.clientWidth) return setLayout(null);
      const top = container.getBoundingClientRect().top;
      setLayout({
        width: container.clientWidth,
        height: container.clientHeight,
        nodeYs: itemRefs.current
          .slice(0, count)
          .map((li) =>
            li ? li.getBoundingClientRect().top - top + FIRST_LINE : 0,
          ),
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, [containerRef, itemRefs, count]);

  return layout;
};
