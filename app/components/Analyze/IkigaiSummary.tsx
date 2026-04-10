import { WarningCircleIcon } from "@phosphor-icons/react/dist/ssr";
import { PrintPdfButton } from "./PdfButton";
import { CoherenceSignal } from "./CoherenceSignal";
import { IkigaiTags } from "@/app/api/analyze/types/response";
import { Title } from "../UI/Title";

type IkigaiSummaryProps = {
  summary: {
    profile: string;
    key_strengths: string[];
    motivations: string[];
    work_environment: string[];
  };
  recommendations: {
    actions: string[];
    warning: string;
  };
  confidence: number;
  tags: IkigaiTags;
};

const PILLAR_KANJI: Record<string, string> = {
  love: "愛",
  talent: "才",
  needs: "需",
  paid: "仕",
};

type SummaryListCardProps = {
  title: string;
  items: string[];
};

const SummaryListCard = ({ title, items }: SummaryListCardProps) => {
  return (
    <article className="bg-transparent p-0">
      <p className="text-xs tracking-[0.2em] uppercase border-b border-primary/10 pb-2 mb-4 text-secondary/70">
        {title}
      </p>

      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm leading-6">
            <span className="mt-1 shrink-0 text-[var(--tertiary)]">–</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
};

export const IkigaiSummary = ({
  summary,
  recommendations,
  confidence,
  tags,
}: IkigaiSummaryProps) => {
  return (
    <section className="space-y-6">
      <article id="summary" className="flex gap-10 items-start">
        <div className="flex-1">
          <p className="text-xs tracking-[0.2em] uppercase text-secondary/60 mb-2">
            Synthèse globale
          </p>
          <Title as="h2" text="Votre ikigai en quelques mots" />
          <p className="mt-4 text-sm md:text-base font-[300] leading-8 max-w-3xl">
            {summary.profile}
          </p>
        </div>

        <div className="flex flex-col gap-4 shrink-0">
          <CoherenceSignal confidence={confidence} />
          <PrintPdfButton />
        </div>
      </article>

      {Object.entries(tags).map(([pillar, values]) => (
        <div key={pillar} className="mb-3">
          <p className="font-[300] text-base text-secondary/80 mb-2">
            {PILLAR_KANJI[pillar] ?? pillar}
          </p>

          <div className="flex flex-wrap gap-2">
            {values.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm rounded-none border border-current/20 text-primary/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
      <p className="text-xs text-slate-500 mb-3">
        Ces mots-clés ont été identifiés à partir de vos réponses
      </p>

      <div className="grid gap-4 lg:grid-cols-3">
        <SummaryListCard title="Forces clés" items={summary.key_strengths} />
        <SummaryListCard title="Motivations" items={summary.motivations} />
        <SummaryListCard
          title="Environnement idéal"
          items={summary.work_environment}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <article className="border border-slate-200 bg-white p-6">
          <Title as="h3" text="Pistes pour avancer" />

          <ul className="space-y-4">
            {recommendations.actions.map((action, index) => (
              <li key={action} className="flex items-start gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent font-medium">
                  {index + 1}
                </span>

                <p>{action}</p>
              </li>
            ))}
          </ul>
        </article>

        <article className="h-fit border-l-[3px] border-[var(--tertiary)] pl-4 py-2">
          <div className="mb-3 flex items-center gap-3 text-primary/70">
            <WarningCircleIcon size={18} weight="fill" />
            <Title as="h3" text="Point de vigilance" />
          </div>

          <p className="text-sm leading-6">{recommendations.warning}</p>
        </article>
      </div>
    </section>
  );
};
