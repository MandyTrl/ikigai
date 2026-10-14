"use client";
import { CSSProperties, useState } from "react";
import clsx from "clsx";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { IkigaiJob } from "@/app/api/analyze/types/response";
import { Title } from "../UI/Title";
import { PILLARS, PillarKey, getDominantPillar } from "./pillars";
import { ScoreBar } from "./ScoreBar";
import { JobCardMobile } from "./JobCardMobile";

export const JobCard = ({ job, rank }: { job: IkigaiJob; rank: number }) => {
  const [revealed, setRevealed] = useState(false);
  const dominant = getDominantPillar(job.ikigai_scores);
  const { accent, label, kanji } = PILLARS[dominant];

  return (
    <>
      <div className="hidden h-full perspective-[1600px] md:block print:block">
        <div
          className={clsx(
            "relative h-full transform-3d transition-transform duration-500 ease-in-out",
            revealed && "transform-[rotateY(180deg)]",
            "print:transform-none",
          )}
        >
          <div
            onClick={() => setRevealed(false)}
            style={{ borderColor: accent } as CSSProperties}
            className="relative flex h-full cursor-pointer flex-col gap-6 overflow-hidden rounded-2xl border-2 bg-surfacemuted/40 p-6 backface-hidden transform-[rotateY(180deg)] print:cursor-auto print:break-inside-avoid print:transform-none print:backface-visible"
          >
            <span
              className="absolute right-4 top-3 select-none font-arima text-6xl font-thin leading-none"
              style={{ color: `${accent}99` }}
            >
              {rank}
            </span>

            <div className="flex flex-col gap-2 pr-12">
              <span
                className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest"
                style={{ color: accent }}
              >
                {kanji} {label}
              </span>

              <Title as="h3" text={job.title} className="text-xl" />
            </div>

            <div className="flex flex-col gap-8 md:flex-row">
              <div className="flex w-full flex-col gap-3">
                {(Object.entries(job.ikigai_scores) as [PillarKey, number][]).map(
                  ([key, value]) => (
                    <ScoreBar key={key} pillar={key} value={value} />
                  ),
                )}
              </div>

              <p className="leading-relaxed">{job.description}</p>
            </div>

            <p
              className="rounded-lg p-4 text-sm italic leading-relaxed text-primary/90"
              style={{ backgroundColor: `${accent}1a` }}
            >
              {job.match_reason}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setRevealed(true)}
            style={
              {
                backgroundColor: `${accent}1f`,
                borderColor: `${accent}55`,
                "--pa": accent,
              } as CSSProperties
            }
            className="group absolute inset-0 flex flex-col items-center justify-center gap-6 overflow-hidden rounded-2xl border p-6 text-center backface-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[4px_4px_0px_var(--pa)] active:shadow-none print:hidden"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-14 -right-6 origin-bottom-right select-none font-arima text-[15rem] leading-none transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              style={{ color: `${accent}24` }}
            >
              {kanji}
            </span>

            <span
              className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-widest"
              style={{ color: accent }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: accent }}
              />
              {label} · top {rank}
            </span>

            <div className="flex flex-col items-center gap-1">
              <span className="font-arima text-6xl font-thin text-primary/80">
                {job.score}%
              </span>
              <span className="font-mono text-[0.6rem] uppercase tracking-widest text-secondary/80">
                cohérence
              </span>
            </div>

            <span
              className="flex items-center gap-1.5 rounded-2xl border bg-surface/60 px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] text-primary/80"
              style={{ borderColor: `${accent}55` }}
            >
              découvrez ce métier
              <ArrowRightIcon
                size={14}
                weight="light"
                className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
              />
            </span>
          </button>
        </div>
      </div>

      <JobCardMobile job={job} rank={rank} dominant={dominant} />
    </>
  );
};
