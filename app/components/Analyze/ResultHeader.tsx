import { BrushStroke } from "./BrushStroke";
import { CoherenceSignal } from "./CoherenceSignal";
import { PrintPdfButton } from "./PdfButton";

type ResultHeaderProps = {
  confidence: number;
};

export const ResultHeader = ({ confidence }: ResultHeaderProps) => {
  const today = new Date().toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="flex flex-col gap-6 mb-10 md:flex-row md:items-end md:justify-between">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <h1 className="font-arima font-thin leading-[0.9] tracking-[-0.04em] text-[clamp(3rem,10vw,6.5rem)]">
            Votre Ikigai
          </h1>
          <BrushStroke className="h-3 w-52 md:w-72" />
        </div>

        <p className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-secondary/70">
          Analyse de vos réponses · {today}
        </p>
      </div>

      <div className="flex flex-col items-start gap-3 md:gap-6 md:items-end">
        <CoherenceSignal confidence={confidence} />

        <div className="print:hidden">
          <PrintPdfButton />
        </div>
      </div>
    </header>
  );
};
