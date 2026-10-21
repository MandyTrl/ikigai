"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { InfoIcon } from "@phosphor-icons/react";
import type { IkigaiCoherence } from "@/app/api/analyze/types/response";

type CoherenceAboutProps = {
  level: IkigaiCoherence["level"];
  signals: string[];
};

// La première phrase est commune aux quatre niveaux, seule la nuance change
const LEVEL_NOTES: Record<IkigaiCoherence["level"], string> = {
  faible: "Ici la matière reste mince : à lire comme une première piste.",
  moyenne: "Ce qui suit tient, des exemples vécus l'affineraient.",
  bonne: "Vos réponses donnent assez de concret pour que les rapprochements tiennent.",
  forte: "Vos réponses se confirment d'un pilier à l'autre, c'est rare.",
};

export const CoherenceAbout = ({ level, signals }: CoherenceAboutProps) => {
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
    <div ref={containerRef} className="relative shrink-0 print:hidden">
      <button
        type="button"
        aria-label="d’où vient ce niveau"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="flex cursor-pointer items-center text-secondary/50 transition-colors duration-200 hover:text-secondary/90"
      >
        <InfoIcon size={18} weight="duotone" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Qu'est-ce que la mesure de cohérence ?"
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformOrigin: "top right" }}
            className="absolute right-0 top-full z-20 mt-3 w-90 max-w-[calc(100vw-2rem)] rounded-xl border border-secondary/15 bg-surface p-6 text-left shadow-[4px_4px_0px_rgba(10,14,39,0.05)]"
          >
            <span className="mb-2 block font-mono text-[0.7rem] uppercase tracking-[0.3em] text-tertiary">
              la mesure de cohérence
            </span>

            <p className="text-sm text-primary/90">
              Il s&apos;agit de la fiabilité de l&apos;analyse, pas de votre
              profil. {LEVEL_NOTES[level]}
            </p>

            <p className="mt-4 border-t border-line pt-4 text-sm text-secondary">
              Relevé dans vos réponses, par ordre de poids :
            </p>

            <ul className="mt-2 flex flex-col gap-1.5">
              {signals.map((signal) => (
                <li
                  key={signal}
                  className="flex gap-2.5 font-mono text-[0.7rem] lowercase tracking-wide text-secondary"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-tertiary" />
                  <span>{signal}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
