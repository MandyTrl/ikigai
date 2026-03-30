import { WarningCircleIcon, SparkleIcon } from "@phosphor-icons/react/dist/ssr";

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
};

type SummaryListCardProps = {
  title: string;
  items: string[];
};

const SummaryListCard = ({ title, items }: SummaryListCardProps) => {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-primary">{title}</h3>

      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-sm leading-6 text-slate-700"
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
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
}: IkigaiSummaryProps) => {
  return (
    <section className="space-y-6">
      <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/30 text-primary">
            <SparkleIcon size={20} weight="fill" />
          </div>

          <div>
            <p className="text-sm text-slate-500">Synthèse globale</p>
            <h2 className="text-2xl font-semibold text-primary">
              Votre ikigai en quelques mots
            </h2>
          </div>
        </div>

        <p className="max-w-3xl text-sm leading-7 text-slate-700 md:text-base">
          {summary.profile}
        </p>
      </article>

      <div className="grid gap-4 lg:grid-cols-3">
        <SummaryListCard title="Forces clés" items={summary.key_strengths} />
        <SummaryListCard title="Motivations" items={summary.motivations} />
        <SummaryListCard
          title="Environnement idéal"
          items={summary.work_environment}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-primary">
            Pistes pour avancer
          </h3>

          <ul className="space-y-4">
            {recommendations.actions.map((action, index) => (
              <li key={action} className="flex items-start gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-medium text-primary">
                  {index + 1}
                </span>
                <p className="text-sm leading-6 text-slate-700">{action}</p>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-3xl border border-rose-200 bg-rose-50/70 p-6 shadow-sm">
          <div className="mb-3 flex items-center gap-3 text-rose-700">
            <WarningCircleIcon size={20} weight="fill" />
            <h3 className="text-lg font-semibold">Point de vigilance</h3>
          </div>

          <p className="text-sm leading-6 text-slate-700">
            {recommendations.warning}
          </p>
        </article>
      </div>
    </section>
  );
};
