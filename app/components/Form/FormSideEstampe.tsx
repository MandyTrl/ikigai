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


  const mask = `radial-gradient(135% 78% at ${side} center, #000 22%, rgba(0,0,0,0.55) 52%, transparent 82%)`;

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className={clsx(
        "pointer-events-none fixed top-1/2 z-0 hidden h-[92vh] w-[30rem] -translate-y-1/2 overflow-hidden mix-blend-multiply xl:block",
        side === "left" ? "left-0" : "right-0",
      )}
      style={{ maskImage: mask, WebkitMaskImage: mask }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 0.5 : 0 }}
      transition={{ duration: 2.4, ease: "easeOut" }}
    >
      {/* Miroirs symétriques : même cadrage (les fleurs), un seul côté retourné */}
      <Image
        src={ESTAMPE}
        alt=""
        fill
        sizes="30rem"
        className="object-cover"
        style={{
          objectPosition: "right center",
          transform: side === "right" ? "scaleX(-1)" : undefined,
        }}
      />
    </motion.div>
  );
};