import { ColumnHeader } from "./ResultSection";

type NextStepsProps = {
  actions: string[];
};

export const NextSteps = ({ actions }: NextStepsProps) => (
  <div className="flex flex-col gap-6 print:break-inside-avoid">
    <ColumnHeader index="04" eyebrow="pistes pour avancer" />

    <ol className="flex flex-col gap-5">
      {actions.map((action, index) => (
        <li
          key={action}
          className="flex items-start gap-4 print:break-inside-avoid"
        >
          <span className="text-tertiary text-5xl">{index + 1}</span>

          <p className="leading-relaxed">{action}</p>
        </li>
      ))}
    </ol>
  </div>
);
