"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { XIcon } from "@phosphor-icons/react/dist/ssr";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  labelledBy?: string;
};

export const Modal = ({
  isOpen,
  onClose,
  children,
  labelledBy,
}: ModalProps) => {
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-primary/40 p-6 backdrop-blur-sm"
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-line bg-surface p-7 shadow-[4px_4px_0px_rgba(10,14,39,0.06)] outline-none md:p-8"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer"
              className="absolute right-5 top-5 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-secondary/50 transition-colors duration-200 hover:bg-primary/5 hover:text-secondary/90"
            >
              <XIcon size={16} weight="bold" />
            </button>

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};
