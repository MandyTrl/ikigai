type CoherenceSignalProps = {
  confidence: number;
};

const getLabel = (confidence: number) => {
  if (confidence >= 75) return "Cohérence forte";
  if (confidence >= 50) return "Cohérence modérée";
  return "Profil à enrichir";
};

const BAR_HEIGHTS = ["h-1", "h-2", "h-3", "h-4"];

export const CoherenceSignal = ({ confidence }: CoherenceSignalProps) => {
  const filledBars = Math.round(confidence / 25);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-end gap-1">
        {BAR_HEIGHTS.map((height, i) => (
          <span
            key={i}
            className={`w-1.5 rounded-none ${height} ${
              i < filledBars
                ? "bg-[var(--tertiary)]"
                : "bg-[var(--tertiary)]/20"
            }`}
          />
        ))}
        <span className="ml-2 text-xs text-secondary/70 self-end pb-0.5">
          {getLabel(confidence)}
        </span>
      </div>
      <span className="font-mono text-[0.6rem] tracking-widest text-secondary/50 uppercase">
        gemini-2.5-flash
      </span>
    </div>
  );
};