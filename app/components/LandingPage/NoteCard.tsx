import * as motion from "motion/react-client";
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
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -8,
        rotate: -1,
        transition: { type: "spring", stiffness: 260, damping: 18 },
      }}
      viewport={{ once: true, amount: 0.3 }}
      className={clsx(
        "group relative isolate flex h-[380px] w-full max-w-[360px] flex-col overflow-hidden rounded-sm border border-primary/10 bg-white/60 shadow-[0_10px_30px_rgba(9,28,52,0.06)]",
        "transition-all duration-200",
      )}
    >
      {/* halo */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-secondary/10 blur-3xl transition-opacity duration-200 group-hover:opacity-100 opacity-70" />

      {/* retro grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08] transition-opacity duration-200 group-hover:opacity-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(9,28,52,0.40) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(9,28,52,0.40) 1px, transparent 1px)
          `,
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative z-10 flex h-full flex-col p-7">
        <div>
          <h3 className="text-[2rem] leading-[1.05] tracking-[-0.03em] text-primary">
            <span className="text-secondary">{pillar.highlight}</span>{" "}
            {pillar.title}
          </h3>

          <p className="mt-4 leading-7 text-primary/90">{pillar.description}</p>
        </div>

        <motion.div
          className="absolute bottom-4 text-secondary opacity-85 [&_svg]:h-[100px] [&_svg]:w-[100px]"
          whileHover={{
            rotate: -8,
            y: -4,
            transition: { duration: 0.2, ease: "easeOut" },
          }}
        >
          {pillar.icon}
        </motion.div>
      </div>
    </motion.article>
  );
};
