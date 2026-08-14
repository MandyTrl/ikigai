import { InstructionType } from "@/app/utils/datas/ikigaiMainstay";

type FormHelpProps = {
  help: InstructionType;
};

export const FormHelp = ({ help }: FormHelpProps) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-secondary/70">
        besoin d’aide ?
      </span>

      <span className="font-mono text-primary/70 tracking-wide font-semibold text-sm">
        {help.question}
      </span>

      <span className="text-primary">{help.details}</span>
    </div>
  );
};
