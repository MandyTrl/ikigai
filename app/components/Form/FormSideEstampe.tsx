"use client";

import Image from "next/image";
import { useRef } from "react";
import clsx from "clsx";
import { motion, useInView } from "motion/react";

const ESTAMPE =
  "/japanese-illustrations/art-institute-of-chicago-kQ7_EfwFm_o-unsplash.jpg";
type FormSideEstampeProps = {
  side: "left" | "right";
};

export const FormSideEstampe = ({ side }: FormSideEstampeProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  // Fondu horizontal
  const hMask = `linear-gradient(to ${
    side === "left" ? "right" : "left"
  }, #000 0%, #000 50%, transparent 90%)`;

  // Fondu vertical
  const vMask =
    "linear-gradient(to bottom, transparent 0%, #000 60%, #000 80%, transparent 100%)";

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className={clsx(
        "pointer-events-none fixed top-1/2 z-0 hidden h-[94vh] w-lg -translate-y-1/2 overflow-hidden xl:block",
        side === "left" ? "left-0" : "right-0",
      )}
      style={{
        maskImage: `${hMask}, ${vMask}`,
        WebkitMaskImage: `${hMask}, ${vMask}`,
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 0.9 : 0 }}
      transition={{ duration: 2.4, ease: "easeOut" }}
    >
      <Image
        src={ESTAMPE}
        alt=""
        fill
        sizes="32rem"
        className="object-cover"
        style={{
          objectPosition: "right top",
          transform: side === "right" ? "scaleX(-1)" : undefined,
        }}
      />
    </motion.div>
  );
};
