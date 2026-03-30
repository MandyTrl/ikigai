import { IkigaiJob } from "@/app/api/analyze/types/response";

type JobCardProps = {
  job: IkigaiJob;
  rank: number;
};

const ScoreBar = ({ label, value }: { label: string; value: number }) => {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="capitalize">{label}</span>
        <span>{value}/100</span>
      </div>
      <div className="h-2 rounded-full bg-slate-200">
        <div
          className="h-2 rounded-full bg-slate-900 transition-all"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};

export const JobCard = ({ job, rank }: JobCardProps) => {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">Top {rank}</p>
          <h3 className="text-xl font-semibold">{job.title}</h3>
        </div>

        <div className="rounded-full bg-slate-900 px-3 py-1 text-sm font-medium text-white">
          {job.score}/100
        </div>
      </div>

      <p className="mb-4 text-sm leading-6 text-slate-700">{job.description}</p>

      <div className="mb-4 rounded-2xl bg-slate-50 p-4">
        <p className="mb-2 text-sm font-medium">
          Pourquoi ce métier vous correspond
        </p>
        <p className="text-sm leading-6 text-slate-700">{job.match_reason}</p>
      </div>

      <div className="space-y-3">
        <ScoreBar label="love" value={job.ikigai_scores.love} />
        <ScoreBar label="talent" value={job.ikigai_scores.talent} />
        <ScoreBar label="needs" value={job.ikigai_scores.needs} />
        <ScoreBar label="paid" value={job.ikigai_scores.paid} />
      </div>
    </article>
  );
};
