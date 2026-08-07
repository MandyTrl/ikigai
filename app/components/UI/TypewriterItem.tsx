"use client";
import { useEffect, useState } from "react";

const CHAR_DELAY = 38;

type TypewriterItemProps = {
  text: string;
  startDelay: number;
  triggerStart: boolean;
};

export const TypewriterItem = ({
  text,
  startDelay,
  triggerStart,
}: TypewriterItemProps) => {
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!triggerStart) return;
    const timeout = setTimeout(() => setTyping(true), startDelay);
    return () => clearTimeout(timeout);
  }, [triggerStart, startDelay]);

  useEffect(() => {
    if (!typing) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, CHAR_DELAY);
    return () => clearInterval(interval);
  }, [typing, text]);

  return (
    <div className="flex items-center gap-3 py-3 border-b border-primary/8 font-mono">
      <span
        className={`text-tertiary shrink-0 transition-opacity duration-300 ${typing || done ? "opacity-100" : "opacity-0"}`}
      >
        ›
      </span>
      <span className="tracking-wide text-primary/80 min-h-5">
        {displayed}
        {typing && !done && (
          <span className="inline-block w-[0.5ch] h-[1em] bg-tertiary ml-0.5 align-middle animate-pulse" />
        )}
      </span>
    </div>
  );
};
