import { PILLARS, PillarKey } from "./pillars";

export const ScoreBar = ({
  pillar,
  value,
}: {
  pillar: PillarKey;
  value: number;
}) => {
  const { accent, label } = PILLARS[pillar];

  return (
    <div className="flex items-center gap-3">
      <span className="w-16 shrink-0 font-mono text-xs uppercase tracking-wide text-secondary/80">
        {label}
      </span>

      <div className="h-2 flex-1 overflow-hidden rounded-full bg-primary/8">
        <div
          className="h-full rounded-full"
          style={{ width: `${value}%`, backgroundColor: accent }}
        />
      </div>
    </div>
  );
};
