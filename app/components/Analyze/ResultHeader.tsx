import type { IkigaiCoherence } from "@/app/api/analyze/types/response";
import { BrushStroke } from "./BrushStroke";
import { CoherenceScale } from "./CoherenceScale";

type ResultHeaderProps = {
  analyzedAt: Date;
  confidence: number;
  coherence?: IkigaiCoherence;
};

export const ResultHeader = ({
  analyzedAt,
  confidence,
  coherence,
}: ResultHeaderProps) => {
  const analysisDate = analyzedAt.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between print:flex-row print:items-start print:justify-between">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <h1 className="font-arima font-thin leading-[0.9] tracking-[-0.04em] text-[clamp(3rem,10vw,6.5rem)]">
            Votre Ikigai
          </h1>
          <BrushStroke className="h-3 w-52 md:w-72" />
        </div>

        <p className="font-mono text-[0.65rem] uppercase tracking-widest text-secondary/70 md:text-[0.7rem] md:tracking-[0.25em]">
          Analyse de vos réponses · {analysisDate}
        </p>
      </div>

      <div className="flex w-full justify-start md:w-auto md:justify-end print:w-auto print:justify-end">
        <CoherenceScale confidence={confidence} coherence={coherence} />
      </div>
    </header>
  );
};
