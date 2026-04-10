import { IkigaiJob } from "@/app/api/analyze/types/response";
import { Title } from "../UI/Title";

type PillarKey = "love" | "talent" | "needs" | "paid";

const PILLAR_COLORS: Record<PillarKey, string> = {
  love: "#b6d4db",
  talent: "#eed2d7",
  needs: "#ffefe5",
  paid: "#c9def7",
};

const PILLAR_LABELS: Record<PillarKey, string> = {
  love: "amour",
  talent: "talent",
  needs: "utilité",
  paid: "vocation",
};

const ROMAN = ["I", "II", "III"];

const getDominantPillar = (scores: IkigaiJob["ikigai_scores"]): PillarKey => {
  return (Object.entries(scores) as [PillarKey, number][]).reduce((a, b) =>
    b[1] > a[1] ? b : a
  )[0];
};

const ScoreBar = ({
  label,
  value,
  isDominant,
}: {
  label: PillarKey;
  value: number;
  isDominant: boolean;
}) => {
  const color = PILLAR_COLORS[label];
  return (
    <div className="space-y-1">
      <span className="font-mono text-[0.6rem] tracking-wide text-secondary/60 uppercase">
        {PILLAR_LABELS[label]}
      </span>
      <div className={`rounded-none bg-primary/8 ${isDominant ? "h-3" : "h-2"}`}>
        <div
          className={`h-full rounded-none transition-all ${isDominant ? "opacity-100" : "opacity-70"}`}
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
};

export const JobCard = ({ job, rank }: { job: IkigaiJob; rank: number }) => {
  const dominant = getDominantPillar(job.ikigai_scores);

  return (
    <article className="relative flex flex-col gap-4 border border-slate-200 bg-white p-5 overflow-hidden">
      <span className="absolute top-3 right-4 text-[3rem] font-[100] text-primary/10 select-none leading-none">
        {ROMAN[rank - 1]}
      </span>

      <div className="flex flex-col gap-1 pr-12">
        <span
          className="font-mono text-[0.6rem] tracking-widest uppercase"
          style={{ color: PILLAR_COLORS[dominant] }}
        >
          ● {PILLAR_LABELS[dominant]}
        </span>
        <Title as="h3" text={job.title} className="font-[300] text-2xl" />
      </div>

      <div className="space-y-3">
        {(Object.entries(job.ikigai_scores) as [PillarKey, number][]).map(
          ([key, value]) => (
            <ScoreBar
              key={key}
              label={key}
              value={value}
              isDominant={key === dominant}
            />
          )
        )}
      </div>

      <p className="text-sm leading-6">{job.description}</p>

      <div className="border-l-2 border-[var(--tertiary)] pl-4 mt-1 italic font-light text-sm text-primary/80">
        {job.match_reason}
      </div>
    </article>
  );
};
