import { CSSProperties, Fragment } from "react";
import { IkigaiTags } from "@/app/api/analyze/types/response";
import { PILLARS, PILLAR_ORDER, PillarMeta } from "./pillars";

type KeywordTagsProps = {
  tags: IkigaiTags;
};

const PillarLabel = ({ kanji, accent, label }: PillarMeta) => (
  <span
    className="flex items-center gap-2.5 font-mono text-[0.75rem] uppercase tracking-widest text-secondary/90"
    style={{ color: accent }}
  >
    <span
      className="flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold"
      style={{ color: accent, backgroundColor: `${accent}4f` } as CSSProperties}
    >
      {kanji}
    </span>

    {label}
  </span>
);

export const KeywordTags = ({ tags }: KeywordTagsProps) => (
  <div className="flex flex-col gap-6 md:gap-5">
    {PILLAR_ORDER.map((key) => {
      const pillar = PILLARS[key];
      const rule = { borderColor: pillar.accent } as CSSProperties;

      return (
        <div
          key={key}
          style={rule}
          className="border-y py-4 md:grid md:grid-cols-[8.5rem_1fr] items-center md:gap-x-6 md:pl-0 print:grid print:grid-cols-[8.5rem_1fr] print:gap-x-6 print:break-inside-avoid"
        >
          <PillarLabel {...pillar} />

          <p
            style={rule}
            className="mt-2.5 md:mt-0 print:mt-0 font-mono text-xs text-primary/85"
          >
            {(tags[key] ?? []).map((tag, i) => (
              <Fragment key={`${tag}-${i}`}>
                {i > 0 && <span className="px-2 text-tertiary">·</span>}

                {tag}
              </Fragment>
            ))}
          </p>
        </div>
      );
    })}
  </div>
);
