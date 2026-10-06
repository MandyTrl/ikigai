"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { InfoIcon } from "@phosphor-icons/react";

type PillarAboutProps = {
  description: string;
  accentColor: string;
};

export const PillarAbout = ({ description, accentColor }: PillarAboutProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        type="button"
        aria-label="à propos de ce pilier"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="flex cursor-pointer items-center transition-colors duration-200 text-secondary/50 hover:text-secondary/90"
      >
        <InfoIcon size={22} weight="duotone" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="à propos de ce pilier"
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformOrigin: "top right" }}
            className="absolute right-0 top-full z-20 mt-3 w-90 max-w-[calc(100vw-2rem)] rounded-xl border border-secondary/15 bg-surface p-6 shadow-[4px_4px_0px_rgba(10,14,39,0.05)]"
          >
            <span
              className="mb-2 block font-mono text-[0.7rem] uppercase tracking-[0.3em]"
              style={{ color: accentColor }}
            >
              à propos de ce pilier
            </span>
            <p className="text-sm leading-relaxed text-primary/90">
              {description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
