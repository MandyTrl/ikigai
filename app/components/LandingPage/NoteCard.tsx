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
        "group relative isolate flex h-[380px] w-full max-w-[360px] overflow-hidden",
        "border-b border-secondary/20",
        "transition-color duration-200 ease-out will-change-transform hover:border-secondary/50",
      )}
    >
      {/* ambient halo */}
      <div
        className={clsx(
          "pointer-events-none absolute -right-14 -bottom-14 h-40 w-40 rounded-full bg-secondary/20",
          "opacity-60 transition-all duration-300 ease-out",
          "group-hover:scale-110 group-hover:opacity-100",
        )}
      />

      {/* retro grid */}
      <div
        className="pointer-events-none absolute inset-12 opacity-[0.1] transition-opacity duration-300 ease-out group-hover:opacity-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(9,28,52,0.55) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(9,28,52,0.55) 1px, transparent 1px)
          `,
          backgroundSize: "37px 37px",
          backgroundPosition: "20px 20px",
        }}
      />

      <div className="relative z-10 flex h-full flex-col p-7">
        <div className="max-w-[90%]">
          <h3 className="text-3xl">
            <span className="text-secondary font-mono border-b-2 border-transparent group-hover:border-b-secondary transition-color duration-200 ease-out">
              {pillar.highlight}
            </span>{" "}
            {pillar.title}
          </h3>

          <p className="mt-4 leading-7 text-primary/85">{pillar.description}</p>
        </div>

        <div
          className={clsx(
            "absolute bottom-5 right-6 text-accentbis opacity-80",
            "[&_svg]:h-[96px] [&_svg]:w-[96px]",
            "transition-transform duration-200 ease-out will-change-transform",
            "group-hover:-translate-y-1.5 group-hover:-rotate-[6deg] group-hover:scale-[1.03] group-hover:text-secondary",
          )}
        >
          {pillar.icon}
        </div>
      </div>
    </article>
  );
};
