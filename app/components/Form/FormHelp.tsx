/* eslint-disable react/jsx-no-comment-textnodes */
import { InstructionType } from "@/app/utils/datas/ikigaiMainstay";

type FormHelpProps = {
  help: InstructionType;
};

export const FormHelp = ({ help }: FormHelpProps) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-xs tracking-widest uppercase text-secondary/85">
        <span className="text-tertiary">// </span>
        besoin d&apos;aide ?
      </span>

      <div className="bg-secondary/5 rounded p-5 flex flex-col gap-2">
        <span className="font-mono text-tertiary tracking-wide font-medium">
          {help.question}
        </span>

        <span className="text-primary">{help.details}</span>
      </div>
    </div>
  );
};
