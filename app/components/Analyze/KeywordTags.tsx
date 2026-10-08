import { IkigaiTags } from "@/app/api/analyze/types/response";
import { PILLARS, PILLAR_ORDER } from "./pillars";

type KeywordTagsProps = {
  tags: IkigaiTags;
};

export const KeywordTags = ({ tags }: KeywordTagsProps) => {
  const cloud = PILLAR_ORDER.flatMap((key) =>
    (tags[key] ?? []).map((tag) => ({ tag, accent: PILLARS[key].accent })),
  );

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
        {PILLAR_ORDER.map((key) => {
          const { kanji, accent, label } = PILLARS[key];
          return (
            <span
              key={key}
              className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-widest text-secondary/90"
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

      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {cloud.map(({ tag, accent }, i) => (
          <span
            key={`${tag}-${i}`}
            className="rounded-full border bg-surface/50 px-5 pt-2 pb-1.5 uppercase font-semibold tracking-[0.2em] text-xs text-primary/80 shadow-xs"
            style={{ borderColor: accent }}
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-secondary/50">
        mots-clés issus de vos réponses
      </p>
    </div>
  );
};
