"use client";
import { useMemo, useRef, useState } from "react";
import { ColumnHeader } from "./ResultSection";
import { CrossReadingList } from "./CrossReadingList";
import { MusubiIllustration } from "./MusubiIllustration";
import { MusubiPrint, PRINT_WIDTH } from "./MusubiPrint";
import { useMusubiLayout } from "./useMusubiLayout";
import type { IkigaiInsight } from "@/app/api/analyze/types/response";

// Épaisseur du bandeau horizontal (< lg, = h-33) et marge avant le premier nœud (après les kanji)
const BAND = 132;
const BAND_START = 56;

type CrossReadingProps = {
  insights: IkigaiInsight[];
};

// Lecture croisée + 結び : chaque insight est un nœud entre les fils des piliers qu'il relie.
// lg+ : colonne à droite, chaque nœud aligné sur sa phrase, survol dans les deux sens.
// < lg : la tresse se couche en bandeau au-dessus de la liste, le tap remplace le survol.
// print : colonne à droite de la liste, sans mesure ni animation (voir MusubiPrint).
export const CrossReading = ({ insights }: CrossReadingProps) => {
  const [active, setActive] = useState<number | null>(null);
  const crossings = useMemo(() => insights.map((i) => i.pillars), [insights]);
  const figureRef = useRef<HTMLDivElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const figureLayout = useMusubiLayout(figureRef, itemRefs, insights.length);
  const bandWidth = useMusubiLayout(bandRef, itemRefs, insights.length)?.width;

  const bandNodes = useMemo(() => {
    if (!bandWidth) return [];
    const step = (bandWidth - BAND_START) / insights.length;
    return insights.map((_, i) => BAND_START + step * (i + 0.5));
  }, [bandWidth, insights]);

  const musubiProps = { crossings, active, onActiveChange: setActive };

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,40rem)_18rem] lg:justify-between print:break-inside-avoid print:pb-24">
      <div className="flex flex-col gap-6">
        <ColumnHeader index="03" eyebrow="lecture croisée" />

        <div className="print:hidden">
          <div ref={bandRef} className="h-33 w-full lg:hidden">
            {bandWidth && (
              <MusubiIllustration
                width={BAND}
                height={bandWidth}
                nodeYs={bandNodes}
                {...musubiProps}
                horizontal
              />
            )}
          </div>
        </div>

        <div
          className="print:grid print:gap-x-10 print:pt-6"
          style={{ gridTemplateColumns: `minmax(0, 1fr) ${PRINT_WIDTH}px` }}
        >
          <CrossReadingList
            {...musubiProps}
            insights={insights}
            itemRefs={itemRefs}
          />

          <div className="hidden print:block">
            <MusubiPrint crossings={crossings} />
          </div>
        </div>
      </div>

      <div ref={figureRef} className="hidden lg:block print:hidden">
        {figureLayout && (
          <MusubiIllustration {...figureLayout} {...musubiProps} />
        )}
      </div>
    </div>
  );
};
