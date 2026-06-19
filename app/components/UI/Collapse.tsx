/* eslint-disable react/jsx-no-comment-textnodes */
"use client";
import clsx from "clsx";
import { useState } from "react";

type CollapseProps = {
  content: string;
  label?: string;
};

export const Collapse = ({
  content,
  label = "besoin d'aide ?",
}: CollapseProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between py-2 group cursor-pointer"
      >
        <span className="font-mono text-xs tracking-widest uppercase text-secondary/85 group-hover:text-secondary transition-colors duration-200">
          <span className="text-tertiary">// </span>
          {label}
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
        <p className="overflow-hidden text-secondary pt-2">{content}</p>
      </div>
    </div>
  );
};
