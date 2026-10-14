"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowCounterClockwiseIcon,
  CheckIcon,
  XIcon,
} from "@phosphor-icons/react/dist/ssr";
import { IkigaiContext } from "@/app/context/IkigaiContext";

const CONFIRM_TIMEOUT_MS = 4000;

export const ResetPillarsButton = () => {
  const { resetIkigai } = useContext(IkigaiContext);
  const [isConfirming, setIsConfirming] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isConfirming) return;

    timeoutRef.current = setTimeout(
      () => setIsConfirming(false),
      CONFIRM_TIMEOUT_MS,
    );

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isConfirming]);

  const handleConfirm = () => {
    setIsConfirming(false);
    resetIkigai();
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {!isConfirming ? (
        <motion.button
          key="idle"
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          onClick={() => setIsConfirming(true)}
          aria-label="Réinitialiser les réponses des 4 piliers"
          className="group flex shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap font-mono text-sm tracking-wide text-secondary/50 transition-colors duration-200 hover:text-secondary/80"
        >
          <ArrowCounterClockwiseIcon
            size={15}
            weight="regular"
            className="transition-transform duration-300 group-hover:-rotate-45"
          />
          réinitialiser
        </motion.button>
      ) : (
        <motion.div
          key="confirm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="flex shrink-0 items-center gap-2 whitespace-nowrap font-mono text-sm tracking-wide text-secondary/70"
        >
          <span>tout effacer ?</span>
          <button
            type="button"
            onClick={handleConfirm}
            aria-label="Confirmer la réinitialisation"
            className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full text-primary/70 transition-colors duration-200 hover:bg-primary/8 hover:text-primary"
          >
            <CheckIcon size={12} weight="bold" />
          </button>
          <button
            type="button"
            onClick={() => setIsConfirming(false)}
            aria-label="Annuler la réinitialisation"
            className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full text-secondary/50 transition-colors duration-200 hover:bg-secondary/8 hover:text-secondary"
          >
            <XIcon size={12} weight="bold" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
