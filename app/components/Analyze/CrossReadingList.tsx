import type { Dispatch, RefObject, SetStateAction } from "react";
import clsx from "clsx";
import type { IkigaiInsight } from "@/app/api/analyze/types/response";

type CrossReadingListProps = {
  insights: IkigaiInsight[];
  active: number | null;
  onActiveChange: Dispatch<SetStateAction<number | null>>;
  // La tresse mesure ces phrases pour aligner chaque nœud sur sa première ligne
  itemRefs: RefObject<(HTMLLIElement | null)[]>;
};

// Souris : survol. Tactile : un tap met la phrase en avant, un second la relâche.
export const CrossReadingList = ({
  insights,
  active,
  onActiveChange,
  itemRefs,
}: CrossReadingListProps) => (
  // print : lignes de hauteur égale, phrase centrée, pour que MusubiPrint tombe au milieu de chacune
  <ul className="flex flex-col gap-5 print:grid print:auto-rows-fr print:gap-0">
    {insights.map(({ text }, i) => (
      <li
        key={text}
        ref={(el) => {
          itemRefs.current[i] = el;
        }}
        className={clsx(
          "flex gap-4 transition-opacity duration-300 ease-in-out print:items-center print:py-2.5",
          active !== null && active !== i && "opacity-45",
        )}
        onPointerEnter={(e) => e.pointerType === "mouse" && onActiveChange(i)}
        onPointerLeave={(e) =>
          e.pointerType === "mouse" && onActiveChange(null)
        }
        onPointerUp={(e) =>
          e.pointerType !== "mouse" &&
          onActiveChange((current) => (current === i ? null : i))
        }
      >
        {/* Mini-nœud de la tresse : distingue la phrase des numéros de section (« 03 ») */}
        <span className="flex h-6.5 shrink-0 items-center gap-1.5 self-start print:self-center">
          <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
            <circle
              cx={8}
              cy={8}
              r={active === i ? 7 : 5.5}
              fill="none"
              strokeWidth={1}
              className={clsx(
                "transition-[r,stroke] duration-300 ease-in-out",
                active === i ? "stroke-primary" : "stroke-secondary/50",
              )}
            />
            <circle cx={8} cy={8} r={2} className="fill-primary" />
          </svg>
          <span
            className={clsx(
              "w-2 font-mono text-xs transition-colors duration-300",
              active === i ? "text-primary" : "text-secondary/60",
            )}
          >
            {i + 1}
          </span>
        </span>
        <p className="leading-relaxed">{text}</p>
      </li>
    ))}
  </ul>
);
