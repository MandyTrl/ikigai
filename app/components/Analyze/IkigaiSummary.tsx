import { ReactNode } from "react";
import {
  MountainsIcon,
  CompassIcon,
  PlantIcon,
} from "@phosphor-icons/react/dist/ssr";
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
  icon,
  title,
  items,
}: {
  icon: ReactNode;
  title: string;
  items: string[];
}) => (
  <article className="flex flex-col gap-4 rounded-2xl border border-line bg-surface/70 p-6 print:bg-surface print:break-inside-avoid">
    <div className="flex items-center gap-2.5 text-primary">
      {icon}
      <p className="font-mono text-base uppercase tracking-[0.15em]">{title}</p>
    </div>

    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-base font-light leading-snug">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-tertiary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </article>
);

export const IkigaiSummary = ({ summary, tags }: IkigaiSummaryProps) => (
  <div className="flex flex-col gap-16">
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <Title as="h2" text="En quelques mots" className="font-light" />
        <p className="max-w-[65ch] text-base font-light leading-7 text-primary/90">
          {summary.profile}
        </p>
      </div>

      <KeywordTags tags={tags} />
    </div>

    <div className="grid gap-5 md:grid-cols-3">
      <SummaryListCard
        icon={<MountainsIcon size={22} weight="duotone" className="text-tertiary" />}
        title="Forces clés"
        items={summary.key_strengths}
      />
      <SummaryListCard
        icon={<CompassIcon size={22} weight="duotone" className="text-tertiary" />}
        title="Motivations"
        items={summary.motivations}
      />
      <SummaryListCard
        icon={<PlantIcon size={22} weight="duotone" className="text-tertiary" />}
        title="Environnement idéal"
        items={summary.work_environment}
      />
    </div>
  </div>
);
