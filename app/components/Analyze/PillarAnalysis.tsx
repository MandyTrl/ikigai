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
        <h2 className="mb-4 text-xl font-semibold">Analyse croisée</h2>

        <ul className="space-y-3">
          {analysis.insights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>

      <article className="border border-slate-200 bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">Points de vigilance</h2>

        <ul className="space-y-3">
          {analysis.tensions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>
    </section>
  );
};
