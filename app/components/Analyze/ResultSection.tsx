import { ReactNode } from "react";
import { Eyebrow } from "../UI/Eyebrow";

type ResultSectionProps = {
  index: string;
  eyebrow: string;
  children: ReactNode;
  id?: string;
};

export const ResultSection = ({
  index,
  eyebrow,
  children,
  id,
}: ResultSectionProps) => (
  <section id={id} className="flex flex-col gap-6">
    <div className="flex items-baseline gap-4 border-b border-line pb-3 print:break-after-avoid">
      <span className="font-mono text-xs tracking-[0.3em] text-secondary/50">
        {index}
      </span>
      <Eyebrow text={eyebrow} />
    </div>

    {children}
  </section>
);

export const ColumnHeader = ({
  index,
  eyebrow,
}: {
  index: string;
  eyebrow: string;
}) => (
  <div className="flex items-baseline gap-4 border-b border-line pb-3 print:break-after-avoid">
    <span className="font-mono text-xs tracking-[0.3em] text-secondary/50">
      {index}
    </span>
    <Eyebrow text={eyebrow} />
  </div>
);
