"use client";

import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";
import { motion } from "motion/react";
import estampe from "@/public/japanese-illustrations/art-institute-of-chicago-kQ7_EfwFm_o-unsplash.webp";

type FormSideEstampeProps = {
  side: "left" | "right";
};

export const FormSideEstampe = ({ side }: FormSideEstampeProps) => {
  // Le fondu attend l'image : sinon il se joue sur une boîte vide et l'estampe surgit d'un coup
  const [isLoaded, setIsLoaded] = useState(false);

  // Fondu horizontal
  const hMask = `linear-gradient(to ${
    side === "left" ? "right" : "left"
  }, #000 0%, #000 50%, transparent 90%)`;

  // Fondu vertical
  const vMask =
    "linear-gradient(to bottom, transparent 0%, #000 60%, #000 80%, transparent 100%)";

  return (
    <motion.div
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
      animate={{ opacity: isLoaded ? 0.9 : 0 }}
      transition={{ duration: 2.4, ease: "easeOut" }}
    >
      <Image
        src={estampe}
        alt=""
        fill
        sizes="32rem"
        loading="eager"
        fetchPriority="high"
        onLoad={() => setIsLoaded(true)}
        className="object-cover"
        style={{
          objectPosition: "right top",
          transform: side === "right" ? "scaleX(-1)" : undefined,
        }}
      />
    </motion.div>
  );
};
