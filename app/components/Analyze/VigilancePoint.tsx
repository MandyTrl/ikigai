import { ExclamationMarkIcon } from "@phosphor-icons/react/dist/ssr";

type VigilancePointProps = {
  warning: string;
  tensions: string[];
};

export const VigilancePoint = ({ warning, tensions }: VigilancePointProps) => (
  <div className="flex flex-col gap-3 rounded-xl bg-[#b4453c]/5 p-6 print:break-inside-avoid">
    <div className="flex items-center gap-2 text-[#b4453c]">
      <ExclamationMarkIcon size={20} weight="duotone" />
      <p className="font-mono text-xs uppercase tracking-[0.25em] underline underline-offset-4">
        Point de vigilance
      </p>
    </div>

    <p className="text-sm text-primary/85">{warning}</p>

    {tensions.length > 0 && (
      <ul className="flex flex-col gap-2 pt-1">
        {tensions.map((tension) => (
          <li
            key={tension}
            className="flex gap-3 text-sm leading-relaxed text-primary/70"
          >
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#b4453c]" />
            <span>{tension}</span>
          </li>
        ))}
      </ul>
    )}
  </div>
);
