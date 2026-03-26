"use client";
import { InstructionType } from "@/app/utils/datas/ikigaiMainstay";
import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import { useState } from "react";

type CollapseProps = {
  items: InstructionType[];
};

export const Collapse = ({ items }: CollapseProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div
      className={clsx(
        !open && "hover:bg-secondary/30",
        "group w-full border rounded-xl duration-200 ease-in transition-colors border-secondary",
      )}
    >
      <div
        onClick={() => setOpen((prevState) => !prevState)}
        className={clsx(
          open && "bg-secondary/30",
          "group flex items-center justify-between cursor-pointer px-4 py-3",
        )}
      >
        <p className="tracking-wide font-andika text-slate-400 group-hover:text-primary/70">
          Besoin d&apos;aide ?
        </p>

        <CaretDownIcon
          size={18}
          color={open ? "#091C34" : "#d7defb"}
          weight="regular"
          className={clsx(
            open ? "rotate-180" : "rotate-0",
            "duration-300 ease-in-out transform-transform fill-secondary group-hover:fill-primary/70",
          )}
        />
      </div>

      <ul
        className={clsx(
          open
            ? "h-fit max-h-[650px] px-4 py-3 opacity-100"
            : "max-h-0 opacity-0",
          "space-y-4 pl-6 duration-300 ease-in-out transition-all overflow-hidden transition-discrete",
        )}
      >
        {items.map((item: InstructionType, index: number) => {
          return (
            <li key={index} className="flex flex-col gap-1">
              <span className="underline decoration-secondary underline-offset-2">
                {item.question}
              </span>

              <span>{item.details}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
