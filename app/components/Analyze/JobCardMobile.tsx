"use client";
import { CSSProperties, useState } from "react";
import clsx from "clsx";
import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr";
import { IkigaiJob } from "@/app/api/analyze/types/response";
import { Title } from "../UI/Title";
import { PILLARS, PillarKey } from "./pillars";
import { QuotedText } from "./QuotedText";
import { ScoreBar } from "./ScoreBar";

type JobCardMobileProps = {
  job: IkigaiJob;
  rank: number;
  dominant: PillarKey;
  tags: string[];
};

export const JobCardMobile = ({
  job,
  rank,
  dominant,
  tags,
}: JobCardMobileProps) => {
  const [open, setOpen] = useState(false);
  const { accent, label, kanji } = PILLARS[dominant];

  return (
    <div
      style={{ borderColor: open ? accent : `${accent}55` } as CSSProperties}
      className="overflow-hidden rounded-2xl border bg-surfacemuted/40 transition-colors duration-300 md:hidden print:hidden"
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full flex-col gap-3 p-5 text-left active:bg-primary/3"
      >
        <div className="flex items-center justify-between gap-3">
          <span
            className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-widest"
            style={{ color: accent }}
          >
            <span className="font-arima text-base leading-none">{kanji}</span>
            {label} · top {rank}
          </span>

          <div className="flex items-center gap-3 shrink-0">
            <span className="font-arima text-2xl font-thin text-primary/80">
              {job.score}%
            </span>
            <span
              style={
                {
                  backgroundColor: `${accent}1f`,
                  color: accent,
                } as CSSProperties
              }
              className={clsx(
                "flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-300 ease-in-out",
                open && "rotate-180",
              )}
            >
              <CaretDownIcon size={13} weight="bold" />
            </span>
          </div>
        </div>

        <Title as="h3" text={job.title} className="text-base font-light" />

        {!open && (
          <span className="self-end font-mono text-[0.6rem] uppercase tracking-widest text-secondary/50">
            voir le détail
          </span>
        )}
      </button>

      <div
        className={clsx(
          "grid px-5 transition-all duration-300 ease-in-out",
          open
            ? "grid-rows-[1fr] pb-5 opacity-100"
            : "grid-rows-[0fr] pb-0 opacity-0",
        )}
      >
        <div className="flex flex-col gap-5 overflow-hidden">
          <div className="flex flex-col gap-3">
            {(Object.entries(job.ikigai_scores) as [PillarKey, number][]).map(
              ([key, value]) => (
                <ScoreBar key={key} pillar={key} value={value} />
              ),
            )}
          </div>

          <p className="leading-relaxed">{job.description}</p>

          <QuotedText text={job.match_reason} accent={accent} tags={tags} />
        </div>
      </div>
    </div>
  );
};
