import clsx from "clsx";
import { ReactNode } from "react";

type NoteCardProps = {
  pillar: {
    icon: ReactNode;
    highlight: string;
    title: string;
    description: string;
  };
};

export const NoteCard = ({ pillar }: NoteCardProps) => {
  return (
    <article
      className={clsx(
        "group relative isolate flex h-[380px] w-full max-w-[360px] overflow-hidden rounded-sm",
        "border border-secondary/20 bg-white/75",
        "transition-all duration-200 ease-out will-change-transform",
        "hover:scale-102 hover:border-secondary/30",
      )}
    >
      {/* light top glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary/5 to-transparent opacity-40" />

      {/* ambient halo */}
      <div
        className={clsx(
          "pointer-events-none absolute -right-14 -bottom-14 h-40 w-40 rounded-full bg-secondary/20",
          "opacity-60 transition-all duration-300 ease-out",
          "group-hover:scale-110 group-hover:opacity-90",
        )}
      />

      {/* subtle accent */}
      <div
        className={clsx(
          "pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-accentbis-40",
          "opacity-0 transition-opacity duration-300 ease-out",
          "group-hover:opacity-100",
        )}
      />

      {/* retro grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.1] transition-opacity duration-300 ease-out group-hover:opacity-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(9,28,52,0.35) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(9,28,52,0.35) 1px, transparent 1px)
          `,
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative z-10 flex h-full flex-col p-7">
        <div className="max-w-[90%]">
          <h3 className="text-[2rem] leading-[1.02] tracking-[-0.03em] text-primary">
            <span className="text-secondary">{pillar.highlight}</span>{" "}
            {pillar.title}
          </h3>

          <p className="mt-4 leading-7 text-primary/85">{pillar.description}</p>
        </div>

        <div
          className={clsx(
            "absolute bottom-5 right-6 text-secondary opacity-80",
            "[&_svg]:h-[96px] [&_svg]:w-[96px]",
            "transition-transform duration-200 ease-out",
            "group-hover:-translate-y-1.5 group-hover:-rotate-[6deg] group-hover:scale-[1.03]",
            "will-change-transform",
          )}
        >
          {pillar.icon}
        </div>
      </div>
    </article>
  );
};
