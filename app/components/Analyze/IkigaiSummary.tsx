import { ReactNode } from "react";

import { IkigaiTags } from "@/app/api/analyze/types/response";
import { Title } from "../UI/Title";
import { KeywordTags } from "./KeywordTags";

type IkigaiSummaryProps = {
  summary: {
    profile: string;
    key_strengths: string[];
    motivations: string[];
    work_environment: string[];
  };
  tags: IkigaiTags;
};

const SummaryListCard = ({
  title,
  items,
}: {
  title: string;
  items: string[];
}) => (
  <article className="flex h-full flex-col gap-1 print:break-inside-avoid">
    <div className="text-primary/80 border-2 border-accent print:bg-surface bg-surface/70 font-semibold rounded-xl px-6 py-3 text-xl">
      {title}
    </div>

    <ul className="flex flex-1 flex-col gap-2.5 p-6 border border-line rounded-xl print:bg-surface bg-surface/70">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 leading-snug">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-tertiary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </article>
);

export const IkigaiSummary = ({ summary, tags }: IkigaiSummaryProps) => (
  <div className="flex flex-col gap-16">
    <div className="flex flex-col gap-14">
      <div className="flex flex-col gap-4">
        <Title as="h2" text="En quelques mots" className="font-light" />
        <p className="max-w-[65ch] leading-7 text-primary/90">
          {summary.profile}
        </p>
      </div>

      <KeywordTags tags={tags} />
    </div>

    <div className="grid items-stretch gap-6 md:grid-cols-3 md:gap-9">
      <SummaryListCard title="Forces clés" items={summary.key_strengths} />
      <SummaryListCard title="Motivations" items={summary.motivations} />
      <SummaryListCard
        title="Environnement idéal"
        items={summary.work_environment}
      />
    </div>
  </div>
);
