"use client";
import { useRef, useState } from "react";

export const useHoverUnderline = <T extends HTMLElement = HTMLSpanElement>() => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<T>(null);
  const width = ref.current?.offsetWidth ?? 0;

  return {
    ref,
    width,
    hovered,
    hoverHandlers: {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
    },
  };
};
