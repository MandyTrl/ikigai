"use client";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "motion/react";

const ESTAMPE =
  "/japanese-illustrations/art-institute-of-chicago-zNXMHFOf6yU-unsplash.jpg";

const VMASK =
  "linear-gradient(to bottom, transparent 0%, transparent 8%, #000 30%, #000 80%, transparent 100%)";
const HMASK =
  "linear-gradient(to right, transparent 0%, #000 25%, #000 80%, transparent 100%)";

export const ResultEstampe = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute -top-12 bottom-0 -right-4
           z-0 w-[70%] overflow-hidden mix-blend-exclusion
           md:top-0 md:-right-10"
      style={{
        maskImage: `${VMASK}, ${HMASK}`,
        WebkitMaskImage: `${VMASK}, ${HMASK}`,
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 0.6 : 0 }}
      transition={{ duration: 2, ease: "easeOut" }}
    >
      <Image
        src={ESTAMPE}
        alt=""
        fill
        sizes="(min-width: 768px) 60vw, 70vw"
        priority
        className="object-cover"
      />
    </motion.div>
  );
};
