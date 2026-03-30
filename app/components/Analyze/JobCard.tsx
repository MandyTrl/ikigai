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
    <article className="flex flex-col gap-4 border border-slate-200 bg-white p-5">
      <div className="mb-4 flex flex-col gap-2">
        <div className="flex justify-between">
          <p className="text-sm text-slate-500">Top {rank}</p>
          <div className="rounded-full h-12 w-12 bg-slate-900 p-2 font-semibold text-white text-center">
            {job.score}
          </div>
        </div>

        <h3 className="text-xl font-semibold">{job.title}</h3>
      </div>

      <div className="space-y-3">
        <ScoreBar label="love" value={job.ikigai_scores.love} />
        <ScoreBar label="talent" value={job.ikigai_scores.talent} />
        <ScoreBar label="needs" value={job.ikigai_scores.needs} />
        <ScoreBar label="paid" value={job.ikigai_scores.paid} />
      </div>

      <p id="job-description">{job.description}</p>

      <div className="bg-slate-50 p-3">
        <p className="text-lg font-medium mb-3">
          Pourquoi ce métier vous correspond
        </p>

        <p className="p-2">{job.match_reason}</p>
      </div>
    </article>
  );
};
