import clsx from "clsx";

type CoherenceSignalProps = {
  confidence: number;
};

const getLabel = (confidence: number) => {
  if (confidence >= 75) return "Cohérence forte";
  if (confidence >= 50) return "Cohérence modérée";
  return "Profil à enrichir";
};

const BAR_HEIGHTS = ["h-2", "h-3", "h-4", "h-5"];

export const CoherenceSignal = ({ confidence }: CoherenceSignalProps) => {
  const filledBars = Math.round(confidence / 25);

  return (
    <div className="flex w-fit flex-col gap-2">
      <div className="flex items-end gap-2.5">
        <div className="flex items-end gap-1">
          {BAR_HEIGHTS.map((height, i) => (
            <span
              key={i}
              className={clsx(
                "w-2 rounded-full",
                height,
                i < filledBars ? "bg-tertiary" : "bg-tertiary/20",
              )}
            />
          ))}
        </div>

        <span className="text-sm font-medium leading-none text-primary/80">
          {getLabel(confidence)}
        </span>
        <span className="font-mono text-sm leading-none text-tertiary">
          {confidence}%
        </span>
      </div>

      <div className="flex items-center justify-between gap-6 border-t border-line/70 pt-2 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-secondary/50">
        <span>analyse</span>
        <span>gemini-2.5-flash</span>
      </div>
    </div>
  );
};
