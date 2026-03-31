import { Title } from "../UI/Title";

type PillarAnalysisProps = {
  analysis: {
    insights: string[];
    tensions: string[];
  };
};

export const PillarAnalysis = ({ analysis }: PillarAnalysisProps) => {
  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <article className="border border-slate-200 bg-white p-6">
        <Title as="h2" text="Analyse croisée" />

        <ul className="space-y-3">
          {analysis.insights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>

      <article className="border border-slate-200 bg-white p-6">
        <Title as="h2" text="Points de vigilance" />

        <ul className="space-y-3">
          {analysis.tensions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>
    </section>
  );
};
