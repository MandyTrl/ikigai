type PillarAnalysisProps = {
  analysis: {
    insights: string[];
    tensions: string[];
  };
};

export const PillarAnalysis = ({ analysis }: PillarAnalysisProps) => {
  return (
    <section className="flex flex-col gap-8">
      <article>
        <p className="text-xs tracking-[0.2em] uppercase text-secondary/60 border-b border-primary/10 pb-2 mb-4">
          Analyse croisée
        </p>

        <ul>
          {analysis.insights.map((item) => (
            <li key={item} className="border-b border-primary/6 py-3 text-sm leading-6">
              {item}
            </li>
          ))}
        </ul>
      </article>

      <article>
        <p className="text-xs tracking-[0.2em] uppercase text-secondary/60 border-b border-primary/10 pb-2 mb-4">
          Points de vigilance
        </p>

        <ul>
          {analysis.tensions.map((item) => (
            <li
              key={item}
              className="border-l-[3px] border-[var(--tertiary)] pl-4 py-2 mb-3 text-sm leading-6"
            >
              {item}
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
};
