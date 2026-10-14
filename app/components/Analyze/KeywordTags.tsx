"use client";
import { CSSProperties, useState } from "react";
import clsx from "clsx";
import { CaretUpIcon } from "@phosphor-icons/react/dist/ssr";
import { IkigaiTags } from "@/app/api/analyze/types/response";
import { PILLARS, PILLAR_ORDER } from "./pillars";

type KeywordTagsProps = {
  tags: IkigaiTags;
};

const MOBILE_VISIBLE_COUNT = 8;

const TagChip = ({ tag, accent }: { tag: string; accent: string }) => (
  <span
    style={{ borderColor: accent } as CSSProperties}
    className="rounded-full border bg-surface/50 px-3 md:px-5 pt-2 pb-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary/80 shadow-xs"
  >
    {tag}
  </span>
);

export const KeywordTags = ({ tags }: KeywordTagsProps) => {
  const [expanded, setExpanded] = useState(false);

  const cloud = PILLAR_ORDER.flatMap((key) =>
    (tags[key] ?? []).map((tag) => ({ tag, accent: PILLARS[key].accent })),
  );

  const hiddenCount = cloud.length - MOBILE_VISIBLE_COUNT;
  const mobileCloud = expanded ? cloud : cloud.slice(0, MOBILE_VISIBLE_COUNT);

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="grid w-fit grid-cols-2 gap-x-6 gap-y-3 md:flex md:w-auto md:flex-wrap md:justify-center">
        {PILLAR_ORDER.map((key) => {
          const { kanji, accent, label } = PILLARS[key];
          return (
            <span
              key={key}
              className="flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-widest text-secondary/90"
            >
              <span
                className="flex h-7 w-7 items-center justify-center rounded-md text-base"
                style={{ color: accent, backgroundColor: `${accent}4f` }}
              >
                {kanji}
              </span>

              {label}
            </span>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2.5 md:hidden">
        {mobileCloud.map(({ tag, accent }, i) => (
          <TagChip key={`${tag}-${i}`} tag={tag} accent={accent} />
        ))}

        {hiddenCount > 0 && (
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className={clsx(
              "flex items-center gap-1.5 rounded-full px-5 pt-2 pb-1.5 font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-200",
              expanded
                ? "bg-secondary/15 text-secondary"
                : "border border-dashed border-secondary/40 bg-surface/50 text-secondary/70 hover:text-secondary",
            )}
          >
            {expanded ? (
              <>
                <CaretUpIcon size={11} weight="bold" />
                voir moins
              </>
            ) : (
              `+${hiddenCount}`
            )}
          </button>
        )}
      </div>

      <div className="hidden flex-wrap items-center justify-center gap-4 md:flex">
        {cloud.map(({ tag, accent }, i) => (
          <TagChip key={`${tag}-${i}`} tag={tag} accent={accent} />
        ))}
      </div>
    </div>
  );
};
