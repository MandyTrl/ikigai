import clsx from "clsx";
import { ReactNode } from "react";
import * as motion from "motion/react-client";

type NoteCardProps = {
  pillar: {
    icon: ReactNode;
    highlight: string;
    title: string;
    description: string;
  };
  index?: number;
};

export const NoteCard = ({ pillar, index = 0 }: NoteCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: "easeOut" }}
      className={clsx(
        "group relative isolate flex h-95 w-full max-w-90 overflow-hidden",
        "border-b border-line",
        "transition-color duration-200 ease-out will-change-transform hover:border-linestrong",
      )}
    >
      {/* ambient halo */}
      <div
        className={clsx(
          "pointer-events-none absolute -right-14 -bottom-14 h-40 w-40 rounded-full bg-secondary/20",
          "opacity-60 transition-all duration-300 ease-out",
          "group-hover:scale-105 group-hover:opacity-100",
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
            <span className="text-secondary font-mono group-hover:text-tertiary transition-color duration-200 ease-out">
              {pillar.highlight}
            </span>{" "}
            {pillar.title}
          </h3>

          <p className="mt-4 leading-7 text-primary/85">{pillar.description}</p>
        </div>

        <div
          className={clsx(
            "absolute bottom-4.5 right-6 text-accentbis opacity-80",
            "[&_svg]:h-24 [&_svg]:w-24",
            "transition-transform duration-200 ease-out will-change-transform",
            "group-hover:-translate-y-4 group-hover:-rotate-6 group-hover:scale-[1.03]",
          )}
        >
          {pillar.icon}
        </div>
      </div>
    </motion.article>
  );
};
