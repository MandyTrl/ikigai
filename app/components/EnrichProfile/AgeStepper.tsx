"use client";
import clsx from "clsx";
import { MinusIcon, PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { inputStyle } from "./inputStyle";

const MIN_AGE = 14;
const MAX_AGE = 110;
const DEFAULT_AGE = 30;

const stepButtonStyle =
  "flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line text-primary/60 transition-colors duration-200 hover:border-tertiary/50 hover:bg-tertiary/10 hover:text-primary";

type AgeStepperProps = {
  value?: number;
  onChange: (value: number | undefined) => void;
};

export const AgeStepper = ({ value, onChange }: AgeStepperProps) => {
  const step = (delta: number) => {
    const next = (value ?? DEFAULT_AGE) + delta;
    onChange(Math.min(MAX_AGE, Math.max(MIN_AGE, next)));
  };

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => step(-1)}
        aria-label="Diminuer l'âge"
        className={stepButtonStyle}
      >
        <MinusIcon size={14} />
      </button>
      <input
        type="number"
        min={MIN_AGE}
        max={MAX_AGE}
        value={value ?? ""}
        onChange={(e) =>
          onChange(e.target.value ? Number(e.target.value) : undefined)
        }
        placeholder="ex. 32"
        className={clsx(
          inputStyle,
          "flex-1 text-center [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
        )}
      />
      <button
        type="button"
        onClick={() => step(1)}
        aria-label="Augmenter l'âge"
        className={stepButtonStyle}
      >
        <PlusIcon size={14} />
      </button>
    </div>
  );
};
