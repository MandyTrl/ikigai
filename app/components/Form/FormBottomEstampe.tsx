"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "motion/react";

const ESTAMPE =
  "/japanese-illustrations/art-institute-of-chicago-kQ7_EfwFm_o-unsplash.jpg";

// Estampe de fond dans le form en mobile et tablette.
export const FormBottomEstampe = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-x-0 bottom-0 z-0 h-[45vh] overflow-hidden xl:hidden"
      style={{
        maskImage:
          "linear-gradient(to top, #000 60%, #000 80%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to top, #000 60%, #000 80%, transparent 100%)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 0.2 : 0 }}
      transition={{ duration: 2.4, ease: "easeOut" }}
    >
      <Image
        src={ESTAMPE}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[0%_25%]"
      />
    </motion.div>
  );
};
