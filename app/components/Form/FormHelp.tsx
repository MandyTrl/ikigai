import { InstructionType } from "@/app/utils/datas/ikigaiMainstay";

type FormHelpProps = {
  help: InstructionType;
};

export const FormHelp = ({ help }: FormHelpProps) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-tertiary tracking-wide font-semibold text-sm">
        {help.question}
      </span>

      <span className="text-primary">{help.details}</span>
    </div>
  );
};
