"use client";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "motion/react";

const ESTAMPE =
  "/japanese-illustrations/art-institute-of-chicago-zNXMHFOf6yU-unsplash.jpg";

const VMASK =
  "linear-gradient(to bottom, transparent 0%, transparent 30%, #000 54%, #000 86%, transparent 100%)";
const HMASK =
  "linear-gradient(to right, transparent 0%, #000 16%, #000 84%, transparent 100%)";

export const ResultEstampe = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 -bottom-10 z-0 overflow-hidden mix-blend-darken"
      style={{
        maskImage: `${VMASK}, ${HMASK}`,
        WebkitMaskImage: `${VMASK}, ${HMASK}`,
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 0.45 : 0 }}
      transition={{ duration: 2, ease: "easeOut" }}
    >
      <Image
        src={ESTAMPE}
        alt=""
        fill
        sizes="100vw"
        priority
        className="object-cover object-center"
      />
    </motion.div>
  );
};
