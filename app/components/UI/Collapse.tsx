/* eslint-disable react/jsx-no-comment-textnodes */
"use client";
import { InstructionType } from "@/app/utils/datas/ikigaiMainstay";
import clsx from "clsx";
import { useState } from "react";

type CollapseProps = {
  items: InstructionType[];
};

export const Collapse = ({ items }: CollapseProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between py-2 group cursor-pointer"
      >
        <span className="font-mono text-xs tracking-widest uppercase text-secondary/85 group-hover:text-secondary transition-colors duration-200">
          <span className="text-tertiary">// </span>
          besoin d&apos;aide ?
        </span>

        <span
          className={clsx(
            "font-mono text-base leading-none select-none text-secondary/55 group-hover:text-secondary/85 transition-all duration-300 ease-in-out",
            open ? "rotate-45" : "rotate-0",
          )}
        >
          +
        </span>
      </button>

      <div
        className={clsx(
          "grid transition-all duration-300 ease-in-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <ul className="overflow-hidden border-t border-t-secondary/20">
          {items.map((item, index) => (
            <li key={index} className="px-1 pt-3 pb-4 flex flex-col gap-1.5">
              <span className="font-mono text-tertiary tracking-wide font-semibold text-sm">
                → {item.question}
              </span>
              <span className="text-primary/85 pl-4 leading-relaxed">
                {item.details}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
