import { ColumnHeader } from "./ResultSection";

type NextStepsProps = {
  actions: string[];
};

export const NextSteps = ({ actions }: NextStepsProps) => (
  <div className="flex flex-col gap-6">
    <ColumnHeader index="04" eyebrow="pistes pour avancer" />

    <ol className="flex flex-col gap-5">
      {actions.map((action, index) => (
        <li key={action} className="flex items-start gap-4">
          <span className="text-accent text-5xl">{index + 1}</span>

          <p className="pt-1 text-base font-light leading-relaxed text-primary/90">
            {action}
          </p>
        </li>
      ))}
    </ol>
  </div>
);
