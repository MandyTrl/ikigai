"use client";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CaretDownIcon, CheckIcon } from "@phosphor-icons/react/dist/ssr";
import { MbtiType } from "@/app/types";
import { mbtiTypes } from "@/app/utils/datas/mbtiTypes";

type MbtiSelectProps = {
  value?: MbtiType;
  onChange: (value: MbtiType | undefined) => void;
};

export const MbtiSelect = ({ value, onChange }: MbtiSelectProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = mbtiTypes.find((type) => type.value === value);

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
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={clsx(
          "flex w-full cursor-pointer items-center justify-between rounded-xl border bg-surface px-3.5 py-2.5 font-mono text-sm text-primary transition-all duration-200 ease-in-out focus:outline-none",
          open
            ? "border-tertiary ring-4 ring-tertiary/15"
            : "border-line hover:border-tertiary/40",
        )}
      >
        <span className={selected ? "text-primary" : "text-secondary/50"}>
          {selected?.label ?? "non renseigné"}
        </span>
        <CaretDownIcon
          size={14}
          className={clsx(
            "text-secondary/50 transition-transform duration-200 ease-in-out",
            open && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformOrigin: "top" }}
            className="absolute left-0 right-0 top-full z-10 mt-2 max-h-64 overflow-y-auto rounded-xl border border-line bg-surface p-1.5 shadow-[4px_4px_0px_rgba(10,14,39,0.06)]"
          >
            <li>
              <button
                type="button"
                role="option"
                aria-selected={!value}
                onClick={() => {
                  onChange(undefined);
                  setOpen(false);
                }}
                className="w-full cursor-pointer rounded-lg px-3 py-2 text-left font-mono text-sm text-secondary/50 transition-colors duration-150 hover:bg-tertiary/10"
              >
                non renseigné
              </button>
            </li>
            {mbtiTypes.map((type) => (
              <li key={type.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={type.value === value}
                  onClick={() => {
                    onChange(type.value);
                    setOpen(false);
                  }}
                  className={clsx(
                    "flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-left font-mono text-sm transition-colors duration-150",
                    type.value === value
                      ? "bg-tertiary/10 text-primary"
                      : "text-primary/80 hover:bg-tertiary/10",
                  )}
                >
                  {type.label}
                  {type.value === value && (
                    <CheckIcon size={13} weight="bold" className="text-tertiary" />
                  )}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
