"use client";
import { useRef } from "react";
import { useInView } from "motion/react";
import { TypewriterItem } from "../UI/TypewriterItem";

const ITEMS = [
  "Une synthèse personnalisée",
  "Des pistes de métiers",
  "Un PDF téléchargeable",
];

const CHAR_DELAY = 38;
const ITEM_GAP = 600;

export const WhatYouGetSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="flex flex-col gap-10 justify-between h-full">
      <div className="space-y-1">
        {ITEMS.map((item, i) => {
          const startDelay =
            400 +
            ITEMS.slice(0, i).reduce(
              (acc, prev) => acc + prev.length * CHAR_DELAY + ITEM_GAP,
              0,
            );
          return (
            <TypewriterItem
              key={item}
              text={item}
              startDelay={startDelay}
              triggerStart={isInView}
            />
          );
        })}
      </div>
    </div>
  );
};