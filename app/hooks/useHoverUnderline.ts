"use client";
import { useRef, useState } from "react";

export const useHoverUnderline = <T extends HTMLElement = HTMLSpanElement>() => {
  const [hovered, setHovered] = useState(false);
  const [width, setWidth] = useState(0);
  const ref = useRef<T>(null);

  return {
    ref,
    width,
    hovered,
    hoverHandlers: {
      onMouseEnter: () => {
        setWidth(ref.current?.offsetWidth ?? 0);
        setHovered(true);
      },
      onMouseLeave: () => setHovered(false),
    },
  };
};
