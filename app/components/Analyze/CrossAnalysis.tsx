import { ColumnHeader } from "./ResultSection";

type CrossAnalysisProps = {
  insights: string[];
};

export const CrossAnalysis = ({ insights }: CrossAnalysisProps) => (
  <div className="flex flex-col gap-6">
    <ColumnHeader index="03" eyebrow="lecture croisée" />

    <ul className="flex flex-col gap-5">
      {insights.map((item) => (
        <li key={item} className="flex gap-4">
          <span className="text-2xl leading-none text-secondary">༄</span>
          <p className="text-base font-light leading-relaxed text-primary/90">
            {item}
          </p>
        </li>
      ))}
    </ul>
  </div>
);
