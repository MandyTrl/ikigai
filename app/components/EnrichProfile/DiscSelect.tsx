"use client";
import clsx from "clsx";
import { DiscColor } from "@/app/types";
import { discProfiles } from "@/app/utils/datas/discProfiles";

type DiscSelectProps = {
  value?: DiscColor;
  onChange: (value: DiscColor | undefined) => void;
};

export const DiscSelect = ({ value, onChange }: DiscSelectProps) => (
  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
    {discProfiles.map((profile) => {
      const isSelected = value === profile.id;
      return (
        <button
          key={profile.id}
          type="button"
          aria-pressed={isSelected}
          onClick={() => onChange(isSelected ? undefined : profile.id)}
          className={clsx(
            "flex cursor-pointer flex-col items-center gap-1.5 rounded-xl border bg-surface px-2 py-3 transition-all duration-200 ease-in-out focus:outline-none",
            isSelected
              ? "border-tertiary ring-4 ring-tertiary/15"
              : "border-line hover:border-tertiary/40",
          )}
        >
          <span
            style={{ backgroundColor: profile.swatch }}
            className="h-7 w-7 rounded-full"
          />
          <span
            className={clsx(
              "font-mono text-[0.7rem] tracking-wide transition-colors duration-200",
              isSelected ? "text-primary" : "text-secondary/55",
            )}
          >
            {profile.label}
          </span>
        </button>
      );
    })}
  </div>
);
