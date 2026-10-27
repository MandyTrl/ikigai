"use client";
import { CSSProperties, useRef, useState } from "react";
import { flushSync } from "react-dom";
import clsx from "clsx";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { IkigaiJob } from "@/app/api/analyze/types/response";
import { Title } from "../UI/Title";
import { PILLARS, PillarKey, getDominantPillar } from "./pillars";
import { QuotedText } from "./QuotedText";
import { ScoreBar } from "./ScoreBar";
import { JobCardMobile } from "./JobCardMobile";

type JobCardRevealProps = {
  job: IkigaiJob;
  rank: number;
  tags: string[];
};

export const JobCardReveal = ({ job, rank, tags }: JobCardRevealProps) => {
  const [revealed, setRevealed] = useState(false);
  const frontRef = useRef<HTMLButtonElement>(null);
  const backRef = useRef<HTMLButtonElement>(null);

  // The side being left becomes inert, so focus must follow to the other side
  // (flushSync: the target is only focusable once the re-render has removed `inert`).
  const flip = (next: boolean) => {
    flushSync(() => setRevealed(next));
    (next ? backRef : frontRef).current?.focus({ preventScroll: true });
  };
  const reveal = () => flip(true);
  const hide = () => flip(false);

  const dominant = getDominantPillar(job.ikigai_scores);
  const { accent, label, kanji } = PILLARS[dominant];

  return (
    <>
      <div className="relative hidden h-full md:block print:block">
        <div
          inert={!revealed}
          style={{ borderColor: accent } as CSSProperties}
          className={clsx(
            "relative flex h-full flex-col gap-6 overflow-hidden rounded-2xl border-2 bg-surfacemuted/40 p-6 transition-all duration-300 ease-in-out",
            revealed
              ? "translate-y-0 opacity-100 delay-100"
              : "translate-y-1 opacity-0",
            "print:translate-y-0 print:break-inside-avoid print:opacity-100",
          )}
        >
          <div className="absolute right-5 top-4 flex flex-col items-end gap-1">
            <span className="font-arima text-5xl font-thin leading-none text-primary/80">
              {job.score}%
            </span>
            <span className="font-mono text-[0.6rem] uppercase tracking-widest text-secondary/80">
              cohérence
            </span>
          </div>

          <div className="flex flex-col gap-2 pr-28">
            <span
              className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest"
              style={{ color: accent }}
            >
              {kanji} {label} · top {rank}
            </span>

            <Title as="h3" text={job.title} className="text-xl" />
          </div>

          <div className="flex flex-col gap-8 md:flex-row print:flex-row">
            <div className="flex w-full flex-col gap-3">
              {(
                Object.entries(job.ikigai_scores) as [PillarKey, number][]
              ).map(([key, value]) => (
                <ScoreBar key={key} pillar={key} value={value} />
              ))}
            </div>

            <p className="leading-relaxed">{job.description}</p>
          </div>

          <QuotedText text={job.match_reason} accent={accent} tags={tags} />

          <div className="mt-auto flex justify-end print:hidden">
            <button
              ref={backRef}
              type="button"
              onClick={hide}
              className="group flex cursor-pointer items-center gap-1.5 rounded-sm px-2 py-1 font-mono text-[0.6rem] uppercase tracking-widest text-secondary/70 transition-colors duration-200 ease-in-out hover:text-primary"
            >
              <ArrowLeftIcon
                size={12}
                weight="light"
                className="transition-transform duration-300 ease-in-out group-hover:-translate-x-0.5"
              />
              retourner la carte
            </button>
          </div>
        </div>

        <button
          ref={frontRef}
          type="button"
          onClick={reveal}
          inert={revealed}
          style={
            {
              backgroundColor: `${accent}1f`,
              borderColor: `${accent}55`,
              "--pa": accent,
            } as CSSProperties
          }
          className={clsx(
            "group absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-6 overflow-hidden rounded-2xl border p-6 text-center transition-all duration-300 ease-in-out hover:shadow-[4px_4px_0px_var(--pa)] active:shadow-none print:hidden",
            revealed && "pointer-events-none scale-[0.98] opacity-0",
          )}
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

      <JobCardMobile job={job} rank={rank} dominant={dominant} tags={tags} />
    </>
  );
};
