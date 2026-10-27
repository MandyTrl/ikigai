"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import estampe from "@/public/japanese-illustrations/art-institute-of-chicago-kQ7_EfwFm_o-unsplash.webp";

// Estampe de fond dans le form en mobile et tablette.
export const FormBottomEstampe = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 bottom-0 z-0 h-[45vh] overflow-hidden xl:hidden"
      style={{
        maskImage:
          "linear-gradient(to top, #000 60%, #000 80%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to top, #000 60%, #000 80%, transparent 100%)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 0.2 : 0 }}
      transition={{ duration: 2.4, ease: "easeOut" }}
    >
      <Image
        src={estampe}
        alt=""
        fill
        sizes="100vw"
        fetchPriority="high"
        onLoad={() => setIsLoaded(true)}
        className="object-cover object-[0%_25%]"
      />
    </motion.div>
  );
};
