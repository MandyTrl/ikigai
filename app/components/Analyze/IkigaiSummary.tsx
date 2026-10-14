import { IkigaiTags } from "@/app/api/analyze/types/response";
import { Title } from "../UI/Title";
import { KeywordTags } from "./KeywordTags";
import { BrushStroke } from "./BrushStroke";

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
  <article className="flex h-full flex-col gap-5 rounded-2xl border border-line bg-surface/70 p-6 print:bg-surface print:break-inside-avoid">
    <div className="flex flex-col gap-2">
      <Title as="h3" text={title} className="text-xl font-light" />
      <BrushStroke className="h-2 w-16" />
    </div>

    <ul className="flex flex-1 flex-col gap-2.5">
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
  <div className="flex flex-col gap-14">
    <div className="flex flex-col gap-14">
      <p className="leading-7 text-primary/90">{summary.profile}</p>

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
