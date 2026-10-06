import { InstructionType } from "@/app/utils/datas/ikigaiMainstay";

type FormHelpProps = {
  help: InstructionType;
};

export const FormHelp = ({ help }: FormHelpProps) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-secondary/70">
        besoin d’aide ?
      </span>

      <p>
        <span className="text-secondary">༄ </span>
        <span className="font-mono text-primary/85 text-sm">
          {help.question}
        </span>
      </p>

      <span className="text-primary">{help.details}</span>
    </div>
  );
};
