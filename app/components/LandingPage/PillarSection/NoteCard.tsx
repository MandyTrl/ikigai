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
      className="group relative isolate flex h-64 sm:h-80 w-full max-w-90 overflow-hidden"
    >
      {/* ambient halo */}
      <div
        className={clsx(
          "pointer-events-none absolute -right-14 -bottom-14 h-40 w-40 rounded-full bg-tertiary/25",
          "opacity-60 transition-all duration-300 ease-out",
          "group-hover:scale-105 group-hover:opacity-100",
        )}
      />

      {/* retro grid */}
      <div
        className="pointer-events-none absolute inset-12 opacity-[0.15] transition-opacity duration-300 ease-out group-hover:opacity-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(212,165,116,0.85) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(212,165,116,0.85) 1px, transparent 1px)
          `,
          backgroundSize: "37px 37px",
          backgroundPosition: "20px 20px",
        }}
      />

      <div className="relative z-10 flex h-full flex-col p-7">
        <div className="max-w-[90%]">
          <h3 className="text-3xl">
            <span className="relative inline-block">
              {/* trait de surligneur qui se déploie de gauche à droite */}
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.35 + index * 0.1,
                  ease: [0.65, 0, 0.35, 1],
                }}
                className="absolute inset-x-0 bottom-[0.1em] -z-10 h-[0.55em] origin-left rounded-xs bg-tertiary/45 transition-colors duration-200 ease-out group-hover:bg-tertiary/65"
              />
              <span className="relative font-mono text-primary">
                {pillar.highlight}
              </span>
            </span>{" "}
            {pillar.title}
          </h3>

          <p className="mt-4 leading-7 text-primary/85">{pillar.description}</p>
        </div>

        <div
          className={clsx(
            "absolute bottom-4.5 right-6 text-tertiary opacity-70",
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
